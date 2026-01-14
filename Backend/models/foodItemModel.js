
import mongoose from "mongoose"

const foodItemSchema = new mongoose.Schema({
     name:{
         type: String,
         required: true
     },
     description:{
          type: String,
          required: true
     },
     price: {
         type: Number,
         required: true
     },
     image: {
          type: String,
          required: true
     },
     category:{
         type: String,
         required: true
     },
     subCategory: {
         type: String,
         required: true
     }
}, {timestamps: true})

export const FoodItem = mongoose.model("FoodItem", foodItemSchema)






