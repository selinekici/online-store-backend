"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProducts = exports.createSingleProduct = exports.getProductCategory = exports.getProduct = exports.getAllProducts = void 0;
const products_1 = require("../db/products");
const getAllProducts = async (req, res) => {
    try {
        const products = await (0, products_1.getProducts)();
        console.log(products);
        return res.status(200).json(products);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.getAllProducts = getAllProducts;
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await (0, products_1.getProductById)(id);
        return res.status(200).json(product);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.getProduct = getProduct;
const getProductCategory = async (req, res) => {
    try {
        console.log('getProductbyCat');
        const { category } = req.params;
        console.log("category: " + category);
        const productsByCategory = await (0, products_1.getProductByCategory)(category);
        console.log(productsByCategory);
        return res.status(200).json(productsByCategory).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.getProductCategory = getProductCategory;
const createSingleProduct = async (req, res) => {
    try {
        const product = await (0, products_1.createProduct)(req.body);
        return res.status(200).json(product).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.createSingleProduct = createSingleProduct;
const createProducts = async (req, res) => {
    try {
        const result = [];
        const products = req.body;
        products.forEach(function (product) {
            const created = (0, products_1.createProduct)(product);
            result.push(created);
        });
        return res.status(200).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.createProducts = createProducts;
//# sourceMappingURL=products.js.map