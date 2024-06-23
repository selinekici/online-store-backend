"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const middlewares_1 = require("../middlewares");
const products_1 = require("../controllers/products");
const authentication_1 = require("../controllers/authentication");
exports.default = (router) => {
    router.get('/users', middlewares_1.isAuthenticated, users_1.getAllUsers);
    router.post('/register', authentication_1.register);
    router.post('/login', authentication_1.login);
    router.post('/logout', authentication_1.logout);
    router.delete('/users/:id', middlewares_1.isAuthenticated, middlewares_1.isOwner, users_1.deleteUser);
    router.patch('/users/:id', middlewares_1.isAuthenticated, middlewares_1.isOwner, users_1.updateUser);
    router.get('/products', products_1.getAllProducts);
    router.get('/products/:id', products_1.getProduct);
    router.get('/products-by-category/:category', products_1.getProductCategory);
    router.post('/product', middlewares_1.isAuthenticated, products_1.createSingleProduct);
    router.post('/products', middlewares_1.isAuthenticated, products_1.createProducts);
};
//# sourceMappingURL=users.js.map