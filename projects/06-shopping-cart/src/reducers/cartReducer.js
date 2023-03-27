export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

// Update the cart in localStorage
export const updateCartInLocalStorage = (cart) => {
  window.localStorage.setItem('cart', JSON.stringify(cart))
}

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case CART_ACTIONS.ADD_TO_CART: {
      const productInCartIndex = state.findIndex(item => item.id === actionPayload.id)
      // If it is, increase the quantity
      if (productInCartIndex >= 0) {
        const newState = [...state]
        newState[productInCartIndex].quantity += 1
        updateCartInLocalStorage(newState)
        return newState
      }
      // If it isn't, add it to the cart
      const newState = [...state, { ...actionPayload, quantity: 1 }]
      updateCartInLocalStorage(newState)
      return newState
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      // Check if the product is already in the cart
      const productInCartIndex = state.findIndex(item => item.id === actionPayload.id)
      // If it is, decrease the quantity. If the quantity is 1, remove it from the cart
      if (productInCartIndex >= 0) {
        const newState = [...state]
        if (newState[productInCartIndex].quantity === 1) {
          newState.splice(productInCartIndex, 1)
        } else {
          newState[productInCartIndex].quantity -= 1
        }
        updateCartInLocalStorage(newState)
        return newState
      }
      return state
    }

    case CART_ACTIONS.CLEAR_CART: {
      updateCartInLocalStorage([])
      return []
    }

    default:
      return state
  }
}
