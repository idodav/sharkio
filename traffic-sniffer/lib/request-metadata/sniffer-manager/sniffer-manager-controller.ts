import { json } from "body-parser";
import express, { Express, Request, Response } from "express";
import * as http from "http";
import { SnifferManager } from "./sniffer-manager";
import { Sniffer } from "../sniffer/sniffer";
import cors from "cors";

export class SnifferManagerController {
  private server: http.Server | undefined;
  private app: Express;
  private snifferManager: SnifferManager;

  constructor() {
    this.app = express();
    this.snifferManager = new SnifferManager();
    this.setup();
  }

  setup() {
    this.app.use(cors());
    this.app.use(json());

    this.app.get(
      "/sharkio/sniffer/invocation",
      (req: Request, res: Response) => {
        try {
          res.send(this.snifferManager.getAllData()).status(200);
        } catch (e) {
          res.sendStatus(500);
        }
      }
    );

    this.app.get("/sharkio/sniffer", (req: Request, res: Response) => {
      res
        .send(
          this.snifferManager.getAllSniffers().map((sniffer: Sniffer) => ({
            config: sniffer.getConfig(),
            isStarted: sniffer.getIsStarted(),
          }))
        )
        .status(200);
    });

    this.app.get("/sharkio/sniffer/:port", (req: Request, res: Response) => {
      const { port } = req.params;
      const sniffer = this.snifferManager.getSniffer(+port);

      if (sniffer !== undefined) {
        res.send(sniffer).status(200);
      } else {
        res.sendStatus(404);
      }
    });

    this.app.post("/sharkio/sniffer", (req: Request, res: Response) => {
      const config = req.body;

      try {
        this.snifferManager.createSniffer(config);

        res.sendStatus(200);
      } catch (e: any) {
        res.sendStatus(500);
      }
    });

    this.app.post(
      "/sharkio/sniffer/:port/actions/stop",
      (req: Request, res: Response) => {
        try {
          const { port } = req.params;
          const config = req.body;

          const sniffer = this.snifferManager.getSniffer(+port);

          if (sniffer !== undefined) {
            sniffer.stop();
            res.sendStatus(200);
          } else {
            res.sendStatus(404);
          }
        } catch (e: any) {
          res.sendStatus(500);
        }
      }
    );

    this.app.post(
      "/sharkio/sniffer/:port/actions/start",
      async (req: Request, res: Response) => {
        const { port } = req.params;
        const config = req.body;

        try {
          const sniffer = this.snifferManager.getSniffer(+port);

          if (sniffer !== undefined) {
            await sniffer.start();
            res.sendStatus(200);
          } else {
            res.sendStatus(404);
          }
        } catch (e: any) {
          res.sendStatus(500);
        }
      }
    );

    this.app.post(
      "/sharkio/sniffer/:port/actions/execute",
      async (req: Request, res: Response) => {
        const { port } = req.params;
        const { url, method, invocation } = req.body;
        try {
          const sniffer = this.snifferManager.getSniffer(+port);

          if (sniffer !== undefined) {
            await sniffer
              .execute(url, method, invocation)
              .catch((e) => console.error("error while executing"));
            res.sendStatus(200);
          } else {
            res.sendStatus(404);
          }
        } catch (e: any) {
          res.sendStatus(500);
        }
      }
    );

    this.app.delete(
      "/sharkio/sniffer/:port",
      async (req: Request, res: Response) => {
        const { port } = req.params;

        try {
          const sniffer = this.snifferManager.getSniffer(+port);

          if (sniffer !== undefined) {
            this.snifferManager.removeSniffer(+port);
            res.sendStatus(200);
          } else {
            res.sendStatus(404);
          }
        } catch (e: any) {
          res.sendStatus(500);
        }
      }
    );
    this.app.put(
      "/sharkio/sniffer/:existingId",
      async (req: Request, res: Response) => {
        const { existingId } = req.params;
        const { port } = req.body

        try {
          const sniffer = this.snifferManager.getSnifferById(existingId);
          // verify that there is no sniffer with the port you want to change to.
          const isPortAlreadyExists = this.snifferManager.getSnifferById(port.toString());
          if ((sniffer !== undefined && !isPortAlreadyExists) || +port === +existingId) {
            this.snifferManager.editSniffer(existingId, req.body)
            res.sendStatus(200);
          } else if (!sniffer) {
            res.sendStatus(404);
          } else if (isPortAlreadyExists) {
            res.sendStatus(403);
          }
        } catch (e: any) {
          res.sendStatus(500);
        }
      }
    )
  }

  start(port: number = 5012) {
    this.server = this.app.listen(port, () => {
      console.log("server started listening on port 5012");
    });
  }

  stop() {
    this.server?.close();
  }

  getManager() {
    return this.snifferManager;
  }
}
