const Product = require("../models/product.model");

const getProductBySupplier = async (supplierId) => {
    try {
      const products = await Product.find({ supplierId }).sort({ createdAt: -1 });
      return products;
    } catch (error) {
      throw new Error(`err when getting orders by supplierId:${error.message}`);
  
    }
  };
  module.exports = {getProductBySupplier};