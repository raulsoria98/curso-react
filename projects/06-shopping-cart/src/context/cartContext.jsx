import { createContext, useReducer } from 'react'
import { cartReducer, cartInitialState, CART_ACTIONS } from '../reducers/cartReducer'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: product })
  }

  const removeFromCart = (product) => {
    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: product })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  return (
    <CartContext.Provider value={{ cart: state, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
