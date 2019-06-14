const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const app = express();
const uri = "mongodb://dbAdmin:dbPass1@ds147668.mlab.com:47668/tbase";
const path = require("path");
const crypto = require("crypto");

const { Login } = require("./controllers/dbUtils");
const { adminController, apiController } = require("./controllers");
const PORT = process.env.PORT || 8069;

mongoose.connect(uri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("successfully connected to database"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "NOONESCOMPLETELYSTRAIGHT" }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./templates"));

app.use(
    "/admin",
    (req, res, next) => {
        if (req.session.loggedIn) next();
        else res.redirect("/login");
    },
    adminController
);
app.use("/api", apiController);
app.use(express.static(path.join(process.env.PWD, "static")));
app.get("/", async (req, res) => {
    res.redirect("/admin");
});

app.get("/login", (req, res) => {
    res.render("admin/login");
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = crypto
        .createHash("md5")
        .update(req.body.password)
        .digest("hex");
    req.session.loggedIn = await Login({
        username: username,
        password: password
    });
    if (req.session.loggedIn) {
        req.session.user = username;
        res.redirect("/admin");
    } else {
        res.render("admin/login", { message: "Wrong Password!", cl: "badMsg" });
    }

});

app.get("/logout", (req, res) => {
    req.session.loggedIn = false;
    res.redirect("/admin");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
