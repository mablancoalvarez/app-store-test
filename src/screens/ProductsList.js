import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { URL_BASE } from "../api/api";

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(URL_BASE)
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);
    console.log("products", products)
    return (
        <main className="products">
            <ul>
                {products.map((item) => {
                    return (
                        <li key={item.id}>
                            <NavLink to={`/product/${item.id}`}>

                                <img src={item.imgUrl} ></img>
                                <div>{item.model}</div>
                            </NavLink>
                        </li>

                    );
                })}
            </ul >
        </main >
    );

}
export default ProductsList