import express from 'express';

import {createSingleProduct, getAllProducts, getProduct, getProductCategory} from '../controllers/products';
import { isAuthenticated } from "../middlewares";



export default (router: express.Router) => {
    router.get('/products', isAuthenticated, getAllProducts);
    router.get('/products/:id', isAuthenticated, getProduct);
    router.get('/products/:category', isAuthenticated, getProductCategory );
    router.post('/products', isAuthenticated, createSingleProduct);
};