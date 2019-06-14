const { ProductModel } = require("../models/productmodel");
const { CategoryModel } = require("../models/categorymodel");
const { UserModel } = require("../models/userModel");

const AddCategory = (jsonData, cb) => {
    const cat = new CategoryModel(jsonData);
    cat.save(() => {
        cb();
    });
};

const GetCategory = jsonData => {
    return new Promise(resolve => {
        CategoryModel.find(jsonData, null, { sort: "-_id" }, (err, cats) => {
            if (err) throw err;
            resolve(cats);
        });
    });
};

const AddProduct = (fileBuffer, jsonData, cb) => {
    const prod = new ProductModel({
        imgBuffer: fileBuffer,
        title: jsonData.title,
        description: jsonData.description,
        miniDescription: jsonData.miniDescription,
        price: jsonData.price,
        category: jsonData.category,
        inStock: jsonData.inStock
    });
    prod.save(() => {
        cb();
    });
};

const GetProduct = jsonData => {
    return new Promise(resolve => {
        ProductModel.find(jsonData, null, { sort: "-_id" }, (err, prods) => {
            if (err) throw err;
            resolve(prods);
        });
    });
};

const RemoveProductByID = ({ id }, cb) => {
    ProductModel.findOneAndDelete({ _id: id }, err => {
        if (err) throw err;
        cb();
    });
};

const UpdateProduct = (query, jsonData, cb) => {
    ProductModel.findOneAndUpdate(query, jsonData, err => {
        if (err) throw err;
        cb();
    });
};

const UpdateUser = (query, jsonData, cb) => {
    UserModel.findOneAndUpdate(query, jsonData, err => {
        if (err) throw err;
        cb();
    });
};

const RemoveCategoryByID = ({ id }, cb) => {
    CategoryModel.findOneAndDelete({ _id: id }, err => {
        if (err) throw err;
        cb();
    });
};

const UpdateCategory = (query, jsonData, cb) => {
    CategoryModel.findOneAndUpdate(query, jsonData, err => {
        if (err) throw err;
        cb();
    });
};

const Login = ({ username, password }) => {
    return new Promise(resolve => {
        UserModel.findOne(
            { username: username, password: password },
            (err, user) => {
                if (err) throw err;
                resolve(Boolean(user));
            }
        );
    });
};

module.exports = {
    AddProduct,
    GetProduct,
    RemoveProductByID,
    UpdateProduct,
    AddCategory,
    GetCategory,
    RemoveCategoryByID,
    UpdateCategory,
    Login,
    UpdateUser
};
