import "dotenv/config";
import "reflect-metadata";
import { AuthController } from "./controllers/auth.controller";
import { ChatController } from "./controllers/chat.controller";
import CLIController from "./controllers/cli-controller";
import { EndpointController } from "./controllers/endpoint.controller";
import { InvocationController } from "./controllers/invocation.controller";
import SettingsController from "./controllers/settings";
import { SnifferController } from "./controllers/sniffer.controller";
import { TestSuiteController } from "./controllers/testSuite.controller";
import { SwaggerUiController } from "./lib/swagger/swagger-controller";
import ApiKeyRepository from "./model/apikeys/apiKeys.model";
import ChatRepository from "./model/chat/chat.model";
import MessageRepository from "./model/chat/message.model";
import { EndpointRepository } from "./model/endpoint/endpoint.model";
import { RequestRepository } from "./model/request/request.model";
import { ResponseRepository } from "./model/response/response.model";
import { SnifferRepository } from "./model/sniffer/sniffers.model";
import { TestRepository } from "./model/testSuite/test.model";
import { TextExecutionRepository } from "./model/testSuite/testExecution.model";
import { TestSuiteRepository } from "./model/testSuite/testSuite.model";
import UserRepository from "./model/user/user.model";
import { getAppDataSource } from "./server/app-data-source";
import { ProxyMiddleware } from "./server/middlewares/proxy.middleware";
import { RequestInterceptor } from "./server/middlewares/request-interceptor";
import { ProxyServer } from "./server/proxy-server";
import { Server } from "./server/server";
import { ChatService } from "./services/chat/chat.service";
import EndpointService from "./services/endpoint/endpoint.service";
import { RequestService } from "./services/request/request.service";
import ResponseService from "./services/response/response.service";
import APIKeysService from "./services/settings/apiKeys";
import { SnifferDocGenerator } from "./services/sniffer-doc-generator/sniffer-doc-generator.service";
import { SnifferService } from "./services/sniffer/sniffer.service";
import { TestService } from "./services/testSuite/test.service";
import { TestExecutionService } from "./services/testSuite/testExecution.service";
import { TestSuiteService } from "./services/testSuite/testSuite.service";
import UserService from "./services/user/user";

export const setupFilePath =
  process.env.SETUP_FILE_PATH ?? "./sniffers-setup.json";

async function main() {
  const appDataSource = await getAppDataSource();

  /* Repositories */
  const endpointRepository = new EndpointRepository(appDataSource);
  const responseRepository = new ResponseRepository(appDataSource);
  const invocationRepository = new RequestRepository(appDataSource);
  const snifferRepository = new SnifferRepository(appDataSource);
  const apiKeyRepository = new ApiKeyRepository(appDataSource);
  const userRepository = new UserRepository(appDataSource);
  const chatRepository = new ChatRepository(appDataSource);
  const messageRepository = new MessageRepository(appDataSource);
  const testSuiteRepository = new TestSuiteRepository(appDataSource);
  const testRepository = new TestRepository(appDataSource);
  const testExecutionRepository = new TextExecutionRepository(appDataSource);

  /* Services */
  const snifferService = new SnifferService(snifferRepository);
  const responseService = new ResponseService(responseRepository);
  const endpointService = new EndpointService(
    endpointRepository,
    invocationRepository
  );
  const userService = new UserService(userRepository);
  const apiKeyService = new APIKeysService(apiKeyRepository, userRepository);
  const docGenerator = new SnifferDocGenerator(snifferService, endpointService);
  const chatService = new ChatService(chatRepository, messageRepository);
  const testSuiteService = new TestSuiteService(testSuiteRepository);
  const testService = new TestService(testRepository);
  const requestService = new RequestService(invocationRepository);
  const testExecutionService = new TestExecutionService(
    testExecutionRepository
  );

  /* Controllers */
  const settingsController = new SettingsController(apiKeyService);
  const authController = new AuthController(userService);
  const cliController = new CLIController(
    apiKeyService,
    userService,
    snifferService
  );
  const snifferController = new SnifferController(
    snifferService,
    endpointService,
    docGenerator,
    endpointService
  );
  const endpointController = new EndpointController(
    endpointService,
    snifferService,
    requestService
  );
  const invocationController = new InvocationController(endpointService);
  const chatController = new ChatController(
    snifferService,
    endpointService,
    chatService
  );
  const swaggerUi = new SwaggerUiController();
  const testSuiteController = new TestSuiteController(
    testSuiteService,
    endpointService,
    testService,
    requestService,
    snifferService,
    testExecutionService
  );

  /* Middlewares */
  const requestInterceptorMiddleware = new RequestInterceptor(
    snifferService,
    endpointService,
    responseService
  );
  const proxyMiddleware = new ProxyMiddleware(
    snifferService,
    requestInterceptorMiddleware
  );

  /* Servers */
  const proxyServer = new ProxyServer(
    proxyMiddleware,
    requestInterceptorMiddleware
  );
  const snifferManagerServer = new Server(
    [
      authController.getRouter(),
      snifferController.getRouter(),
      settingsController.getRouter(),
      invocationController.getRouter(),
      cliController.getRouter(),
      endpointController.getRouter(),
      chatController.getRouter(),
      testSuiteController.getRouter(),
    ],
    swaggerUi
  );

  // /* Start Servers */
  snifferManagerServer.start();
  proxyServer.start();
}

main();
