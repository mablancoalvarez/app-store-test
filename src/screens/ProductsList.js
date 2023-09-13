import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { URL_BASE } from '../services/api';
import { ArrowRight } from '@phosphor-icons/react';
import { filterProducts } from '../utils/helpers';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL_BASE);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const fieldsToSearch = ['brand', 'price', 'id', 'model'];
  const filteredProducts = filterProducts(products, inputValue, fieldsToSearch);

  return (
    <main data-testid="products-list" className="products">
      <div className="products__searcher">
        <h1 role="heading">Vuelta al cole</h1>
        <div>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            className="products__searcher-input"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </div>
      </div>
      <ul>
        {filteredProducts.map(({ id, imgUrl, brand, model, price }) => {
          const unavailable = !price ? 'unavailable' : '';
          return (
            <li key={id}>
              <div className="products__product-container">
                <div className="products__photo">
                  <img src={imgUrl} alt="product" />
                </div>
                <div className="products__content">
                  <h1 className="products__title">{brand}</h1>
                  <span className="products__model">{model}</span>
                  <span className={`products__price ${unavailable}`}>
                    {price ? `${price}$` : 'Out of stock'}
                  </span>
                  <NavLink className="products__link" to={`/product/${id}`}>
                    <button role="button" className="products__button">

                      View Details
                      <ArrowRight size={24} />

                    </button>
                  </NavLink>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
};
export default ProductsList;
