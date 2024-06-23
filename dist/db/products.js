"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByCategory = exports.createProduct = exports.getProductById = exports.getProducts = exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    details: { type: String, required: true },
    manufacturer: { type: String, required: true },
});
exports.ProductModel = mongoose_1.default.model('Product', ProductSchema);
const getProducts = () => exports.ProductModel.find();
exports.getProducts = getProducts;
const getProductById = (id) => exports.ProductModel.findById(id);
exports.getProductById = getProductById;
const createProduct = (values) => new exports.ProductModel(values).save().then((product) => product.toObject());
exports.createProduct = createProduct;
const getProductByCategory = (category) => exports.ProductModel.find({ "category": { "$eq": category } });
exports.getProductByCategory = getProductByCategory;
//# sourceMappingURL=products.js.map