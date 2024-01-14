import { Request } from "express";
import { useLog } from "../../lib/log/index";
import { SnifferService } from "../../services/sniffer/sniffer.service";
import {
  RequestHandler,
  createProxyMiddleware,
  fixRequestBody,
  responseInterceptor,
} from "http-proxy-middleware";
import { RequestInterceptor } from "./interceptor.middleware";
import type * as http from "http";

const logger = useLog({
  dirname: __dirname,
  filename: __filename,
});

export class ProxyMiddleware {
  private proxyMiddleware: RequestHandler;

  constructor(
    private readonly snifferService: SnifferService,
    private readonly requestInterceptor: RequestInterceptor,
  ) {
    this.proxyMiddleware = createProxyMiddleware({
      router: this.chooseRoute.bind(this),
      secure: false,
      logLevel: "debug",
      autoRewrite: true,
      changeOrigin: true,
      followRedirects: true,
      selfHandleResponse: true,
      onProxyReq: fixRequestBody,
      onProxyRes: responseInterceptor(
        async (responseBuffer, proxyRes, req, res) => {
          const invocationId = req.headers["x-sharkio-invocation-id"];
          const snifferId = req.headers["x-sharkio-sniffer-id"] as string;
          const userId = req.headers["x-sharkio-user-id"] as string;
          const testExecutionId = req.headers[
            "x-sharkio-test-execution-id"
          ] as string;
          const body = responseBuffer.toString("utf8");

          await this.requestInterceptor.interceptResponse(
            userId,
            snifferId,
            invocationId as string,
            {
              body: body,
              headers: proxyRes.headers,
              statusCode: proxyRes.statusCode,
            },
            testExecutionId,
          );

          return body;
        },
      ),
    });
  }

  async chooseRoute(req: Request) {
    const host = req.hostname;
    const subdomain = host.split(".")[0];

    const selectedSniffer =
      await this.snifferService.findBySubdomain(subdomain);
    if (selectedSniffer?.port) {
      req.headers["x-sharkio-port"] = selectedSniffer?.port?.toString();
    }
    if (selectedSniffer != null) {
      return selectedSniffer.downstreamUrl;
    }
    return undefined;
  }

  getMiddleware() {
    return this.proxyMiddleware;
  }
}
