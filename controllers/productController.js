const productModel = require('../models/product_model');
const ProductModel = require('../models/product_model')

//Get products API - /api/v1/products
exports.getProducts = async (req, res, next) => {
    const query = req.query.keyword?{name: {
        $regex: req.query.keyword,
        $options: 'i'
    }}:{}

    const products = await ProductModel.find(query);
    res.json({
        success : true,
        products
    })
}


//Get Single Product API - /api/v1/product/id
exports.getSingleProduct = async (req, res, next) => {
    try{
        const {id} = req.params
        const product = await ProductModel.findById(id);
        res.json({
            success:true,
            product
        })
    }
    catch(error){
        res.status(404).json({
            success:false,
            message: 'Unable to get Product with that ID'
        })
    }    
}