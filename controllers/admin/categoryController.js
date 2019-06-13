const { Router, static } = require("express");
const { Types } = require("mongoose");
const {
    AddCategory,
    GetCategory,
    RemoveCategoryByID,
    UpdateCategory
} = require("../dbUtils");

const path = require("path");
router = Router();

router.use(static(path.join(process.env.PWD, "static")));

router.get("/list", async (req, res) => {
    const categories = await GetCategory({});
    res.render("admin/categorylist", { categories, search: true });
});

router.post("/list", async (req, res) => {
    let jsonData = {};
    if (req.body.searcht) {
        jsonData = Object.assign(jsonData, { "catName": { "$regex": `${req.body.searcht}`, "$options": "i" } });
    }
    const categories = await GetCategory(jsonData);
    res.render("admin/categorylist", { categories, search_text: req.body.searcht, search: true });
});

router.get("/", (req, res) => {
    res.render("admin/categories", {
        buttonText: "დამატება",
        title: "Add",
        category: {}
    });
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) res.redirect("/admin");
    else {
        const category = await GetCategory({ _id: id });
        res.render("admin/categories", {
            buttonText: "შეცვლა",
            title: "Add",
            category: category[0]
        });
    }
});

router.post("/", (req, res) => {
    AddCategory(req.body, () => {
        res.redirect("/");
    });
});

router.post("/:id", async (req, res) => {
    UpdateCategory({ _id: req.params.id }, req.body, () => {
        res.redirect("/admin/category/list");
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    RemoveCategoryByID({ id: id }, () => {
        res.end();
    });
});

module.exports = router;
