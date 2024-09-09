import { resolve } from "../provider.js";
import { ActionType } from "@prisma/client";

export const stockLevelIncreasedHandler = async (partition, message) => {
    try {
        let payload = JSON.parse(message.value.toString());
        let actionService = resolve("actionService");
        let action = await actionService.create(
            payload.shopId ?? null,
            payload.plu,
            message.timestamp,
            ActionType.StockLevelIncreased
        );
        console.log(`action created ${action.id}`);
    } catch (error) {
        console.log("handled stock-level.increased");
        console.error(error);
    }
};
