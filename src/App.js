import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductsList from "./screens/ProductsList";
import ProductDetails from './screens/ProductDetails';
import { DataProvider } from './context/DataContext';



function App() {
  return (
    <DataProvider>
      <div className="App ly-main">
        <Header />
        <Routes>
          <Route path='/' element={<ProductsList />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
