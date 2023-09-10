import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { URL_BASE } from "../api/api";

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
                <h1>Title</h1>
                <div>
                    <input type="text" id="search" name="search" placeholder="Search" className="input-search" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                </div>
            </div>
            <ul>
                {filteredProducts.map((item) => {
                    return (
                        <li key={item.id}>
                            <div className="product-container">
                                <div className="card">
                                    <div className="photo"><img src={item.imgUrl} alt="product" /></div>
                                    <div className="content">
                                        <div className="feature brand">
                                            <h1 className="title">{item.brand}</h1>
                                        </div>
                                        <div className="feature model">
                                            <span>{item.model}</span>
                                        </div>
                                        <div className="feature price">
                                            <span>{item.price}$</span>
                                        </div>
                                        <NavLink to={`/product/${item.id}`}>
                                            <div className="feature button">
                                                <button className="button">View Details</button>
                                            </div></NavLink>
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


