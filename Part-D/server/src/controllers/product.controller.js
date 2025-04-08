const productService = require("../services/product.service");
const getSuppliersProducts = async (req, res) => {
  try {

    const supplierId = req.params.id;
    console.log("getSuppliersProducts", supplierId);

    if (req.user.role !== "admin") {
      const error = new Error("not authorized as a admin");
      error.statusCode = 403;
      return next(error);
    }

    const products = await productService.getProductBySupplier(supplierId);

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(" error in getSuppliersProducts", error.message);
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {getSuppliersProducts};