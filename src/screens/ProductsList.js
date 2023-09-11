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
                    <input type="text" id="search" name="search" placeholder="Search" className="input-search" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                </div>
            </div>
            <ul>
                {filteredProducts.map((item) => {
                    return (
                        <li key={item.id}>
                            <div className="product-container">
                                <div className="photo"><img src={item.imgUrl} alt="product" /></div>
                                <div className="content">
                                    <h1 className="title">{item.brand}</h1>
                                    <span className="model">{item.model}</span>
                                    <span className="price">{item.price ? `${item.price}$` : "Out of stock"}</span>
                                    <button className="button"><NavLink to={`/product/${item.id}`}>View Details<ArrowRight size={24} /></NavLink></button>

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


