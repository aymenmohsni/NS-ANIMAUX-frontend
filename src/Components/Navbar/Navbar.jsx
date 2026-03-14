import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'

import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import chevron from '../Assets/chevron.png'
import ns_animaux_icon from '../Assets/ns_animaux_icon.png'

const Navbar = () => {
    const [menu,setMenu]=useState("accueil");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();
    const [profileOpen, setProfileOpen] = useState(false);

    const dropdown_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open')
    }

    const isLoggedIn = !!localStorage.getItem('auth-token');

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={ns_animaux_icon} alt="" />
            <p>NS Animaux</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={chevron} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("accueil")}}><Link style={{textDecoration:'none'}} to="/">Accueil</Link>{menu==="accueil"?<hr/>:<></>}</li>
            {[
                { key:'chat', label:'Chat', path:'/chat' },
                { key:'chien', label:'Chien', path:'/chien' },
                { key:'Poissons', label:'Poissons', path:'/Poissons' },
                { key:'oiseaux', label:'Oiseaux', path:'/oiseaux' },
            ].map(cat => (
                <li key={cat.key} className="nav-cat-item" onClick={()=>{setMenu(cat.key)}}>
                    <Link style={{textDecoration:'none'}} to={cat.path}>{cat.label}</Link>
                    {menu===cat.key?<hr/>:<></>}
                    <div className="nav-cat-dropdown">
                        <Link to={cat.path}><div className="nav-cat-dd-item">Tous les produits</div></Link>
                        <div className="nav-cat-dd-divider"></div>
                        {['Alimentation','Accessoires','Hygiène & Soins','Jouets','Litière','Cages & Habitat','Colliers & Laisses','Santé'].map(sub => (
                            <Link key={sub} to={cat.path+'?sub='+encodeURIComponent(sub)}><div className="nav-cat-dd-item">{sub}</div></Link>
                        ))}
                    </div>
                </li>
            ))}
        </ul>
        <div className="nav-login-cart">
            {!isLoggedIn && <Link to="/login"><button>Login</button></Link>}
            <Link to="/cart"><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
            {isLoggedIn && (
                <div className="nav-profile-wrapper">
                    <div className={`nav-profile-icon ${profileOpen ? 'active' : ''}`} onClick={() => setProfileOpen(!profileOpen)}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                    </div>
                    {profileOpen && (
                        <>
                            <div className="nav-profile-overlay" onClick={() => setProfileOpen(false)}></div>
                            <div className="nav-profile-dropdown">
                                <div className="nav-profile-dd-label">Mon compte</div>
                                <Link to="/profile" onClick={() => setProfileOpen(false)}>
                                    <div className="nav-profile-dropdown-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                        Mon Profil
                                    </div>
                                </Link>
                                <Link to="/profile?tab=orders" onClick={() => setProfileOpen(false)}>
                                    <div className="nav-profile-dropdown-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                                        Mes Commandes
                                    </div>
                                </Link>
                                <div className="nav-profile-dropdown-divider"></div>
                                <div className="nav-profile-dropdown-item logout" onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                                    Déconnexion
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    </div>
  )
}

export default Navbar