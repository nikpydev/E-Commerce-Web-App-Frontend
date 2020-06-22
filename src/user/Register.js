import React, {useState} from 'react';
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {register} from "../auth/helper";

function Register(props) {
    const [values, setValues] = useState({
        fName: "",
        lName: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const {fName, lName, email, password, error, success} = values

    const handleChange = fieldName => event => {
        setValues({...values, error: "", [fieldName]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: ""})
        register({fName, lName, email, password})
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, success: false})
                } else {
                    setValues(
                        {
                            ...values,
                            fName: "",
                            lName: "",
                            email: "",
                            password: "",
                            error: "",
                            success: true
                        }
                    )
                }
            })
            .catch(err => {
                console.log("Error in registration", err)
            })
    }

    const registrationForm = () => {
        return (
            <div className={"row"}>
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">
                                First Name
                            </label>
                            <input
                                className={"form-control"}
                                type="text" onChange={handleChange("fName")}
                                value={fName}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Last Name
                            </label>
                            <input
                                className={"form-control"}
                                type="text" onChange={handleChange("lName")}
                                value={lName}
                            />
                        </div>
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
                        <button onClick={onSubmit} className="btn btn-success btn-block">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div className={"row"}>
                <div className={"col-md-6 offset-sm-3 text-left"}>
                    <div
                        className="alert alert-success"
                        style={{display: success ? "" : "none"}}
                    >
                        Registration Successful. Please <Link to={"/login"}>Login Here</Link>
                    </div>
                </div>
            </div>

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
        <Base title={"Registration Page"} description={"A page for user to register!"}>
            {successMessage()}
            {errorMessage()}
            {registrationForm()}
            <p className="text-white text-center">
                {JSON.stringify(values)}
            </p>
        </Base>
    );
}

export default Register;