import Fastify from "fastify";
import { fastifyAwilixPlugin } from '@fastify/awilix'
import { router } from "./routers/action.js";

const app = Fastify({
    logger: true,
});

app.register(fastifyAwilixPlugin, { 
    disposeOnClose: true, 
    disposeOnResponse: true,
    strictBooleanEnforced: true
})
app.register(router);

export { app };
