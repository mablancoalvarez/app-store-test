import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductsList from "./screens/ProductsList";
import ProductDetails from './screens/ProductDetails';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<ProductsList />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
