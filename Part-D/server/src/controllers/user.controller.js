const {
  validateUserSignup,
  validateUserLogin,
} = require("../validators/user.validator");
const {
  createUserService,
  loginUserService,
  getUserProfileService,
  getSuppliersService
} = require("../services/user.service");
const {
  productArraySchema,
} = require("../validators/product.validator");

exports.createUser = async (req, res) => {
  try {
    const { err } = validateUserSignup(req.body);
    if (err) return res.status(400).json({ message: err.message });
    console.log(req.body.products);
    const {
      name,
      email,
      password,
      role,
      companyName,
      phoneNumber,
      representativeName,
      products = [],
    } = req.body;

    if (role === "supplier") {
      try {
        await productArraySchema.validateAsync(products);
      } catch (validationError) {
        return res.status(400).json({
          message: `err in validate items: ${validationError.message}`,
        });
      }
    }

    const { token } = await createUserService({
      name,
      email,
      password,
      role,
      companyName,
      phoneNumber,
      representativeName,
      products,
    });

    const options = {
      httpOnly: true,
      expiresIn: 3000,
    };

    return res.status(200).cookie("token", token, options).json({
      message: "Signup successful",
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.getSuppliers=async (req, res) => {
  try {
    const suppliers = await getSuppliersService();
    return res.status(200).json({ message: "Success", data: suppliers });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log(req.body);

    const { err } = validateUserLogin(req.body);

    if (err) return res.status(400).json({ message: err.message });
    console.log(err);
    const { email, password } = req.body;
    const { token } = await loginUserService({ email, password });

    const options = { httpOnly: true };

    return res.status(200).cookie("token", token, options).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.userProfile = async (req, res) => {
  try {
    const user = await getUserProfileService(req.user.id);
    return res.status(200).json({ message: "Success", data: user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.logOut = async (req, res) => {
  try {
    res.cookie("token", "none", { expires: new Date(Date.now()) });
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
