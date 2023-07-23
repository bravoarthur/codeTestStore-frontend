import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Catalog from './pages/Catalog/Catalog';
import ProductPage from './pages/ProductPage/ProductPage';


function App() {
    return (
        <div className="container">
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/catalog' element={<Catalog/>}/>
                <Route path='/product/:id' element={<ProductPage/>}/>
            </Routes>
            <Footer/>
      
     
        </div>
    );
}

export default App;
