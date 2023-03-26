import { createContext, useState } from 'react'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const productInCartIndex = cart.findIndex(item => item.id === product.id)

    // If it is, increase the quantity
    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart)
      newCart[productInCartIndex].quantity += 1
      return setCart(newCart)
    }

    // If it isn't, add it to the cart
    setCart(prevState => [...prevState, { ...product, quantity: 1 }])
  }

  const removeFromCart = (product) => {
    // Check if the product is already in the cart
    const productInCartIndex = cart.findIndex(item => item.id === product.id)

    // If it is, decrease the quantity. If the quantity is 1, remove it from the cart
    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart)
      if (newCart[productInCartIndex].quantity === 1) {
        newCart.splice(productInCartIndex, 1)
      } else {
        newCart[productInCartIndex].quantity -= 1
      }
      return setCart(newCart)
    }
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
