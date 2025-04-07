const User = require('../models/user.model');
const Product = require("../models/product.model");

exports.createUserService = async (userData) => {
    // בדיקה אם יש כבר משתמש עם אותו אימייל
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User exists");
    }
  
    // יצירת משתמש חדש
    const user = await User.create(userData);
    if (!user) {
      throw new Error("Cannot create user");
    }
  
    // אם המשתמש הוא ספק, ניצור לו מוצרים בטבלה של המוצרים
    if (user.role === "supplier") {
      console.log("Products for supplier: ", userData.products);
      const products = userData.products.map((product) => ({
        supplierId: user._id, 
        name: product.name,
        price:product.price ,  
        minQuantity: product.minQuantity,  
      }));
      console.log(products);
     
   
      const product = await Product.create(products);
      if (!product) {
        await User.deleteOne(user); // in case of error, remove the user
        throw new Error("Cannot create products");
      }
      
    }

    const token = await user.jwtToken();
    
    return { user, token };
  };

exports.loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Incorrect email or password');
  }

  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    throw new Error('Incorrect email or password');
  }

  const token = await user.jwtToken();
  return { user, token };
};

exports.getUserProfileService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
