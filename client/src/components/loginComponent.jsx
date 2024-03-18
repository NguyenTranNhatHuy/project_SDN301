import React, { useContext, useState } from 'react'
import './module.style.css';
import { AuthContext } from "../context/authContext";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


export default function LoginComponent() {
    const imageURL = 'url(../assets/img/cute.png)';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            toast.error('Please enter username and password');
            return;
        }


        try {
            const response = await axios.post('http://localhost:3000/users/login', {
                username: username,
                password: password
            });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('accountid', response.data.accountid);
                localStorage.setItem('admin', response.data.admin);


                history.push('/home');
                toast.success('Login successfully');

            } else {
                toast.error('Invalid username or password');
            }
        } catch (error) {
            toast.error('Invalid username or password', error);

        }
    };
    return (

        <>
            <div className="container-fluid ps-md-0">
                <div className="row g-0">
                    <div style={{ backgroundImage: imageURL }} className="d-none d-md-flex col-md-4 col-lg-6 bg-image" />
                    <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        <h3 className="login-heading mb-4">Welcome back!</h3>
                                        {/* Sign In Form */}
                                        <form onSubmit={handleLogin}>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="username"
                                                    className="form-control"
                                                    // id="floatingInput"
                                                    name="username"
                                                    id="username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                                <label htmlFor="floatingInput">Username</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    // id="floatingPassword"
                                                    placeholder="Password"
                                                    id="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <label htmlFor="floatingPassword">Password</label>
                                            </div>

                                            <div className="d-grid">
                                                <button
                                                    className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                                                    type="submit"
                                                >
                                                    Login
                                                </button>
                                                <div >
                                                    <a style={{ float: 'right' }} className="small" href="/signup">
                                                        Sign up
                                                    </a>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>



    )
}
