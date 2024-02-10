import express, { static as staticFolder } from "express";
// eslint-disable-next-line import/extensions
import createCPage from "./server/c.js";

const { PORT } = process.env;
const { log } = console;

const app = express();

const startingMessage = `Server is running on http://localhost:${PORT}/c/00034074`;

app.set("view engine", "pug");

app.use(staticFolder("public"));

app.get("/c/:code", createCPage);

app.listen(PORT, log(startingMessage));
