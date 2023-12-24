import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import * as http from "http";
import "reflect-metadata";
import { useLog } from "../lib/log";
import { logMiddleware } from "./middlewares/log.middleware";
import { ProxyMiddleware } from "./middlewares/proxy.middleware";
import { RequestInterceptor } from "./middlewares/interceptor.middleware";
import https from "https";
import fs from "fs";
import MockMiddleware from "./middlewares/mock.middleware";

const log = useLog({
  dirname: __dirname,
  filename: __filename,
});

// yair is the king of sharks
export class ProxyServer {
  private readonly httpPort: number = +(process.env.PROXY_HTTP_PORT ?? 80);
  private readonly httpsPort: number = +(process.env.PROXY_HTTPS_PORT ?? 443);
  private app: Express;
  private httpServer?: http.Server;
  private httpsServer?: http.Server;

  constructor(
    private readonly proxyMiddleware: ProxyMiddleware,
    private readonly requestInterceptor: RequestInterceptor,
    private readonly mockMiddleware: MockMiddleware,
  ) {
    this.app = express();
    this.app.use(logMiddleware);
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
    this.app.use(express.text());
    this.app.use(express.raw());
    this.app.use(express.urlencoded());
    this.app.use(cookieParser());
    // **IMPORTANT** request interceptor must be before mock middleware
    this.app.use(
      this.requestInterceptor.validateBeforeProxy.bind(this.requestInterceptor),
    );
    this.app.use(this.mockMiddleware.mock.bind(mockMiddleware));
    this.app.use(this.proxyMiddleware.getMiddleware());
  }

  private startHttpServer() {
    return this.app.listen(this.httpPort, () => {
      log.info(`http proxy server started listening on port ${this.httpPort}`);
    });
  }

  private startHttpsServer() {
    try {
      const options = {
        key: fs.readFileSync(process.env.PROXY_PRIVATE_KEY_FILE ?? ""),
        cert: fs.readFileSync(process.env.PROXY_CERT_FILE ?? ""),
      };
      const server = https.createServer(options, this.app);
      return server.listen(this.httpsPort, () => {
        log.info(
          `https proxy server started listening on port ${this.httpsPort}`,
        );
      });
    } catch (err) {
      log.error("Couldn't start HTTPS server!", { err });
    }
  }

  start() {
    this.httpServer = this.startHttpServer();
    this.httpsServer = this.startHttpsServer();
  }

  stop() {
    this.httpsServer?.close();
    this.httpServer?.close();
  }
}
