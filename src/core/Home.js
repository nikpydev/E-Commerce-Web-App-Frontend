import React, {useEffect, useState} from 'react';
import {API} from "../backend";
import Base from "./Base";
import Card from "./Card";
import {getAllProducts} from "./helper/coreapicalls";
import FilterCard from "./FilterCard";

function Home(props) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(undefined);
    const [buttonLabel, setButtonLabel] = useState("Default");

    const loadAllProducts = () => {
        getAllProducts()
            .then(data => {
                if (data) {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setProducts(data.foundProducts)
                    }
                }
            })
    }

    useEffect(() => {
        loadAllProducts()
    }, [buttonLabel]);


    return (
        <Base title={"Home Page"} description={"Welcome to the T-Shirt store"}>
            <div className="row text-center">
                <div className="col-2">
                    <h3>Filter results</h3>
                    <FilterCard buttonLabel={buttonLabel} setButtonLabel={setButtonLabel}/>
                </div>
                <div className="col-10">
                    <h1 className="text-white">All available T-Shirts</h1>
                    <div className="row">
                        {products.map((product, index) => {
                            switch (buttonLabel) {
                                case "Below $10":
                                    return (
                                        <div className="col-4 mb-4" key={index}>
                                            {
                                                product.price < 10
                                                    ? <Card product={product.price < 10 ? product : undefined}/>
                                                    : undefined
                                            }
                                        </div>
                                    )
                                case "$10 - $30":
                                    return (
                                        <div className="col-4 mb-4" key={index}>
                                            {
                                                (product.price >= 10 && product.price < 30)
                                                    ? <Card product={
                                                        (product.price >= 10 && product.price < 30)
                                                            ? product
                                                            : undefined
                                                    }/>
                                                    : undefined
                                            }
                                        </div>
                                    )
                                case "Above $30":
                                    return (
                                        <div className="col-4 mb-4" key={index}>
                                            {
                                                product.price > 30
                                                    ? <Card product={product.price > 30 ? product : undefined}/>
                                                    : undefined
                                            }
                                        </div>
                                    )
                                default:
                                    return (
                                        <div className="col-4 mb-4" key={index}>
                                            <Card product={product}/>
                                        </div>
                                    )
                            }
                        })}
                    </div>
                </div>
            </div>
        </Base>
    );
}

export default Home;