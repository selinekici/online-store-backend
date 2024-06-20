import express, {request} from 'express';

import {getProducts, getProductById, createProduct, getProductByCategory} from '../db/products';



export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const products = await getProducts();
        console.log(products);
        return res.status(200).json(products);
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getProduct = async (req: express.Request, res: express.Response) => {
    try{
        const { id} = req.params;

        const product = await getProductById(id);

        return res.status(200).json(product);
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getProductCategory = async (req: express.Request, res: express.Response) => {
    try{
        console.log('getProductbyCat')
        const { category} = req.params;
        console.log("category: " + category);

        const productsByCategory = await getProductByCategory(category);
        console.log(productsByCategory)

        return res.status(200).json(productsByCategory).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createSingleProduct = async (req: express.Request, res: express.Response) => {
    try{
        const product = await createProduct(
            req.body
        );

        return res.status(200).json(product).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const createProducts = async (req: express.Request, res: express.Response) => {
    try{
        const result:any[] = [];

        const products:[] = req.body;
        products.forEach(  function (product)  {
            const created =  createProduct(product);
            result.push(created);
        });
        return res.status(200).json(result).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

