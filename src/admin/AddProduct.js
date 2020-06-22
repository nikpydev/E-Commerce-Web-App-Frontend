import React, {useEffect, useState} from 'react';
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {createProduct, getAllCategories} from "./helper/adminapicall";
import {isAuthenticated} from "../auth/helper";


function AddProduct(props) {
    const {user: {_id}, token} = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: undefined,
        createdProduct: undefined,
        didRedirect: false,
        formData: undefined
    });

    const {
        name,
        description,
        price,
        stock,
        photo,
        categories,
        category,
        loading,
        error,
        createdProduct,
        didRedirect,
        formData
    } = values

    const preload = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, categories: data.foundCategories, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
        preload()
    }, []);

    const handleChange = (key) => event => {
        const value = key === "photo" ? event.target.files[0] : event.target.value
        formData.set(key, value)
        setValues({...values, [key]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: "", loading: true})
        createProduct(_id, token, formData)
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({
                        ...values,
                        createdProduct: undefined,
                        error: data.error
                    })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        price: "",
                        photo: "",
                        stock: "",
                        loading: false,
                        error: undefined,
                        createdProduct: data.product.name,
                        didRedirect: false
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const successMessage = () => {
        return (
            <div
                className="alert alert-success mt-3"
                style={{display: createdProduct ? "" : "none"}}
            >
                <h4>{createdProduct} created successfully</h4>
            </div>
        )
    }

    const warningMessage = () => {
        return (
            <div
                className="alert alert-warning mt-3"
                style={{display: error ? "" : "none"}}
            >
                <h4>Couldn't create product: {error}</h4>
            </div>
        )
    }

    const createProductForm = () => (
        <form>
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
        <textarea
            onChange={handleChange("description")}
            name="photo"
            className="form-control"
            placeholder="Description"
            value={description}
        />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories && categories.map((category, index) => {
                        return (
                            <option key={index} value={category._id}>
                                {category.name}
                            </option>
                        )
                    })}

                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={stock}
                />
            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-outline-success mb-3"
            >
                Create Product
            </button>
        </form>
    );

    return (
        <Base
            title={"Add a product here!"}
            description={"This is the product creation section"}
            className={"container bg-info p-4"}
        >
            <Link
                to={"/admin/dashboard"}
                className={"btn btn-md btn-dark mb-3"}
            >
                Admin Home
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    );
}

export default AddProduct;