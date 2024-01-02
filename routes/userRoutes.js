import express from "express";
import {
  DeleteSingleUserData,
  SingleUserData,
  logoutUser,
  updateSingleUserData,
  createRegisterUsers,
  logedinUser,
  userLogin,
} from "../controllers/userControllers.js";
import tokenVerify from "../middlewares/tokenVerify.js";

//createRouter
const router = express.Router();

router.route("/register").post(createRegisterUsers);
router.route("/login").post(userLogin);
router.route("/logedinUser").get(tokenVerify, logedinUser);

router.route("/logout").post(logoutUser);

router
  .route("/:id")
  .get(SingleUserData)
  .delete(DeleteSingleUserData)
  .patch(updateSingleUserData);

export default router;
