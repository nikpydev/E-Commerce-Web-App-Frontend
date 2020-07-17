import React, {Fragment} from 'react';
import {Link, withRouter} from "react-router-dom"
import {isAuthenticated, logout} from "../auth/helper";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "#2ECC72"}
    } else {
        return {color: "#FFFFFF"}
    }
}

function Menu({history}) {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link
                        style={currentTab(history, "/")}
                        className="nav-link"
                        to={"/Shoppersonic-Frontend"}
                    >
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        style={currentTab(history, "/cart")}
                        className="nav-link"
                        to={"/cart"}
                    >
                        Cart
                    </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            style={currentTab(history, "/user/dashboard")}
                            className="nav-link" to={"/user/dashboard"}
                        >
                            Dashboard
                        </Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link
                            style={currentTab(history, "/admin/dashboard")}
                            className="nav-link"
                            to={"/admin/dashboard"}
                        >
                            Admin Dashboard
                        </Link>
                    </li>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link
                                style={currentTab(history, "/register")}
                                className="nav-link"
                                to={"/register"}
                            >
                                Register
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                style={currentTab(history, "/login")}
                                className="nav-link"
                                to={"/login"}
                            >
                                Login
                            </Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                            className={"nav-link text-warning"}
                            onClick={() => {
                                logout(() => {
                                    history.push("/")
                                })
                            }}
                        >
                            Logout
                        </span>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default withRouter(Menu);