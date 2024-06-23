"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../controllers/products");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get('/products', middlewares_1.isAuthenticated, products_1.getAllProducts);
    router.get('/products/:id', middlewares_1.isAuthenticated, products_1.getProduct);
    router.get('/products/:category', middlewares_1.isAuthenticated, products_1.getProductCategory);
    router.post('/products', middlewares_1.isAuthenticated, products_1.createSingleProduct);
};
//# sourceMappingURL=products.js.map