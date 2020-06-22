import React, {useEffect, useState} from 'react';
import {API} from "../backend";
import Base from "./Base";
import Card from "./Card";
import {getAllProducts} from "./helper/coreapicalls";
import {loadCart} from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import PaymentB from "./PaymentB";

function Cart(props) {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart())
    }, [reload]);


    const loadAllProducts = () => {
        return (
            <div>
                <h2>This section is to load products</h2>
                {products.map((product, index) => {
                    return (
                        <Card
                            key={index}
                            product={product}
                            addToCart={false}
                            removeFromCart={true}
                            reload={reload}
                            setReload={setReload}
                        />
                    )
                })}
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                <h2>This section is for checkout</h2>
            </div>
        )
    }

    return (
        <Base title={"Cart Page"} description={"Ready to checkout"}>
            <div className="row text-center">
                <div className="col-6">
                    {
                        (products && products.length > 0) ?
                            loadAllProducts() :
                            (<h3>No Products in your cart</h3>)
                    }
                </div>
                <div className="col-6">
                    <h2>
                        <PaymentB
                            products={products}
                            reload={reload}
                            setReload={setReload}
                        />
                    </h2>
                </div>
            </div>
        </Base>
    );
}

export default Cart;