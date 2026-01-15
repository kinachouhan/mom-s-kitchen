import mongoose from "mongoose"


const orderSchema = new mongoose.Schema({
     userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
     },
     items: [{
         foodItemId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "FoodItem",
              required: true
         },
         foodItemName: String,
         price: Number,
         quantity: Number,
         image : [String]
     }],
     total: {
         type: Number,
         required: true
     },
     paymentMethod:{
         type: String,
         enum: ["COD", "Online"],
         required: true
     },
     paymentStatus:{
         type: String,
         enum: ["Pending", "Completed"],
         default: "Pending"
     },
     status: {
         type: String,
         enum: ["Order Placed" ,"Pending", "Delivered", "Cancelled", "Packing", "Out for delivery", "Shipped"],
         default : "Order Placed"
     },
      userData: {
      firstName: String,
      lastName: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
      phone: String,
      email: String
    }
}, {timestamps: true})

export const Order = mongoose.model("Order" , orderSchema)

