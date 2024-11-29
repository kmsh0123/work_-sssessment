import UserModel from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import TokenBlackList from "../model/TokenBlackList.js";

export const register = async (req,res) => {
    const {name,email,password,confirm_password} = req.body;

    if (password !== confirm_password) {
        return res.status(400).json({ error: "Passwords do not match" });
    }
  
    if (!name || !email || !password || !confirm_password) {
      return res.status(400).json({
        success: false,
        message: 'name, email,password and confirm_password are required',
      });
    }
  
    try {
      const UserExisted = await UserModel.findOne({ email });
      if (UserExisted) {
        throw new Error("Email already exists.");
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const creatUser = new UserModel({
        name,
        email,
        password: hashedPassword,
      });
  
      const savedUser = await creatUser.save()

      const userResponse = await UserModel.findById(savedUser._id).select('-password');

      return res.status(201).json({
        success: true,
        message: 'Create user successfully',
        userResponse
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Server error: ' + error.message,
      });
    }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const UserExisted = await UserModel.findOne({ email });
    if (!UserExisted) {
      throw new Error("E-mail does not exist.");
    }

    const isMatch = await bcrypt.compare(password, UserExisted.password);
    if (!isMatch) {
      throw new Error("Password wrong");
    }

    const token = jwt.sign({ userId: UserExisted._id}, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        userId: UserExisted._id,
        email: UserExisted.email,
        name: UserExisted.name,
        createdAt: UserExisted.createdAt,
        updatedAt: UserExisted.updatedAt,
      },
      token
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(' ')[1];
    if (token) {
      await TokenBlackList.create({ token });
    }

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

