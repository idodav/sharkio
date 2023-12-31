import { Request, Response } from "express";
import PromiseRouter from "express-promise-router";
import swaggerUi from "swagger-ui-express";
import z from "zod";
import { CreateSnifferValidator } from "../dto/in/create-sniffer.dto";
import { EditSnifferValidator } from "../dto/in/index";
import { useLog } from "../lib/log";
import { requestValidator } from "../lib/request-validator/request-validator";
import { generateOpenApi } from "../services/code-generator/open-api-generator";
import EndpointService from "../services/endpoint/endpoint.service";
import { SnifferDocGenerator } from "../services/sniffer-doc-generator/sniffer-doc-generator.service";
import { SnifferService } from "../services/sniffer/sniffer.service";
import { IRouterConfig } from "./router.interface";
import { MockService } from "../services/mock/mock.service";

const log = useLog({
  dirname: __dirname,
  filename: __filename,
});

export class SnifferController {
  constructor(
    private readonly snifferManager: SnifferService,
    private readonly snifferDocGenerator: SnifferDocGenerator,
    private readonly endpointService: EndpointService,
    private readonly mockService: MockService,
    private readonly baseUrl: string = "/sharkio/sniffer",
  ) {}

  getRouter(): IRouterConfig {
    const router = PromiseRouter();
    router
      .route("")
      .get(
        /**
         * @openapi
         * /sharkio/sniffer:
         *   get:
         *     tags:
         *      - sniffer
         *     description: Get all sniffers for user
         *     responses:
         *       200:
         *         description: Returns all sniffers
         *       500:
         *         description: Server error
         */
        async (req: Request, res: Response) => {
          const userId = res.locals.auth.user.id;
          let sniffers = [];

          sniffers = await this.snifferManager.getUserSniffers(userId);
          res.json(sniffers);
        },
      )
      .post(
        requestValidator({ body: CreateSnifferValidator }),
        /**
         * @openapi
         * /sharkio/sniffer:
         *   post:
         *     tags:
         *      - sniffer
         *     description: Create a sniffer
         *     requestBody:
         *        description: Create a sniffer
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              required:
         *                - name
         *                - port
         *                - downstreamUrl
         *                - id
         *              properties:
         *                name:
         *                  type: string
         *                  description: The name of the sniffer
         *                  example: My sniffer
         *                port:
         *                  type: number
         *                  description: The port on the sniffer will intercept on
         *                  minimum: 0
         *                  example: 8080
         *                downstreamUrl:
         *                  type: string
         *                  description: The URL the sniffer will delegate the request to
         *                  example: https://localhost
         *     responses:
         *       201:
         *         description: Sniffer created
         *       500:
         *         description: Server error
         */
        async (req: Request, res: Response) => {
          try {
            const { ...config } = req.body;
            const userId = res.locals.auth.user.id;

            if (config.subdomain) {
              config.subdomain = config.subdomain.toLowerCase();
            }
            const createdSniffer = await this.snifferManager.createSniffer({
              ...config,
              userId,
            });
            return res.status(201).json(createdSniffer);
          } catch (e) {
            log.error("An unexpected error occured", {
              method: "POST",
              path: `${this.baseUrl}/:id`,
              error: e,
            });
            return res.sendStatus(500);
          }
        },
      );

    router
      .route("/:id")
      .put(
        /**
         * @openapi
         * /sharkio/sniffer/{id}:
         *   put:
         *     tags:
         *      - sniffer
         *     description: Edit a sniffer
         *     parameters:
         *       - name: id
         *         in: path
         *         schema:
         *           type: string
         *         description: Sniffer id
         *         required: true
         *     requestBody:
         *        description: Edit a sniffer
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                port:
         *                  type: integer
         *                  minimum: 0
         *                  example: 8080
         *     responses:
         *       200:
         *         description: Sniffer edited
         *       403:
         *         description: The port already has an allocated sniffer
         *       404:
         *         description: Sniffer not found
         *       500:
         *         description: Server error
         */
        requestValidator({
          params: z.object({
            id: z.string().uuid(),
          }),
          body: EditSnifferValidator,
        }),
        async (req: Request, res: Response) => {
          try {
            const { id } = req.params;
            const data = req.body;

            if (data.subdomain) {
              data.subdomain = data.subdomain.toLowerCase();
            }
            const userId = res.locals.auth.user.id;
            await this.snifferManager.editSniffer({ id, userId, ...data });
            res.sendStatus(200);
          } catch (e: any) {
            log.error("An unexpected error occured", {
              method: "PUT",
              path: `${this.baseUrl}/:id`,
              error: e,
            });
            return res.sendStatus(500);
          }
        },
      )
      .delete(
        /**
         * @openapi
         * /sharkio/sniffer/{id}:
         *   delete:
         *     tags:
         *      - sniffer
         *     description: Delete a sniffer
         *     parameters:
         *       - name: id
         *         in: path
         *         schema:
         *           type: string
         *         description: Sniffer id
         *         required: true
         *     responses:
         *       200:
         *         description: Sniffer deleted
         *       404:
         *         description: Sniffer not found
         *       500:
         *         description: Server error
         */
        requestValidator({
          params: z.object({
            id: z.string().uuid(),
          }),
        }),
        async (req: Request, res: Response) => {
          try {
            const { id } = req.params;
            const userId = res.locals.auth.user.id;
            await this.snifferManager.removeSniffer(userId, id);
            res.sendStatus(200);
          } catch (e: any) {
            log.error("An unexpected error occured", {
              method: "DELETE",
              path: `${this.baseUrl}/:id`,
              error: e,
            });
            return res.sendStatus(500);
          }
        },
      )
      .get(
        /**
         * @openapi
         * /sharkio/sniffer/:id:
         *   get:
         *     tags:
         *      - sniffer
         *     description: Get all sniffers for user
         *     responses:
         *       200:
         *         description: Returns all sniffers
         *       500:
         *         description: Server error
         */
        requestValidator({
          params: z.object({
            id: z.string().uuid(),
          }),
        }),
        async (req: Request, res: Response) => {
          const snifferId = req.params.snifferId;
          const userId = res.locals.auth.user.id;
          const sniffer = await this.snifferManager.getSniffer(
            userId,
            snifferId,
          );

          res.json(sniffer);
        },
      );

    router.route("/:snifferId/mocks").get(
      /**
       * @openapi
       * /sharkio/sniffer/{snifferId}/mocks:
       *   get:
       *     tags:
       *      - sniffer
       *     description: Get all sniffers mocks
       *     parameters:
       *       - name: snifferId
       *         in: path
       *         schema:
       *           type: string
       *         description: Sniffer id
       *         required: true
       *     responses:
       *       200:
       *         description: Returns all mocks for a sniffer
       *       500:
       *         description: Server error
       */
      requestValidator({
        params: z.object({
          snifferId: z.string().uuid(),
        }),
      }),
      async (req: Request, res: Response) => {
        const { snifferId } = req.params;
        const userId = res.locals.auth.user.id;
        const snifferMocks = await this.mockService.getBySnifferId(
          userId,
          snifferId,
        );

        res.json(snifferMocks);
      },
    );
    router.route("/:id/request").get(
      /**
       * @openapi
       * /sharkio/sniffer/{id}/request:
       *   get:
       *     tags:
       *      - sniffer
       *     description: Get all sniffers requests
       *     parameters:
       *       - name: id
       *         in: path
       *         schema:
       *           type: string
       *         description: Sniffer id
       *         required: true
       *     responses:
       *       200:
       *         description: Returns all requests for a sniffer
       *       500:
       *         description: Server error
       */
      requestValidator({
        params: z.object({
          id: z.string().uuid(),
        }),
      }),
      async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = res.locals.auth.user.id;
        const snifferRequests = await this.endpointService.getBySnifferId(
          userId,
          id,
        );

        res.json(snifferRequests);
      },
    );

