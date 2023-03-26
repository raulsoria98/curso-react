import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'

export function Products ({ products }) {
  const { cart, addToCart, removeFromCart } = useCart()

  const checkProductInCart = (product) => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <main className='products'>
      <ul>
        {
          products.slice(0, 10).map(product => {
            const isProductInCart = checkProductInCart(product)
            return (
              <li key={product.id}>
                <div className='product'>
                  <img src={product.thumbnail} alt={product.title} />
                  <div>
                    <strong>{product.title}</strong> - ${product.price}
                  </div>
                  <div>
                    <button style={{ backgroundColor: '#09f' }} onClick={() => addToCart(product)}>
                      <AddToCartIcon />
                    </button>
                    <button
                      disabled={!isProductInCart}
                      style={{ backgroundColor: !isProductInCart ? 'darkred' : 'red' }}
                      onClick={() => removeFromCart(product)}
                    >
                      <RemoveFromCartIcon />
                    </button>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
    </main>
  )
}
