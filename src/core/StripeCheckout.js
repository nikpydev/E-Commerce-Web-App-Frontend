import React, {useState, useEffect} from 'react';
import {isAuthenticated} from "../auth/helper";
import {emptyOutCart, loadCart} from "./helper/cartHelper";
import {Link} from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import {API} from "../backend";
import {createOrder} from "./helper/orderHelper";

function StripeCheckoutComponent({products, reload, setReload}) {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: undefined,
        address: ""
    });

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getFinalAmount = () => {
        let amount = 0
        products.map(product => {
            amount += product.price
        })
        return amount
    }

    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
            .then(response => {
                console.log("RESPONSE: ", response)
                const {status} = response
                console.log("STATUS: ", status)
            })
            .catch(err => {
                console.log("ERROR: ", err)
            })
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckout
                token={makePayment}
                stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
                amount={getFinalAmount() * 100}
                name={"Buy T-Shirts"}
                shippingAddress
                billingAddress
            >
                <button className="btn btn-success">Pay with Stripe</button>
            </StripeCheckout>
        ) : (
            <Link to={"/login"}>
                <button className="btn btn-warning">Login</button>
            </Link>
        )
    }

    // TODO: Implement error message.
    const errorMessage = () => {
        //
    }

    // TODO: Implement success message.
    const successMessage = () => {
        //
    }

    return (
        <div>
            <h3 className={"text-white"}>Stripe Checkout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    );
}

export default StripeCheckoutComponent;