    router.route("/:id/invocation").get(
      /**
       * @openapi
       * /sharkio/sniffer/{id}/invocation:
       *   get:
       *     tags:
       *      - sniffer
       *     description: Get all sniffers requests
       *     parameters:
       *       - name: id
       *         in: path
       *         schema:
       *           type: string
       *         description: Sniffer id
       *         required: true
       *     responses:
       *       200:
       *         description: Returns all requests for a sniffer
       *       500:
       *         description: Server error
       */
      requestValidator({
        params: z.object({
          id: z.string().uuid(),
        }),
      }),
      async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = res.locals.auth.user.id;
        const snifferInvocations =
          await this.endpointService.getInvocationsBySnifferId(userId, id);

        res.json(snifferInvocations);
      },
    );

    router.route("/:id/openapi").get(
      requestValidator({
        params: z.object({
          id: z.string().uuid(),
        }),
      }),
      /**
       * @openapi
       * /sharkio/sniffer/{id}/openapi:
       *   get:
       *     tags:
       *      - sniffer
       *     description: Get the openAPI schema for the sniffer
       *     parameters:
       *       - name: id
       *         in: path
       *         schema:
       *           type: string
       *         description: Sniffer id
       *         required: true
       *     responses:
       *       200:
       *         description: Returns the openAPI schema for the sniffer
       *       500:
       *         description: Server error
       */
      async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = res.locals.auth.user.id;
        const snifferRequests = await this.endpointService.getBySnifferId(
          userId,
          id,
        );

        const generatedSwagger = generateOpenApi(snifferRequests);

        res.json(generatedSwagger);
      },
    );

    router.use(
      "/:id/api-docs",
      swaggerUi.serve,
      async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = res.locals.auth.user.id;
        const generatedDoc =
          await this.snifferDocGenerator.generateDocForSniffer(userId, id);
        const sniffer = await this.snifferManager.getSniffer(userId, id);
        const snifferRequests = await this.endpointService.getBySnifferId(
          userId,
          id,
        );

        const html = swaggerUi.generateHTML(generatedDoc);
        res.send(html).status(200);
      },
    );

    return {
      router,
      path: this.baseUrl,
    };
  }
}
