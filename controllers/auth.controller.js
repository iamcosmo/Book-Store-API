import UserDataModel from "../models/users.models.js";
import { createToken } from "../helpers/auth.helper.js";
import { hashPassword,validateStrongPassword, comparePassword } from "../helpers/auth.helper.js";

export const signUpUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    console.log('username: ',username);
    
    const existingUser = await UserDataModel.findOne({ username });
    if (!existingUser) {
      const hashedPassword = await hashPassword(password);

      const isNotStrongPassword = validateStrongPassword(password);
      console.log('PAssword not stgong: ',isNotStrongPassword);
      if (isNotStrongPassword) {
        return res.status(400).send({
            message:"Weak Password!!",
          });
      }

      const user = await UserDataModel.create({
        username: username,
        password: hashedPassword,
        role: role,
      });

      console.log('user created: ',user);
      

      const token = createToken(user._id);

      console.log('token created: ',token);
      
      return res.status(200).json({
        user: {
          username: user.username,
          password: user.password,
          role: user.role,
        },
        token,
        message: "Successfully submitted",
      });
    } else {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid Id" });
    } else {
      res.status(500).json(error);
    }
  }
};

export const logInUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({
        sucess: false,
        message: "All parameters are Needed!",
      });
    }

    const user = await UserDataModel.findOne({ username });
    if (!user) {
      return res.status(404).send({
        success: false,
        error: "User Doesn't Exists!! Please SignUP",
      });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    res.status(200).send({
      success: true,
      message: "Login Sucessful",
      user: {
        username: user.username,
        password: user.password,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};