import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './CSS/Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialTab = searchParams.get('tab') === 'orders' ? 'orders' : 'info';

    const [tab, setTab] = useState(initialTab);
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');

    // Editable fields
    const [editName, setEditName] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editCity, setEditCity] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const token = localStorage.getItem('auth-token');

    useEffect(() => {
        if (!token) { navigate('/login'); return; }

        fetch('http://localhost:4000/getuser', { headers: { 'auth-token': token } })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    setUser(data.user);
                    setEditName(data.user.name || '');
                    setEditPhone(data.user.phone || '');
                    setEditAddress(data.user.address || '');
                    setEditCity(data.user.city || '');
                }
            })
            .catch(err => console.error(err));

        fetch('http://localhost:4000/myorders', { headers: { 'auth-token': token } })
            .then(r => r.json())
            .then(data => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
            .catch(() => setLoading(false));
    }, [token, navigate]);

    const handleSaveProfile = async () => {
        setSaving(true);
        setSaveMsg('');
        try {
            const res = await fetch('http://localhost:4000/updateuser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'auth-token': token },
                body: JSON.stringify({ name: editName, phone: editPhone, address: editAddress, city: editCity })
            });
            const data = await res.json();
            if (data.success) {
                setUser(prev => ({ ...prev, name: editName, phone: editPhone, address: editAddress, city: editCity }));
                setSaveMsg('Profil mis à jour !');
            } else { setSaveMsg(data.message || 'Erreur'); }
        } catch { setSaveMsg('Erreur réseau'); }
        setSaving(false);
        setTimeout(() => setSaveMsg(''), 3000);
    };

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword) { setSaveMsg('Remplissez les deux champs'); return; }
        setSaving(true);
        setSaveMsg('');
        try {
            const res = await fetch('http://localhost:4000/changepassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'auth-token': token },
                body: JSON.stringify({ oldPassword, newPassword })
            });
            const data = await res.json();
            if (data.success) {
                setSaveMsg('Mot de passe changé !');
                setOldPassword(''); setNewPassword('');
            } else { setSaveMsg(data.message || 'Erreur'); }
        } catch { setSaveMsg('Erreur réseau'); }
        setSaving(false);
        setTimeout(() => setSaveMsg(''), 3000);
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'En attente': case 'Pending': return '#f59e0b';
            case 'En préparation': return '#3b82f6';
            case 'En livraison': return '#8b5cf6';
            case 'Livré': return '#10b981';
            case 'Annulé': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '—';

    if (loading) return <div className="profile-page"><div className="profile-loading">Chargement...</div></div>;

    return (
        <div className="profile-page">
            {/* Header */}
            <div className="profile-header-card">
                <div className="profile-avatar">{user?.name ? user.name.charAt(0).toUpperCase() : '?'}</div>
                <div className="profile-header-info">
                    <h1>{user?.name || 'Utilisateur'}</h1>
                    <p>{user?.email}</p>
                </div>
                <button className="profile-logout-btn" onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>
                    Déconnexion
                </button>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
                <button className={`profile-tab ${tab === 'info' ? 'active' : ''}`} onClick={() => setTab('info')}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Mon Profil
                </button>
                <button className={`profile-tab ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    Mes Commandes <span className="tab-badge">{orders.length}</span>
                </button>
            </div>

            {/* Tab Content */}
            {tab === 'info' && (
                <div className="profile-section">
                    <div className="profile-form-group">
                        <h3>Informations personnelles</h3>
                        <div className="profile-form-row">
                            <label>Nom complet</label>
                            <input type="text" value={editName} onChange={e => setEditName(e.target.value)} placeholder="Votre nom" />
                        </div>
                        <div className="profile-form-row">
                            <label>Email</label>
                            <input type="email" value={user?.email || ''} disabled className="disabled-input" />
                        </div>
                        <div className="profile-form-row">
                            <label>Téléphone</label>
                            <input type="tel" value={editPhone} onChange={e => setEditPhone(e.target.value)} placeholder="Numéro de téléphone" />
                        </div>
                        <div className="profile-form-row">
                            <label>Adresse</label>
                            <input type="text" value={editAddress} onChange={e => setEditAddress(e.target.value)} placeholder="Adresse" />
                        </div>
                        <div className="profile-form-row">
                            <label>Ville</label>
                            <input type="text" value={editCity} onChange={e => setEditCity(e.target.value)} placeholder="Ville" />
                        </div>
                        <button className="profile-save-btn" onClick={handleSaveProfile} disabled={saving}>
                            {saving ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>

                    <div className="profile-form-group">
                        <h3>Changer le mot de passe</h3>
                        <div className="profile-form-row">
                            <label>Mot de passe actuel</label>
                            <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="••••••••" />
                        </div>
                        <div className="profile-form-row">
                            <label>Nouveau mot de passe</label>
                            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" />
                        </div>
                        <button className="profile-save-btn" onClick={handleChangePassword} disabled={saving}>
                            Changer le mot de passe
                        </button>
                    </div>

                    {saveMsg && <div className={`profile-save-msg ${saveMsg.includes('!') ? 'success' : 'error'}`}>{saveMsg}</div>}

                    <div className="profile-form-group member-since">
                        <p>Membre depuis {user?.date ? new Date(user.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : '—'}</p>
                    </div>
                </div>
            )}

            {tab === 'orders' && (
                <div className="profile-section">
                    {orders.length === 0 ? (
                        <div className="profile-no-orders">
                            <p>Vous n'avez pas encore passé de commande</p>
                            <button onClick={() => navigate('/chat')}>Découvrir nos produits</button>
                        </div>
                    ) : (
                        <div className="profile-orders-list">
                            {orders.map(order => (
                                <div key={order._id || order.orderId} className="porder-card">
                                    <div className="porder-top">
                                        <div>
                                            <span className="porder-id">#{order.orderId}</span>
                                            <span className="porder-date">{formatDate(order.date)}</span>
                                        </div>
                                        <span className="porder-status" style={{ background: getStatusColor(order.status) + '18', color: getStatusColor(order.status), borderColor: getStatusColor(order.status) + '40' }}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="porder-products">
                                        {order.products && order.products.length > 0
                                            ? order.products.map((p, i) => (
                                                <div key={i} className="porder-product-row">
                                                    <span className="porder-pname">{p.name || `Produit #${p.productId}`}</span>
                                                    <span className="porder-pqty">×{p.quantity}</span>
                                                    {p.price > 0 && <span className="porder-pprice">{p.price * p.quantity} DT</span>}
                                                </div>
                                            ))
                                            : <p className="porder-nodetail">Détails non disponibles</p>
                                        }
                                    </div>
                                    <div className="porder-bottom">
                                        <span className="porder-meta">
                                            {order.deliveryMethod === 'pickup' ? 'Retrait en magasin' : 'Livraison'}
                                            {order.paymentMethod === 'cash' ? ' • Espèces' : ' • En ligne'}
                                        </span>
                                        <span className="porder-total">{order.total} DT</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;
