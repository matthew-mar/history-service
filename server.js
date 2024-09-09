import { app } from "./app.js";
import consumer from "./kafka.js";
import { port } from "./config.js";
import { Events } from "./event-types.js";
import { productCreatedHandler } from "./handlers/product-created.js";
import { stockLevelCreatedHandler } from "./handlers/stock-level-created.js";
import { stockLevelDecreasedHandler } from "./handlers/stock-level-decreased.js";
import { stockLevelIncreasedHandler } from "./handlers/stock-level-increased.js";

await consumer.connect();
await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        switch (topic) {
            case Events.ProductCreated:
                productCreatedHandler(partition, message);
                break;

            case Events.StockLevelCreated:
                stockLevelCreatedHandler(partition, message);
                break;

            case Events.StockLevelIncreased:
                stockLevelIncreasedHandler(partition, message);
                break;

            case Events.StockLevelDecreased:
                stockLevelDecreasedHandler(partition, message);
                break;
        }
    },
})

app.listen({ port: port, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Server listening at ${address}`);
});
