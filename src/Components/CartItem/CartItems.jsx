import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import {useNavigate} from 'react-router-dom';

const CartItems = () => {

  const navigate = useNavigate();


    const {getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext);
    console.log(cartItems)
    return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Produit</p>
            <p>Titre</p>
            <p>Prix</p>
            <p>Quantité</p>
            <p>Total</p>
            <p>Supprimer</p>
        </div>
        <hr />
        {Object.keys(cartItems).map((productId) => {
        const product = all_product.find((p) => p.id === parseInt(productId, 10)); // houni yelzem l products li ajoutinehom fel cartItems nel9awhom fel all_products khater  enti kif taaml ajouter au panier  fel la79i9a thot ken fel id mte3 lproduct x  fi object as a key wel value mte3ou heya l quantité mte3 9adeh men marra nzalt 3la ajouter au panier  ,

        const quantity = cartItems[productId];

        if (quantity > 0 && product) {
          return (
            <div key={productId}>
              <div className='cartitems-format cartitems-format-main'>
                <img src={product.image} alt={product.name} className='carticon-product-icon' />
                <p>{product.name}</p>
                <p>{product.new_price} DT</p>
                <button className='cartitems-quantity'>{quantity}</button>
                <p>{product.new_price*quantity} DT</p> 
                <img className='cartietms-remove-icon' src={remove_icon} onClick={() => removeFromCart(productId)} alt='Remove' />
              </div>
              <hr />
            </div>
          );
        } else {
          return null;
        }
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Total</h1>
          <div>
            <div className='cartitems-total-item'>
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} DT</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>{getTotalCartAmount()===0?0:7} DT</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{getTotalCartAmount()===0?0:getTotalCartAmount()+7} DT</h3>
              
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>Proceed to checkout</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here.</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
        
    </div>
  )
}

export default CartItems