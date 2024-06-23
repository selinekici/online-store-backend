"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../db/users"));
const products_1 = __importDefault(require("../db/products"));
const index_1 = __importDefault(require("../middlewares/index"));
const router = express_1.default.Router();
// Sepete ürün ekleme
router.post('/add', index_1.default, async (req, res) => {
    const { productId } = req.body;
    const user = await users_1.default.findById(req.user?._id);
    const product = await products_1.default.findById(productId);
    if (!product) {
        return res.status(404).send({ message: 'Product not found' });
    }
    const cartItem = user?.cart.find((item) => item.productId.toString() === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    }
    else {
        user?.cart.push({ productId, quantity: 1 });
    }
    await user?.save();
    res.send(user?.cart);
});
// Sepetten ürün çıkarma
router.post('/remove', index_1.default, async (req, res) => {
    const { productId } = req.body;
    const user = await users_1.default.findById(req.user?._id);
    user.cart = user.cart.filter((item) => item.productId.toString() !== productId);
    await user?.save();
    res.send(user?.cart);
});
// Sepeti listeleme
router.get('/', index_1.default, async (req, res) => {
    const user = await users_1.default.findById(req.user?._id).populate('cart.productId');
    res.send(user?.cart);
});
exports.default = router;
//# sourceMappingURL=cart.js.map