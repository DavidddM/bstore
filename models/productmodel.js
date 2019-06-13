const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        imgBuffer: Buffer,
        title: String,
        description: String,
        miniDescription: String,
        price: Number,
        category: String,
        inStock: Boolean
    },
    { collection: "Products" }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };
