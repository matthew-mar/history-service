import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT);

export { port };
