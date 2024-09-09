import { ActionType } from "@prisma/client";
import { resolve } from "../provider.js";

export const productCreatedHandler = async (partition, message) => {
    try {
        let payload = JSON.parse(message.value.toString());
        let actionService = resolve("actionService");
        let action = await actionService.create(
            payload.shopId ?? null,
            payload.plu,
            message.timestamp,
            ActionType.ProductCreated
        );
        console.log(`action created ${action.id}`);
    } catch (error) {
        console.log("handled product.created");
        console.error(error);
    }
}
