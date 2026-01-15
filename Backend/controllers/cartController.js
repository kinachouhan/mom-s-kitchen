import { Cart } from "../models/cartModel.js";

export const getMyCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.foodItem")

        res.status(200).json({
            success: true,
            responseData: cart || { items: [] }
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id
    const { foodItemId, quantity = 1 } = req.body

    let cart = await Cart.findOne({ user: userId })

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ foodItem: foodItemId, quantity }]
      })
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.foodItem.toString() === foodItemId.toString()
      )

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity
      } else {
        cart.items.push({ foodItem: foodItemId, quantity })
      }
    }

    await cart.save()
    await cart.populate("items.foodItem")

    res.status(200).json({
      success: true,
      cart
    })

  } catch (error) {
    console.error("ADD TO CART ERROR 👉", error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}



export const removeFromCart = async (req, res) => {
    try {
        const { foodItemId } = req.body

        const cart = await Cart.findOne({ user: req.user._id })

        if (!cart) {
            return res.status(400).json({
                success: false,
                message: "Food Item is not added in cart"
            })
        }

        cart.items = cart.items.filter((item) => item.foodItem.toString() !== foodItemId)

        await cart.save()

        res.status(200).json({
            success: true,
            responseData: cart
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const clearFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] },
      { new: true } // 🔥 THIS IS REQUIRED
    )

    res.status(200).json({
      success: true,
      message: "Cart has been cleared!",
      responseData: cart
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}
