const { Router } = require("express");
router = Router();
const { GetCategory } = require("../dbUtils");

router.get("/allcats", async (req, res) => {
    try {
        const cats = await GetCategory({});
        let categories = [];
        cats.forEach(element => {
            categories.push({ id: element.id, catName: element.catName });
        });
        res.json(categories);
    } catch (e) {
        console.error(e.message);
        res.end();
    }
});

router.get("/catname/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const category = await GetCategory({ _id: id });
        res.json({ catName: category[0].catName });
    } catch (e) {
        console.error(e.message);
        res.end();
    }
});

module.exports = router;
