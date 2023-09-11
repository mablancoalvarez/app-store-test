import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { URL_BASE } from "../api/api";
import { ArrowRight } from "@phosphor-icons/react";

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [inputValue, setInputValue] = useState("");

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
    const lowerCaseInputValue = inputValue.toLowerCase();

    const filteredProducts = products.filter(({ brand, price, id, model }) => (
        brand.toLowerCase().includes(lowerCaseInputValue) ||
        price.toString().includes(lowerCaseInputValue) ||
        id.toString().includes(lowerCaseInputValue) ||
        model.toLowerCase().includes(lowerCaseInputValue)
    ));

    return (
        <main className="products">
            <div className="products__searcher">
                <h1>Vuelta al cole</h1>
                <div>
                    <input type="text" id="search" name="search" placeholder="Search" className="products__searcher-input" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                </div>
            </div>
            <ul>
                {filteredProducts.map(({ id, imgUrl, brand, model, price }) => {
                    const unavailable = !price ? "unavailable" : "";
                    return (
                        <li key={id}>
                            <div className="products__product-container">
                                <div className="products__photo"><img src={imgUrl} alt="product" /></div>
                                <div className="products__content">
                                    <h1 className="products__title">{brand}</h1>
                                    <span className="products__model">{model}</span>
                                    <span className={`products__price ${unavailable}`}>{price ? `${price}$` : "Out of stock"}</span>
                                    <button className="products__button"><NavLink to={`/product/${id}`}>View Details<ArrowRight size={24} /></NavLink></button>

                                </div>
                            </div>

                        </li>

                    );
                })}
            </ul >
        </main >
    );

}
export default ProductsList


