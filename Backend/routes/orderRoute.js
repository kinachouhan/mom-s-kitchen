
import express from "express"
import {authMiddleware} from "../middleware/authMiddleware.js"
import {placeOrder , getUserOrders , getAllOrders , updateOrderStatus} from "../controllers/orderController.js"

const router = express.Router()

router.post("/",authMiddleware,  placeOrder)
router.put("/:orderId/status", authMiddleware , updateOrderStatus)
router.get("/", authMiddleware, getAllOrders)
router.get("/my-orders", authMiddleware , getUserOrders)



export default router