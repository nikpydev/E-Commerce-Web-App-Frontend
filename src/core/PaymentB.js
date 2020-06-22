import React, {useState, useEffect} from 'react';
import {loadCart, emptyOutCart} from "./helper/cartHelper";
import {Link} from "react-router-dom";

import {fetchPaymentToken, processPayment} from "./helper/paymentbhelper";
import {createOrder} from "./helper/orderHelper";
import {isAuthenticated} from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

function PaymentB({products, setReload, reload}) {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: undefined,
        instance: {}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        fetchPaymentToken(userId, token)
            .then(info => {
                // console.log("INFORMATION", info)
                if (info) {
                    if (info.error) {
                        setInfo({...info, error: info.error})
                    } else {
                        const clientToken = info.clientToken
                        setInfo({...info, clientToken})
                    }
                }
            })
    }

    const showBTDropIn = () => {
        return (
            <div>
                {info.clientToken != null && products && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                        />
                        <button
                            className={"btn btn-success btn-block"}
                            onClick={() => {onPurchase()}}
                        >
                            Make Payment
                        </button>
                    </div>
                ) : (
                    <h3>
                        {(products && products.length < 1) ? "Please Add something to the cart" : ""}
                        {userId ? "" : "Please login first before you make a purchase"}
                    </h3>
                )}
            </div>
        )
    }

    useEffect(() => {
        getToken(userId, token)
    }, []);

    const onPurchase = () => {
        setInfo({...info, loading: true})
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                }
                processPayment(userId, token, paymentData)
                    .then(response => {
                        setInfo({...info, success: response.success, loading: false})
                        console.log("PAYMENT SUCCESS")
                        const orderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount
                        }
                        createOrder(userId, token, orderData)
                            .then(response => {
                                console.log("CREATE ORDER: ", response)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        emptyOutCart(() => {
                            console.log("Did we get a crash?")
                        })
                        setReload(!reload)
                    })
                    .catch(err => {
                        setInfo({...info, loading: false, success: false, error: err})
                        console.log("PAYMENT FAILURE")
                    })
            })
    }

    const getAmount = () => {
        let amount = 0
        if (products) {
            products.map(product => {
                amount += product.price
            })
            return amount
        }
        return "0"
    }

    return (
        <div>
            <h3>Your bill amount is: ${getAmount()}</h3>
            {showBTDropIn()}
        </div>
    );
}

export default PaymentB;