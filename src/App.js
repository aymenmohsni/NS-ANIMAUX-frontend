import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Accueil from './Pages/Accueil';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import PlaceOrder from './Pages/PlaceOrder';
import Profile from './Pages/Profile';
import Terms from './Pages/Terms';
import Privacy from './Pages/Privacy';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil/>} />
          <Route path="/chat" element={<ShopCategory banner={men_banner} category="chat"/>} />
          <Route path="/chien" element={<ShopCategory banner={women_banner} category="chien"/>} />
          <Route path="/poissons" element={<ShopCategory banner={kid_banner} category="poissons"/>} />
          <Route path="/oiseaux" element={<ShopCategory banner={men_banner} category="oiseaux"/>} />

          <Route path="/product/:productId" element={<Product/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/terms' element={<Terms/>} />
          <Route path='/privacy' element={<Privacy/>} />
          <Route path="/login" element={<LoginSignup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
