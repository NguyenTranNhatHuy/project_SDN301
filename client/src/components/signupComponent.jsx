import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom';

export default function SignupComponent() {
    const imageURL = 'url(../assets/img/cute.png)';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const history = useHistory();

    const handleSignup = async (event) => {
        event.preventDefault();

        if (!username || !password || !rePassword) {
            toast.error('Please enter username, password, and re-password');
            return;
        }
        if (password.length < 8 || password.length > 16) {
            toast.error('Password must be between 8 and 16 characters');
            return;
        }
        if (password !== rePassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/users/signup', {
                username: username,
                password: password
            });

            if (response.data.success) {
                // Đăng ký thành công, chuyển hướng đến trang đăng nhập
                history.push('/login');
                toast.success('Signup successfully');
            } else {
                toast.error('Signup failed: ' + response.data.error);
            }
        } catch (error) {
            toast.error('Signup failed: ' + error.message);
        }
    };

    return (
        <div className="container-fluid ps-md-0">
            <div className="row g-0">
                <div style={{ backgroundImage: imageURL }} className="d-none d-md-flex col-md-4 col-lg-6 bg-image" />
                <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading mb-4">Sign Up!</h3>
                                    {/* Sign Up Form */}
                                    <form onSubmit={handleSignup}>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="username"
                                                className="form-control"
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
                                                placeholder="Password"
                                                id="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Re-Password"
                                                id="re-password"
                                                name="re-password"
                                                value={rePassword}
                                                onChange={(e) => setRePassword(e.target.value)}
                                            />
                                            <label htmlFor="floatingPassword">Re-Password</label>
                                        </div>

                                        <div className="d-grid">
                                            <button
                                                className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                                                type="submit"
                                            >
                                                Sign Up
                                            </button>
                                            <div>
                                                <Link to="/login" className="small">Already have an account? Sign in</Link>
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
    );
}
