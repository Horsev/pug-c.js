import express, { static as staticFolder } from "express";
import compression from "compression";
// eslint-disable-next-line import/extensions
import createCompanyPage from "./api/c.js";

const { PORT } = process.env;
const { log } = console;

const app = express();

app.use(compression());

const startingMessage = `\nServer is running on http://localhost:${PORT}/c/00034074\n`;

app.set("view engine", "pug");

app.use(staticFolder("public"));

app.get("/c/:code", createCompanyPage);

app.listen(PORT, log(startingMessage));
