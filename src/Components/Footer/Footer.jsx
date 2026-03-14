import React from 'react'
import './Footer.css'
import ns_animaux_icon from '../Assets/ns_animaux_icon.png'
import instagram_icon from '../Assets/instagram_icon.png'
import facebook_icon from '../Assets/facebook.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className="footer-main">
            <div className="footer-col footer-brand">
                <div className="footer-logo">
                    <img src={ns_animaux_icon} alt="" />
                    <p>NS Animaux</p>
                </div>
                <p className="footer-desc">Votre animalerie de confiance en Tunisie. Alimentation, accessoires et soins pour tous vos animaux.</p>
                <div className="footer-social">
                    <a href="https://www.facebook.com/NSanimaux" target='_blank' rel='noreferrer' className="footer-social-link">
                        <img src={facebook_icon} alt='Facebook' />
                    </a>
                    <a href="https://www.instagram.com/ns.animaux/" target='_blank' rel='noreferrer' className="footer-social-link">
                        <img src={instagram_icon} alt='Instagram' />
                    </a>
                </div>
            </div>

            <div className="footer-col">
                <h4>Catégories</h4>
                <Link to="/chat">Chat</Link>
                <Link to="/chien">Chien</Link>
                <Link to="/Poissons">Poissons</Link>
                <Link to="/oiseaux">Oiseaux</Link>
            </div>

            <div className="footer-col">
                <h4>Informations</h4>
                <Link to="/terms">Conditions d'utilisation</Link>
                <Link to="/privacy">Politique de confidentialité</Link>
                <Link to="/profile?tab=orders">Suivi de commande</Link>
            </div>

            <div className="footer-col">
                <h4>Contact</h4>
                <p>NS Animaux</p>
                <p>Tunisie</p>
                <a href="https://www.facebook.com/NSanimaux" target='_blank' rel='noreferrer'>Facebook</a>
                <a href="https://www.instagram.com/ns.animaux/" target='_blank' rel='noreferrer'>Instagram</a>
            </div>
        </div>

        <div className="footer-bottom">
            <p>© {new Date().getFullYear()} NS Animaux. Tous droits réservés.</p>
            <p>Créé par <a href="https://aymenmohsni.netlify.app" target='_blank' rel='noreferrer'>Aymen Mohsni</a></p>
        </div>
    </footer>
  )
}

export default Footer
