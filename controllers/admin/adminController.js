const { Router } = require("express");
const { static } = require("express");
const productController = require("./productController");
const categoryController = require("./categoryController");
const path = require("path");
router = Router();

router.use(static(path.join(process.env.PWD, "static")));

router.use("/products", productController);
router.use("/category", categoryController);

router.get("/", (req, res) => {
    res.redirect("/admin/products/list");
});

module.exports = router;
