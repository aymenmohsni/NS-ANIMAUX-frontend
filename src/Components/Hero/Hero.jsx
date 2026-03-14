import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import bird from '../Assets/bird.png'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>collection</p>
                <p>for everyone</p>
            </div>
            {/* <Link to="/NewCollections"><div className="hero-latest-btn">
                <div>Latest collection</div>
                <img src={arrow_icon} alt="" />
            </div></Link>    */}
        </div>
        <div className="hero-right">
            <img src={bird} alt="" />
        </div>
    </div>
  )
}

export default Hero