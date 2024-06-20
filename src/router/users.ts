import express from 'express';

import { getAllUsers, deleteUser, updateUser} from '../controllers/users';
import { isAuthenticated, isOwner } from "../middlewares";
import {
    createProducts,
    createSingleProduct,
    getAllProducts,
    getProduct,
    getProductCategory
} from "../controllers/products";
import {login, register, logout} from "../controllers/authentication";


export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.post('/register', register);
    router.post('/login', login);
    router.post('/logout', logout);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
    router.get('/products', getAllProducts);
    router.get('/products/:id', getProduct);
    router.get('/products-by-category/:category', getProductCategory);
    router.post('/product', isAuthenticated, createSingleProduct);
    router.post('/products', isAuthenticated, createProducts);
};

