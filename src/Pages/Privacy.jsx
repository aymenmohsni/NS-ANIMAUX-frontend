import React from 'react';
import './CSS/Legal.css';

const Privacy = () => (
    <div className="legal-page">
        <h1>Politique de confidentialité</h1>
        <p className="legal-updated">Dernière mise à jour : 2025</p>

        <section>
            <h2>1. Collecte des données</h2>
            <p>Nous collectons les informations que vous nous fournissez lors de la création de votre compte et lors de vos commandes : nom, email, numéro de téléphone, adresse de livraison.</p>
        </section>

        <section>
            <h2>2. Utilisation des données</h2>
            <p>Vos données personnelles sont utilisées pour traiter vos commandes, gérer votre compte, vous contacter concernant vos commandes, et améliorer nos services.</p>
        </section>

        <section>
            <h2>3. Protection des données</h2>
            <p>Nous prenons des mesures raisonnables pour protéger vos informations personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction.</p>
        </section>

        <section>
            <h2>4. Partage des données</h2>
            <p>Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles à des tiers, sauf si cela est nécessaire pour le traitement de votre commande (par exemple, service de livraison).</p>
        </section>

        <section>
            <h2>5. Cookies</h2>
            <p>Notre site utilise le stockage local du navigateur pour maintenir votre session de connexion et votre panier. Aucun cookie de suivi tiers n'est utilisé.</p>
        </section>

        <section>
            <h2>6. Vos droits</h2>
            <p>Vous avez le droit d'accéder à vos données personnelles, de les rectifier ou de demander leur suppression en nous contactant via nos réseaux sociaux.</p>
        </section>

        <section>
            <h2>7. Contact</h2>
            <p>Pour toute question relative à cette politique de confidentialité, contactez-nous via notre page Facebook ou Instagram.</p>
        </section>
    </div>
);

export default Privacy;
