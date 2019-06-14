const { Router } = require("express");
const { static } = require("express");
const productController = require("./productController");
const categoryController = require("./categoryController");
const path = require("path");
const { Login, UpdateUser } = require("../dbUtils");
const crypto = require("crypto");
router = Router();

router.use(static(path.join(process.env.PWD, "static")));

router.use("/products", productController);
router.use("/category", categoryController);

router.get("/", (req, res) => {
    res.redirect("/admin/products/list");
});

router.get("/password", (req, res) => {
    res.render("admin/password");
});

router.post("/password", async (req, res) => {
    const username = req.session.user;
    const oldPassword = crypto
        .createHash("md5")
        .update(req.body.oldpass)
        .digest("hex");
    const isValid = await Login({ username: req.session.user, password: oldPassword });
    if (isValid) {
        const newPassword = crypto
            .createHash("md5")
            .update(req.body.newpass)
            .digest("hex");
        UpdateUser({ username: username, password: oldPassword }, { password: newPassword }, () => {
            res.render("admin/login", { message: "Password has been changed successfuly! Please log in.", cl: "goodMsg" });
        })
    } else {
        res.render("admin/password", { message: "Wrong password!", cl: "badMsg" });
    }
});

module.exports = router;
