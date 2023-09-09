
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { URL_BASE } from "../api/api";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [optionsSelect, setOptionsSelect] = useState({
        colors: '',
        storages: ''
    });
    const { setData, setValues } = useContext(DataContext);

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
                setOptionsSelect(prevState => ({
                    ...prevState,
                    [name]: options[name][0].name
                }));
            }
        };

        setDefaultOption("colors");
        setDefaultOption("storages");
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setOptionsSelect(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    function handleClick() {
        // const timestamp = Date.now(); // Obtener la marca de tiempo actual
        // localStorage.setItem("buttonTimestamp", timestamp); // Almacenar la marca de tiempo en localStorage

        sendData();

    }

    async function sendData() {
        try {
            const response = await fetch('https://itx-frontend-test.onrender.com/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    colorCode: optionsSelect["colors"],
                    storageCode: optionsSelect["storages"],
                })
            });
            const data = await response.json();

            const cartCountArray = JSON.parse(localStorage.getItem("cartCount")) || [];
            const newCartItem = {
                id: id,
                color: optionsSelect["colors"],
                storage: optionsSelect["storages"],
                count: data.count
            };

            const idExists = cartCountArray.some((item) => item.id === id);
            if (!idExists) {
                cartCountArray.push(newCartItem);
            }

            localStorage.setItem("cartCount", JSON.stringify(cartCountArray));
            setData(cartCountArray);
            setValues({ id: id, color: optionsSelect["colors"], storage: optionsSelect["storages"] });

            setTimeout(() => {
                const updatedCartCountArray = cartCountArray.filter((item) => item.id !== id);
                localStorage.setItem("cartCount", JSON.stringify(updatedCartCountArray));
                sendData(); // Llamada recursiva después de una hora
            }, 60 * 60 * 1000); s
        } catch (error) {

        }
    }

    const { brand, model, price, cpu, ram, os, displayResolution, battery, primaryCamera, secondaryCamera, dimensions, weight } = product;
    const { colors, storages } = optionsSelect;

    return (
        <div className="product-details">
            <h1>Product Detail {id}</h1>
            <div className="product-details-content">
                <img src={product.imgUrl} alt="Product"></img>
                <div className="product-details-info">
                    <ul>
                        <li>{brand}</li>
                        <li>{model}</li>
                        <li>{price}</li>
                        <li>{cpu}</li>
                        <li>{ram}</li>
                        <li>{os}</li>
                        <li>{displayResolution}</li>
                        <li>{battery}</li>
                        <li>
                            <p>{primaryCamera}</p>
                            <p>{secondaryCamera}</p>
                        </li>
                        <li>{dimensions}</li>
                        <li>{weight}</li>
                    </ul>
                    <div className="product-details-actions">
                        <div className="product-details-selectors">
                            <select name="colors" className="color" value={colors} onChange={handleOnChange}>
                                {product.options?.colors?.map((item, index) => (
                                    <option value={item.name} key={index}>{item.name}</option>
                                ))}
                            </select>

                            <select name="storages" value={storages} onChange={handleOnChange}>
                                {product.options?.storages?.map((item, index) => (
                                    <option value={item.name} key={index}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleClick}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductDetails;