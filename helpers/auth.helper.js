import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "4h" });
};

export const validateStrongPassword = (password) => {
    
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[^A-Za-z0-9]/;
  
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
  
    if (!lowercaseRegex.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
  
    if (!uppercaseRegex.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
  
    if (!digitRegex.test(password)) {
      return "Password must contain at least one digit.";
    }
  
    if (!specialCharRegex.test(password)) {
      return "Password must contain at least one special character.";
    }  
    
    return null;
  };
  