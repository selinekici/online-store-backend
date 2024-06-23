import mongoose from 'mongoose';
import {UserModel} from "./users";

const CartSchema = new mongoose.Schema({
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }],
});


export const CartModel = mongoose.model('Cart', CartSchema);

export const getCartById = (id: string) => CartModel.findById(id);

export const createCart = (values: Record<string, any>) => new CartModel(values).save().then((cart)=> cart.toObject());

// export const updateCartById = (id: string, values: Record<string, any>) =>CartModel.findByIdAndUpdate(id, values);


export const updateCartById = (id: string, cart: any) => CartModel.findByIdAndUpdate(id, cart, { new: true });