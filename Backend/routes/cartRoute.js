import express from "express"

import { authMiddleware } from "../middleware/authMiddleware.js"

import { getMyCart, addToCart, removeFromCart , clearFromCart } from "../controllers/cartController.js"

const router = express.Router()

router.get("/", authMiddleware , getMyCart)
router.post("/add", authMiddleware , addToCart)
router.delete("/remove" , authMiddleware , removeFromCart)
router.delete("/clear", authMiddleware , clearFromCart)


export default router