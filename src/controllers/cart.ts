import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import {createCart, getCartById, updateCartById} from "../db/cart";


export const addToCart = async (req: express.Request, res: express.Response) => {
    try {
        const { productId, quantity } = req.body;

        const {cartId} = req.params;


        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).send({ message: 'Invalid cart id' });
        }

        if (!productId) {
            return res.status(404).send({ message: 'Product not found' });
        }

        if (!quantity && quantity <= 0) {
            return res.status(404).send({ message: 'Quantity not valid' });
        }

        const cartItem = await getCartById(cartId);

        let cart = null;
        if (!cartItem) {
            cart = {_id: cartId, products: [{productId: productId, quantity: quantity}]};
            cart = await createCart(cart);
        } else {
            const products = cartItem.products;
            let found= false;
            for(let i = 0; i < products.length; i++){
                if(products[i].productId.toString() === productId){
                    products[i].quantity += quantity;
                    found = true;
                }
            }
            if(!found){
                products.push({productId: productId, quantity: quantity});
            }
            console.log("cart item: "+ JSON.stringify(cartItem));
            await updateCartById(cartItem._id.toString(), cartItem);

        }
        res.status(200).json(cartItem).end();

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

export const removeFromCart = async (req: express.Request, res: express.Response) => {
    try {
        const { productId, quantity } = req.body;
        const { cartId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).send({ message: 'Invalid cart id' });
        }

        if (!productId) {
            return res.status(404).send({ message: 'Product not found' });
        }

        if (!quantity && quantity <= 0) {
            return res.status(404).send({ message: 'Quantity not valid' });
        }

        const cartItem = await getCartById(cartId);

        if (!cartItem) {
            return res.status(404).send({ message: 'Cart not found' });
        } else {
            const products = cartItem.products;
            let found = false;

            for (let i = 0; i < products.length; i++) {
                if (products[i].productId.toString() === productId) {
                    if (products[i].quantity > quantity) {
                        products[i].quantity -= quantity;
                    } else {
                        products.splice(i, 1);
                    }
                    found = true;
                }
            }


            console.log("cart item: " + JSON.stringify(cartItem));
            await updateCartById(cartItem._id.toString(), cartItem);
        }

        res.status(200).json(cartItem).end();
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};


export const getCart = async (req: express.Request, res: express.Response) => {
    try {
        const { cartId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).send({ message: 'Invalid cart id' });
        }

        const cart = await getCartById(cartId);

        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};



export const removeProductFromCart = async (req: express.Request, res: express.Response) => {
    try {
        const { cartId, productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).send({ message: 'Invalid cart id' });
        }

        if (!productId) {
            return res.status(404).send({ message: 'Product not found' });
        }

        const cartItem = await getCartById(cartId);

        if (!cartItem) {
            return res.status(404).send({ message: 'Cart not found' });
        } else {
            const products = cartItem.products;


            for (let i = 0; i < products.length; i++) {
                if (products[i].productId.toString() === productId) {

                        products.splice(i, 1);

                }
            }


            await updateCartById(cartItem._id.toString(), cartItem);
        }

        res.status(200).json(cartItem).end();
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};
