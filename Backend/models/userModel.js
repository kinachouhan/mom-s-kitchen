
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {String},
    otpExpires: {Date},
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)