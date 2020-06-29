import React, {useState} from 'react';
import ImageHelper from "./helper/ImageHelper";
import {Redirect} from "react-router-dom"
import {addItemToCart, removeItemFromCart} from "./helper/cartHelper";

const Card = ({
                  product,
                  addToCart = true,
                  removeFromCart = false,
                  reload,
                  setReload
              }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product ? product.count : 0);

    const cardTitle = product ? product.name : undefined
    const cardDescription = product ? product.description : undefined
    const cardPrice = product ? product.price : undefined

    const addProductToCart = () => {
        addItemToCart(product, () => {
            setRedirect(true)
        })
    }

    const getRedirected = (redirect) => {
        if (redirect) {
            return <Redirect to={"/cart"}/>
        }
    }

    const showAddToCart = (addToCart) => {
        return (
            addToCart && (
                <button
                    onClick={addProductToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id)
                        setReload(!reload)
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        )
    }

    return (
        <div className="card-container-parent">
            <div className="card-container">

                <div className="card-container__image-column">
                    <ImageHelper product={product ? product : undefined}/>
                    <div className="card-container__product-name">
                        {cardTitle}
                    </div>
                </div>

                <p className="card-container__product-description">
                    {cardDescription}
                </p>

                <p className="card-container__product-price">
                    $ {cardPrice}
                </p>

                <div className="card-container__add-or-remove-item">
                    <div className="col-12">
                        {showAddToCart(addToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>

            </div>
            <hr/>
        </div>
    );
};

export default Card;