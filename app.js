import express, { static as staticFolder } from "express";

const { log } = console;

const app = express();

app.set("view engine", "pug");

app.use(staticFolder("public"));

app.get("/", (req, res) => {
  res.render("index.pug", { title: "Home Page" });
});

app.get("/about", (req, res) => {
  res.render("about.pug", { title: "About Page" });
});

app.listen(8699, () => {
  log("Server is running on 8699");
});
