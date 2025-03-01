import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import  { useAuth } from '../../Layouts/Header/AuthService';

const Login = () => {
    const [account, setAccount] = useState({ email: '', password: '' });
    const { login, setAvatar } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Response Data:', responseData);

            
            login();

            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('avatar', responseData.avatar);
            localStorage.setItem('email', account.email);
            
            

            // Set avatar in the context
            setAvatar(responseData.avatar);
            console.log("Email login:", localStorage.getItem('email'));
            

            console.log('Login success!');
            navigate(responseData.redirect);
        } else {
            console.error('Login failed!');
            alert("Login failed");
        }
    };

    return (
        <div className="container">
            <div className="text-insertLogin">
                <h1>Đăng nhập tài khoản</h1>
            </div>
            <div className="white-section">
                <div className="inforLogin">
                    <form className="form-signin" onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="col-form-label">Email</label>
                            <input
                                type="email"
                                className="form-controlLogin"
                                id="inputEmail"
                                name="email"
                                placeholder=""
                                required
                                value={account.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="col-form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-controlLogin"
                                id="inputPassword"
                                name="password"
                                placeholder=""
                                required
                                value={account.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary btn-block" id="btnLogin">Đăng nhập</button>
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                            <a href="#">Quên mật khẩu ?</a>
                            <a href="/sign-up">Đăng ký</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
