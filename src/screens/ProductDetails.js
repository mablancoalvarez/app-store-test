
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { URL_BASE } from "../api/api";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch(`${URL_BASE}/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, []);
    const { brand, model, price, cpu, ram, os, displayResolution, battery, primaryCamera, secondaryCmera, dimentions, weight, options } = product



    const Selectors = () => {
        return (
            <>
                <div>
                    <select name="color">
                        {options?.colors?.map((item, index) => (
                            <option key={index} value={item.code}>{item.name}</option>
                        ))}
                    </select>

                    <select name="storages">
                        {options?.storages?.map((item, index) => (
                            <option key={index} value={item.code}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </>
        );
    }

    return (
        <div>
            <h1>Product Detail {id}</h1>
            <div>
                <img src={product.imgUrl}></img>
                <div>
                    <ul>
                        <li>{brand}</li>
                        <li>{model}</li>
                        <li>{price}</li>
                        <li>{cpu}</li>
                        <li>{ram}</li>
                        <li>{os}</li>
                        <li>{displayResolution}</li>
                        <li>{battery}</li>
                        <li><p>{primaryCamera}</p>
                            <p>{secondaryCmera}</p> </li>
                        <li>{dimentions}</li>
                        <li>{weight}</li>
                    </ul>
                    <Selectors />
                    {/* <div>
                        {product.options.map((option) => {
                            <select name={option} id={`product-${option}}`}>{ }</select>
                        })}
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default ProductDetails;