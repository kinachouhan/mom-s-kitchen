import express from "express"
import {createFoodItem , getAllFoodItems , deleteFoodItem , getFoodItem} from "../controllers/foodItemController.js"
import {upload} from "../middleware/multerUpload.js"


const router = express.Router()

router.post("/create", upload.single("image"), createFoodItem);
router.get("/food-items" , getAllFoodItems)
router.get("/:id" , getFoodItem)
router.delete("/delete/:id", deleteFoodItem)

export default router