import { Request } from "express";
import { useLog } from "../../lib/log/index";
import { SnifferService } from "../../services/sniffer/sniffer.service";
import {
  RequestHandler,
  createProxyMiddleware,
  fixRequestBody,
} from "http-proxy-middleware";
import { RequestInterceptor } from "./request-interceptor";
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
      onProxyRes: (proxyRes, req, res) => {
        const invocationId = req.headers["x-sharkio-invocation-id"];
        const snifferId = req.headers["x-sharkio-sniffer-id"] as string;
        const userId = req.headers["x-sharkio-user-id"] as string;
        const testExecutionId = req.headers[
          "x-sharkio-test-execution-id"
        ] as string;

        try {
          let body: any = [];
          proxyRes.on("data", function (chunk) {
            body.push(chunk);
          });

          proxyRes.on(
            "end",
            function (this: ProxyMiddleware) {
              if (invocationId != null && typeof invocationId === "string") {
                let escapedBody = body.toString();

                this.requestInterceptor
                  .interceptResponse(
                    userId,
                    snifferId,
                    invocationId,
                    {
                      body: escapedBody,
                      headers: proxyRes.headers,
                      statusCode: proxyRes.statusCode,
                    },
                    testExecutionId,
                  )
                  .then((data) => {
                    Object.entries(proxyRes.headers)
                      .filter(([key, value]) => key != "content-length")
                      .forEach(([key, value]) => {
                        value && res.setHeader(key, value);
                      });
                    res.status(proxyRes.statusCode ?? 200);
                    res.end(
                      new Uint8Array(body.map((a: any) => [...a]).flat()) || "",
                    );
                  })
                  .catch((e) => {
                    logger.error(e.message);
                    res.sendStatus(500).end();
                  });
              } else {
                Object.entries(proxyRes.headers)
                  .filter(([key, value]) => key != "content-length")
                  .forEach(([key, value]) => {
                    value && res.setHeader(key, value);
                  });
                res.status(proxyRes.statusCode ?? 200);
                res.end(
                  new Uint8Array(body.map((a: any) => [...a]).flat()) || "",
                );
              }
            }.bind(this),
          );
        } catch (e) {
          logger.error(
            "failed to capture response for invocation id" + invocationId,
            e,
          );
        }
      },
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

  async adaptIncomingResponse(incomingResponse: http.IncomingMessage) {
    const body = await new Promise((resolve, reject) => {
      let bodyChunks: Uint8Array[] = [];
      incomingResponse
        .on("data", (chunk) => {
          bodyChunks.push(chunk);
        })
        .on("end", () => {
          const bodyData = Buffer.concat(bodyChunks).toString();
          resolve(bodyData);
        });
    });

    const resObject = {
      headers: incomingResponse.headers,
      statusCode: incomingResponse.statusCode,
      body,
    };

    return resObject;
  }

  getMiddleware() {
    return this.proxyMiddleware;
  }
}
