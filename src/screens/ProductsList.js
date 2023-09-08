import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { URL_BASE } from "../api/api";

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        fetch(URL_BASE)
            .then(response => response.json())
            .then(data => setProducts(data));
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
                <h1>Title</h1>
                <div>
                    <input type="text" id="search" name="search" className="input-search" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                </div>
            </div>
            <ul>
                {filteredProducts.map((item) => {
                    return (
                        <li key={item.id}>
                            <div className="container">
                                <div className="card">
                                    <img src={item.imgUrl} alt="Resep" />
                                    <div className="content">
                                        <h2 className="title">{item.model}</h2>
                                        <NavLink to={`/product/${item.id}`}><button className="button">View Details</button></NavLink>
                                    </div>
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


