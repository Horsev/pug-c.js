import express, { static as staticFolder } from "express";
// eslint-disable-next-line import/extensions
import fullCompany from "./public/mappers/fullCompany.js";

const { PORT, APIKEY, API_DOMAIN, API_PATH } = process.env;

const endpointCompany = (code) =>
  `${API_DOMAIN}${API_PATH}/${code}?apiKey=${APIKEY}`;

const { log } = console;

const app = express();

app.set("view engine", "pug");

app.use(staticFolder("public"));

app.get("/c/:code", async (req, res) => {
  const { code } = req.params;

  const mapData = ({ data }) => {
    res.render("c.pug", { data: fullCompany(data) });
  };

  await fetch(endpointCompany(code))
    .then((response) => response.json())
    .then(mapData);
});

app.listen(PORT, log(`Server is running on http://localhost:${PORT}`));
