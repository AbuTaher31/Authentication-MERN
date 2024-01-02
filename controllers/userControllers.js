import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import Users from "../models/Users.js";

import jwt from "jsonwebtoken";

/**
 * @desc create all users data
 * @route POST /users
 * @access PUBLIC
 */
export const createRegisterUsers = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required !" });
  }

  //EmailCheck in Another User
  const emailCheck = await Users.findOne({ email });
  if (emailCheck) {
    return res.status(400).json({ message: "Email already Exists !" });
  }

  //create Hash_Password
  const hash_password = await bcrypt.hash(password, 8);

  //createUser Data
  const user = await Users.create({
    name,
    email,
    password: hash_password,
  });

  res.status(200).json({ message: `${name} created success...`, user });
});

/**
 * @desc create all  login users data
 * @route POST /users
 * @access PUBLIC
 */

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required...!" });
  }

  //find in user with email...
  const loginUser = await Users.findOne({ email });

  if (!loginUser) {
    return res.status(400).json({ message: "User not found..." });
  }

  //compare Hash_Password
  const passwordCheck = await bcrypt.compare(password, loginUser.password);

  if (!passwordCheck) {
    return res.status(400).json({ message: "Wrong password..." });
  }

  //create access token
  const token = jwt.sign({ email: loginUser.email }, process.env.ACCESS_TOKEN, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });

  res.cookie("accesstoken", token, {
    httpOnly: true,
    secure: (process.env.APP_ENV = "Development" ? false : true),
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: `${loginUser.name} login Successful...`,
    user: loginUser,
  });
});

/**
 * @desc logedin user Data
 * @route POST /users
 * @access PUBLIC
 */

export const logedinUser = asyncHandler(async (req, res) => {
  const me = req.me;
  res.status(200).json(me);
});

/**
 * @desc get all users data
 * @route GET /users
 * @access PUBLIC
 */

export const getAllUsers = asyncHandler(async (req, res) => {
  const user = await Users.find();

  if (user.length > 0) {
    return res.status(200).json({ user });
  }
});

/**
 * @desc get a Single users data
 * @route GET /users
 * @access PUBLIC
 */

export const SingleUserData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id);

  return res.status(200).json(user);
});

/**
 * @desc Delete a Single users data
 * @route GET /users
 * @access PUBLIC
 */

export const DeleteSingleUserData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByIdAndDelete(id);

  return res.status(200).json({ user, message: " User delete Success..." });
});

/**
 * @desc Update a Single users data
 * @route GET /users
 * @access PUBLIC
 */

export const updateSingleUserData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const Updateuser = await Users.findByIdAndUpdate(
    id,
    {
      name,
      email,
      password: await bcrypt.hash(password, 8),
    },
    { new: true }
  );
  return res
    .status(200)
    .json({ Updateuser, message: "User Update Success...." });
});

/**
 * @desc logout users
 * @route POST /users
 * @access PUBLIC
 */

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accesstoken");

  return res.status(200).json({ message: "logout successfull !" });
});
