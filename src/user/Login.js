import React, {useState} from 'react';
import Base from "../core/Base";
import {Link, Redirect} from "react-router-dom";

import {login, authenticate, isAuthenticated} from "../auth/helper";

function Login(props) {
    const [values, setValues] = useState({
        email: "admin@nikhil.com",
        password: "123456",
        error: "",
        loading: false,
        didRedirect: false
    });

    const {email, password, error, loading, didRedirect} = values

    const {user} = isAuthenticated()

    const handleChange = fieldName => event => {
        setValues({...values, error: "", [fieldName]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: "", loading: true})
        login({email, password})
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, loading: false})
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            email: "",
                            password: "",
                            didRedirect: true
                        })
                    })
                }
            })
            .catch(err => {
                console.log("Failed to login", err)
            })
    }

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to={"/admin/dashboard"}/>
            } else {
                return <Redirect to={"/user/dashboard"}/>
            }
        }
    }

    const loginForm = () => {
        return (
            <div className={"row"}>
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">
                                Email
                            </label>
                            <input
                                className={"form-control"}
                                type="email"
                                onChange={handleChange("email")}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Password
                            </label>
                            <input
                                className={"form-control"}
                                type="password"
                                onChange={handleChange("password")}
                                value={password}
                            />
                        </div>
                        <button
                            className="btn btn-success btn-block"
                            onClick={onSubmit}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className={"alert alert-info"}>
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    const errorMessage = () => {
        return (
            <div className={"row"}>
                <div className={"col-md-6 offset-sm-3 text-left"}>
                    <div
                        className="alert alert-danger"
                        style={{display: error ? "" : "none"}}
                    >
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Base title={"Login Page"} description={"A page for user to login!"}>
            {loadingMessage()}
            {errorMessage()}
            {loginForm()}
            {performRedirect()}
            <p className={"text-white text-center"}>{JSON.stringify(values)}</p>
        </Base>
    );
}

export default Login;