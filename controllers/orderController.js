const orderModel = require('../models/ordermodel');
const productModel = require('../models/product_model');

//Create order - api/v1/order
exports.CreateOrder = async (req, res) => {
    const cartItems = req.body;
    console.log(cartItems)
    const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2)
    const status = 'pending';
    const order = new orderModel({cartItems, amount, status})
    await order.save()


    //updating cart stock
    cartItems.forEach(async (item) => {
        console.log(item)
        const product = await productModel.findById(item.product._id)
        console.log(product)
        product.stock = parseInt(product.stock) - item.qty;
        await product.save();
    })

    res.json({
        success:true,
        order
    })
}