const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
    {
        catName: String
    },
    { collection: "Categories" }
);

const CategoryModel = mongoose.model("Category", catSchema);

module.exports = { CategoryModel };
