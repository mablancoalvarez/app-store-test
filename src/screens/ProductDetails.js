import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { URL_BASE, URL_POST } from '../services/api';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { LOCALSTORAGE_KEY } from '../utils/constants';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [optionsSelect, setOptionsSelect] = useState({
    colors: '',
    storages: ''
  });
  const { setData } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL_BASE}/${id}`);
        const data = await response.json();
        setProduct(data);
        setDefaultOptions(data.options);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const setDefaultOptions = (options) => {
    const setDefaultOption = (name) => {
      if (options && options[name] && options[name].length > 0 && !optionsSelect[name]) {
        setOptionsSelect((prevState) => ({
          ...prevState,
          [name]: options[name][0].name
        }));
      }
    };

    setDefaultOption('colors');
    setDefaultOption('storages');
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setOptionsSelect((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleClick = () => {
    const { colors, storages } = optionsSelect;
    sendData(id, colors, storages);
  };

  const sendData = async (id, colors, storages) => {
    try {
      const response = await fetch(URL_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          colorCode: colors,
          storageCode: storages
        })
      });
      const data = await response.json();

      const cartCountArray = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];
      const existingItemIndex = cartCountArray.findIndex(
        (item) => item.id === id && item.color === colors && item.storage === storages
      );

      if (existingItemIndex !== -1) {
        cartCountArray[existingItemIndex].count = data.count;
        cartCountArray[existingItemIndex].lastClicked = new Date().getTime();
      } else {
        cartCountArray.push({
          id: id,
          color: colors,
          storage: storages,
          count: data.count,
          lastClicked: new Date().getTime()
        });
      }

      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(cartCountArray));
      setData(cartCountArray);
      setTimeout(
        () => {
          sendData(id, colors, storages);
        },
        60 * 60 * 1000
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  const {
    brand,
    model,
    price,
    cpu,
    ram,
    os,
    displayResolution,
    battery,
    primaryCamera,
    secondaryCamera,
    dimensions,
    weight,
    imgUrl
  } = product;
  const { colors, storages } = optionsSelect;
  const unavailable = !price ? 'unavailable' : '';
  return (
    <div data-testid="product-details" className="product-details">
      <div className="product-details__content">
        <img src={imgUrl} alt="Product"></img>
        <div className="product-details__info">
          <ul className="product-details__list">
            <li className="product-details__title">
              {brand} {model}
            </li>
            <li className={`product-details__price ${unavailable}`}>
              {price ? `${price}$` : 'Out of stock'}
            </li>
            <li>CARACTERISTICAS</li>
            <div className="product-details__features">
              {[cpu, ram, os, displayResolution, battery, dimensions, weight].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
              <li>
                <p>{primaryCamera}</p>
                <p>{secondaryCamera}</p>
              </li>
            </div>
          </ul>
          <hr className="product-details__separator"></hr>
          <div className="product-details__actions">
            <form>
              <div className="product-details__selectors">
                <div className="product-details__selectors-content">
                  <p className="product-details__selectors-title">Color</p>
                  <select name="colors" className="color" value={colors} onChange={handleOnChange}>
                    {product.options?.colors?.map((item) => (
                      <option value={item.name} key={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="product-details__selectors-content">
                  <p className="product-details__selectors-title">Storage</p>
                  <select name="storages" value={storages} onChange={handleOnChange}>
                    {product.options?.storages?.map((item) => (
                      <option value={item.name} key={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button role="button" type="button" disabled={!price} className="product-details__button" onClick={handleClick}>
                Add to cart
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
