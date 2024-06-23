import mongoose from 'mongoose';


const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    imageUrl: {type: String, required: true},
    thumbnailUrl: {type: String, required: true},
    details: {type: String, required: true},
    manufacturer: {type: String, required: true},
});

export const ProductModel = mongoose.model('Product', ProductSchema);

export const getProducts = () => ProductModel.find();

export const getProductById = (id: string) => ProductModel.findById(id);

export const createProduct = (values: Record<string, any>) => new ProductModel(values).save().then((product)=> product.toObject());

export const getProductByCategory = (category: string) => ProductModel.find( { "category": { "$eq": category }});


export const removeProductFromCart = (id: string) => ProductModel.findOneAndDelete({id: id});
