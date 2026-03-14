import React, { useContext, useState } from 'react';
import './CSS/PlaceOrder.css';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { getTotalCartAmount, cartItems, all_product, clearCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const [deliveryMethod, setDeliveryMethod] = useState('delivery');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [orderState, setOrderState] = useState('form');
    const [orderResult, setOrderResult] = useState(null);
    const [customerInfo, setCustomerInfo] = useState({ fullName:'', email:'', phone:'', address:'', city:'' });

    const subtotal = getTotalCartAmount();
    const shippingFee = deliveryMethod === 'delivery' ? (subtotal === 0 ? 0 : 7) : 0;
    const total = subtotal === 0 ? 0 : subtotal + shippingFee;

    const handleInputChange = (e) => setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });

    const getCartProducts = () => {
        const items = [];
        for (const key in cartItems) {
            if (cartItems[key] > 0) {
                const product = all_product.find(p => p.id === Number(key));
                if (product) items.push({ ...product, quantity: cartItems[key] });
            }
        }
        return items;
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        if (subtotal === 0) return;

        const products = Object.keys(cartItems).filter(key => cartItems[key] > 0).map(key => ({ productId: key, quantity: cartItems[key] }));
        const order = { products, subtotal, shippingFee, total, customerInfo, deliveryMethod, paymentMethod };
        const token = localStorage.getItem('auth-token');
        if (!token) { navigate('/login'); return; }

        setOrderState('processing');
        try {
            if (paymentMethod === 'online') {
                const payRes = await fetch('http://localhost:4000/create-payment', { method:'POST', headers:{'Content-Type':'application/json','auth-token':token}, body:JSON.stringify({amount:total}) });
                const payData = await payRes.json();
                if (payData.paymentUrl) { window.location.href = payData.paymentUrl; return; }
            }
            const response = await fetch('http://localhost:4000/createorder', { method:'POST', headers:{'Content-Type':'application/json','auth-token':token}, body:JSON.stringify(order) });
            if (response.status === 401) { navigate('/login'); return; }
            const data = await response.json();
            if (data.success) { setOrderResult(data); setOrderState('success'); clearCart(); }
            else { setOrderState('error'); }
        } catch (error) { console.error(error); setOrderState('error'); }
    };

    if (orderState === 'success') {
        return (
            <div className="order-confirmation">
                <div className="order-confirmation-card">
                    <div className="order-success-icon"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="25" fill="none" stroke="#4BB543" strokeWidth="2"/><path fill="none" stroke="#4BB543" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l7 7 16-16"/></svg></div>
                    <h1>Commande confirmée !</h1>
                    <p className="order-success-sub">Merci pour votre commande chez NS Animaux</p>
                    <div className="order-conf-details">
                        <div className="conf-row"><span>N° commande</span><strong>{orderResult?.orderId || 'N/A'}</strong></div>
                        <div className="conf-row"><span>Livraison</span><strong>{deliveryMethod === 'delivery' ? 'À domicile' : 'Retrait en magasin'}</strong></div>
                        <div className="conf-row"><span>Paiement</span><strong>{paymentMethod === 'cash' ? 'Espèces' : 'En ligne'}</strong></div>
                        <div className="conf-row conf-total"><span>Total</span><strong>{total} DT</strong></div>
                    </div>
                    <div className="conf-actions">
                        <button className="btn-primary" onClick={() => navigate('/')}>Retour à l'accueil</button>
                        <button className="btn-secondary" onClick={() => navigate('/profile?tab=orders')}>Voir mes commandes</button>
                    </div>
                </div>
            </div>
        );
    }
    if (orderState === 'processing') {
        return <div className="order-confirmation"><div className="order-confirmation-card"><div className="order-spinner"></div><h2>Traitement en cours...</h2></div></div>;
    }
    if (orderState === 'error') {
        return (
            <div className="order-confirmation"><div className="order-confirmation-card">
                <div className="order-error-icon"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="25" fill="none" stroke="#e74c3c" strokeWidth="2"/><path fill="none" stroke="#e74c3c" strokeWidth="3" strokeLinecap="round" d="M18 18l16 16M34 18l-16 16"/></svg></div>
                <h1>Erreur</h1><p>Une erreur est survenue. Veuillez réessayer.</p>
                <div className="conf-actions"><button className="btn-primary" onClick={() => setOrderState('form')}>Réessayer</button></div>
            </div></div>
        );
    }

    const cartProducts = getCartProducts();

    return (
        <div className="place-order-page">
            <div className="place-order-header"><h1>Finaliser la commande</h1></div>
            <form className="place-order" onSubmit={placeOrder}>
                <div className="place-order-left">
                    <div className="order-section">
                        <h2 className="section-title"><span className="section-num">1</span>Informations personnelles</h2>
                        <div className="form-grid">
                            <input type="text" name="fullName" value={customerInfo.fullName} onChange={handleInputChange} placeholder='Nom et Prénom' required />
                            <input type="email" name="email" value={customerInfo.email} onChange={handleInputChange} placeholder='Email' required />
                            <input type="tel" name="phone" value={customerInfo.phone} onChange={handleInputChange} placeholder='Téléphone' required />
                        </div>
                    </div>
                    <div className="order-section">
                        <h2 className="section-title"><span className="section-num">2</span>Méthode de réception</h2>
                        <div className="option-cards">
                            <label className={`option-card ${deliveryMethod==='delivery'?'selected':''}`}>
                                <input type="radio" name="dm" value="delivery" checked={deliveryMethod==='delivery'} onChange={e=>setDeliveryMethod(e.target.value)} />
                                <div className="oc-content"><span className="oc-icon">🚚</span><div><strong>Livraison à domicile</strong><span>+7 DT</span></div></div>
                            </label>
                            <label className={`option-card ${deliveryMethod==='pickup'?'selected':''}`}>
                                <input type="radio" name="dm" value="pickup" checked={deliveryMethod==='pickup'} onChange={e=>setDeliveryMethod(e.target.value)} />
                                <div className="oc-content"><span className="oc-icon">🏪</span><div><strong>Retrait en magasin</strong><span>Gratuit</span></div></div>
                            </label>
                        </div>
                        {deliveryMethod === 'delivery' && <div className="form-grid" style={{marginTop:14}}><input type="text" name="address" value={customerInfo.address} onChange={handleInputChange} placeholder='Adresse' required /><input type="text" name="city" value={customerInfo.city} onChange={handleInputChange} placeholder='Ville' required /></div>}
                    </div>
                    <div className="order-section">
                        <h2 className="section-title"><span className="section-num">3</span>Paiement</h2>
                        <div className="option-cards">
                            <label className={`option-card ${paymentMethod==='cash'?'selected':''}`}>
                                <input type="radio" name="pm" value="cash" checked={paymentMethod==='cash'} onChange={e=>setPaymentMethod(e.target.value)} />
                                <div className="oc-content"><span className="oc-icon">💵</span><div><strong>{deliveryMethod==='delivery'?'Paiement à la livraison':'Paiement en magasin'}</strong><span>Espèces</span></div></div>
                            </label>
                            <label className={`option-card ${paymentMethod==='online'?'selected':''}`}>
                                <input type="radio" name="pm" value="online" checked={paymentMethod==='online'} onChange={e=>setPaymentMethod(e.target.value)} />
                                <div className="oc-content"><span className="oc-icon">💳</span><div><strong>Paiement en ligne</strong><span>Bientôt disponible</span></div></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="place-order-right">
                    <div className="order-summary-card">
                        <h2>Récapitulatif</h2>
                        <div className="order-summary-items">{cartProducts.map(item => (
                            <div key={item.id} className="summary-item"><img src={item.image} alt={item.name} /><div className="summary-item-info"><p>{item.name}</p><p className="si-qty">Qté: {item.quantity}</p></div><p className="si-price">{item.new_price * item.quantity} DT</p></div>
                        ))}</div>
                        <div className="summary-totals">
                            <div className="st-row"><p>Sous-total</p><p>{subtotal} DT</p></div>
                            <div className="st-row"><p>Livraison</p><p>{shippingFee === 0 ? 'Gratuit' : shippingFee+' DT'}</p></div>
                            <hr/><div className="st-row st-final"><h3>Total</h3><h3>{total} DT</h3></div>
                        </div>
                        <button type="submit" className="confirm-order-btn" disabled={subtotal===0}>{subtotal===0?'Panier vide':'Confirmer la commande'}</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PlaceOrder;
