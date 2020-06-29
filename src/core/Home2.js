import React, {useState, useEffect} from 'react';
import Base from "./Base";
import Card from "./Card";
import Card2 from "./Card2";
import {getAllProducts} from "./helper/coreapicalls";
import FilterCard from "./FilterCard";

function Home2(props) {
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
        <Base title={"Home Page"} description={"Welcome to the E-Commerce Store"}>
            <div className="home-container">
                <div className="sidebar">
                    <h3>Filter results</h3>
                    <FilterCard buttonLabel={buttonLabel} setButtonLabel={setButtonLabel}/>
                </div>

                <div className="home-content">
                    <hr/>
                    {products.map((product, index) => {
                        switch (buttonLabel) {
                            case "Below $10":
                                return (
                                    <div className="mb-4" key={index}>
                                        {
                                            product.price < 10
                                                ? <Card2 product={product.price < 10 ? product : undefined}/>
                                                : undefined
                                        }
                                    </div>
                                )
                            case "$10 - $30":
                                return (
                                    <div className="mb-4" key={index}>
                                        {
                                            (product.price >= 10 && product.price < 30)
                                                ? <Card2 product={
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
                                    <div className="mb-4" key={index}>
                                        {
                                            product.price > 30
                                                ? <Card2 product={product.price > 30 ? product : undefined}/>
                                                : undefined
                                        }
                                    </div>
                                )
                            default:
                                return (
                                    <div className="mb-4" key={index}>
                                        <Card2 product={product}/>
                                    </div>
                                )
                        }
                    })}
                </div>
            </div>
        </Base>
    );
}

export default Home2;