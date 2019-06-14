const { GetCategory, GetProduct } = require("./dbUtils");
const { Types } = require("mongoose");
const { Router, static } = require("express");
const path = require("path");
const router = Router();

router.use(static(path.join(process.env.PWD, "static")));

router.get("/", async (req, res) => {
    const products = await GetProduct({});
    res.render("products", { products });
});

router.post("/", async (req, res) => {
    let jsonData = {};
    if (req.body.category != "nothing") {
        jsonData = Object.assign(jsonData, { category: req.body.category });
    }
    if (req.body.searcht) {
        jsonData = Object.assign(jsonData, {
            title: { $regex: `${req.body.searcht}`, $options: "i" }
        });
    }
    const products = await GetProduct(jsonData);
    res.render("products", {
        products,
        active_category: req.body.category,
        search_text: req.body.searcht
    });
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) res.redirect("/");
    else {
        const product = await GetProduct({ _id: id });
        res.render("details", { product: product[0] });
    }
});

module.exports = router;
