import express from 'express'
import { deleteUser, getUser,  Signout, updateUser } from "../controller/user.controller.js";
import {verifyToken} from '../utils/verifyToken.js'

const router = express.Router()


router.get("/user/:id",verifyToken, getUser);
router.put("/update-user/:id",verifyToken, updateUser);
router.delete("/delete-user/:id", verifyToken, deleteUser);
router.post("/signout",verifyToken, Signout);

export default router