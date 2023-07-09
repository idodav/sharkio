require("dotenv/config");
import { SnifferManager } from "./lib/sniffer-manager/sniffer-manager";
import { SnifferManagerController } from "./lib/sniffer-manager/sniffer-manager-controller";
import { MockManagerController } from "./lib/sniffer-manager/mock-manager-controller";
import { SnifferManagerServer } from "./lib/sniffer-manager/sniffer-manager-server";
import { SwaggerUiController } from "./lib/swagger/swagger-controller";

// Initialize common dependencies
const snifferManager = new SnifferManager();

// Initialize controllers
const snifferController = new SnifferManagerController(snifferManager);
const mockManagerController = new MockManagerController(snifferManager);
const swaggerUi = new SwaggerUiController();

// Initialize server instance
const snifferManagerServer = new SnifferManagerServer([
  snifferController,
  mockManagerController,
  swaggerUi,
]);

snifferManagerServer.start();
