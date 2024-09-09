import { app } from "./app.js";
import { diContainer } from "@fastify/awilix";
import { asClass, asFunction, Lifetime } from "awilix";
import { PrismaClient } from "@prisma/client";
import { ActionService } from "./services/action.service.js";
import { ActionRepository } from "./repositories/action.repository.js";

diContainer.register({
    actionRepository: asClass(ActionRepository).scoped().inject(() => ({
      prismaClient: new PrismaClient()
    })),
  
    actionService: asClass(ActionService).singleton().inject(() => ({
      actionRepository: diContainer.resolve("actionRepository")
    })),
});

export const resolve = (dependency) => {
    return diContainer.resolve(dependency);
};
