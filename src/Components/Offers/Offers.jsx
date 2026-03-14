import React from 'react'
import './Offers.css'
import exclusive_image_cat from '../Assets/exclusive_image_cat.png'
import { Link } from 'react-router-dom'


const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers for you</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <Link to="/chat">
              <button>Check Now</button>
            </Link>
        </div>
        
          <div className="offers-right">
            <img src={exclusive_image_cat} alt="" />
          </div>
        
    </div>
  )
}

export default Offers