import './Products.css'
import { AddToCartIcon } from './Icons'

export function Products ({ products }) {
  return (
    <main className='products'>
      <ul>
        {
          products.slice(0, 10).map(product => (
            <li key={product.id}>
              <div className='product'>
                <img src={product.thumbnail} alt={product.title} />
                <div>
                  <strong>{product.title}</strong> - ${product.price}
                </div>
                <div>
                  <button className='add-to-cart'>
                    <AddToCartIcon />
                  </button>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </main>
  )
}
