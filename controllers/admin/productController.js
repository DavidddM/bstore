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
    res.render("admin/productlist", { products });
});

router.get("/", (req, res) => {
    res.render("admin/products", { buttonText: "დამატება", product: {} });
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
            product: product[0]
        });
    }
});

module.exports = router;
