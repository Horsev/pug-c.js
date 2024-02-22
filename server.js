import express, { static as staticFolder } from "express";
import compression from "compression";
import createCompanyPage from "./api/c.js";
import createCompanyMobilePage from "./api/c-m.js";
import createHelpPage from "./api/help.js";
import createErrorPage from "./api/error.js";

const { PORT } = process.env;
const { log } = console;

const app = express();

app.use(compression());

const startingMessage = `\nServer is running on http://localhost:${PORT}/c/00034074\n`;

app.set("view engine", "pug");

app.use(staticFolder("public"));

app.get("/c/:code", createCompanyPage);
app.get("/c-m/:code", createCompanyMobilePage);

app.get("/help", createHelpPage);
app.get("/error", createErrorPage("Це помилка, яку ми не можемо вирішити"));

const error404page = createErrorPage("Сторінка не знайдена");

const hangle404Error = (template) => (request, result) => {
  const pageNotFound = 404;
  result.status(pageNotFound);
  template(request, result);
};

app.use(hangle404Error(error404page));

app.listen(PORT, log(startingMessage));
