import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Users from "../models/Users.js";

//tokenverify
const tokenVerify = (req, res, next) => {
  const Accesstoken = req.cookies.accesstoken;

  if (!Accesstoken) {
    return res.status(400).json({ message: "Unauthorized...! " });
  }

  jwt.verify(
    Accesstoken,
    process.env.ACCESS_TOKEN,
    asyncHandler(async (error, decode) => {
      if (error) {
        return res.status(400).json({ message: "Invalid Token..." });
      }

      const me = await Users.findOne({ email: decode.email }).select(
        "-password"
      );

      req.me = me;

      next();
    })
  );
};

export default tokenVerify;
