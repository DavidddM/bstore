const {
    AddProduct,
    GetProduct,
    RemoveProductByID,
    UpdateProduct
} = require("../dbUtils");
const { Types } = require("mongoose");
const { Router, static } = require("express");
const path = require("path");
const multer = require("multer");
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });
const router = Router();

router.use(static(path.join(process.env.PWD, "static")));

router.get("/list", async (req, res) => {
    const products = await GetProduct({});
    res.render("admin/productlist", { products, search: true, search_category: true });
});

router.post("/list", async (req, res) => {
    let jsonData = {};
    if (req.body.category != "nothing") {
        jsonData = Object.assign(jsonData, { category: req.body.category })
    }
    if (req.body.searcht) {
        jsonData = Object.assign(jsonData, { "title": { "$regex": `${req.body.searcht}`, "$options": "i" } });
    }
    const products = await GetProduct(jsonData);
    res.render("admin/productlist", { products, active_category: req.body.category, search_text: req.body.searcht, search: true, search_category: true });
});

router.get("/", (req, res) => {
    res.render("admin/products", { buttonText: "დამატება", title: "Add", product: {} });
});

router.post("/", upload.single("image"), (req, res) => {
    AddProduct(req.file.buffer, req.body, () => {
        res.redirect("/");
    });
});

router.post("/:id", upload.single("image"), (req, res) => {
    let jsonData;
    if (req.file) {
        jsonData = Object.assign({ imgBuffer: req.file.buffer }, req.body);
    } else jsonData = req.body;
    UpdateProduct({ _id: req.params.id }, jsonData, () => {
        res.redirect("/admin");
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    RemoveProductByID({ id: id }, () => {
        res.end();
    });
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) res.redirect("/admin");
    else {
        const product = await GetProduct({ _id: id });
        res.render("admin/products", {
            buttonText: "შეცვლა",
            title: "Edit",
            product: product[0]
        });
    }
});

module.exports = router;
