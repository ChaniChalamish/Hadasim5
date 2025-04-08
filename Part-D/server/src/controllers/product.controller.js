const productService = require("../services/product.service");
const getSuppliersProducts = async (req, res) => {
  try {
    const supplierId = req.user.id;
    console.log("getSuppliersProducts", supplierId);

    // if (req.user.role !== "supplier") {
    //   const error = new Error("not authorized as a supplier");
    //   error.statusCode = 403;
    //   return next(error);
    // }

    const orders = await productService.getProductBySupplier(supplierId);

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(" error in getSuppliersProducts", error.message);
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {getSuppliersProducts};