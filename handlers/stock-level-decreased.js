import { resolve } from "../provider.js";
import { ActionType } from "@prisma/client";

export const stockLevelDecreasedHandler = async (partition, message) => {
    try {
        let payload = JSON.parse(message.value.toString());
        let actionService = resolve("actionService");
        let action = await actionService.create(
            payload.shopId ?? null,
            payload.plu,
            message.timestamp,
            ActionType.StockLevelDecreased
        );
        console.log(`action created ${action.id}`);
    } catch (error) {
        console.log("handled stock-level.decreased");
        console.error(error);
    }
};
