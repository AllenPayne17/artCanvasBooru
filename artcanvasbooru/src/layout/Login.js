import React, { useState } from "react";
import '../styles/login.css'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../AppContex";

function Login(){

    const {setAuth, setUserData} = useAppContext();

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setAuth(true)
                setUserData(data.user)
                
                navigate('/dashboard');
            } else {
                setError(data.message); // Set the error message received from the server
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return(
        <>
        <div className="global-container">
            <div className="card login-form">
                <div className="card-body">
                <h3 className="card-title text-center">Log in</h3>
                <div className="card-text">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                        type="email"
                        className="form-control form-control-sm"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <a href="/" style={{ float: "right", fontSize: 12 }}>
                        Forgot password?
                        </a>
                        <input
                        type="password"
                        className="form-control form-control-sm"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Sign in
                    </button>
                    <div className="sign-up">
                        Don't have an account? <span style={{color:'blue', cursor: 'pointer'}} onClick={() => navigate('/sign-up')}> Sign up</span>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;