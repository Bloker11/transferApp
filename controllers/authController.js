import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnautheticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userExisting = await User.findOne({ email });
  if (userExisting) {
    throw new BadRequestError("User with this email already exsits");
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      
    },
    token,
    
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnautheticatedError("Invalid credetials");
  }
  console.log(user);
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnautheticatedError("Invalid credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};
const updateUser = async (req, res) => {
  res.send("Update user");
};

export { register, login, updateUser };
