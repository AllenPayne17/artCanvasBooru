import React, { useState } from "react";
import '../styles/login.css'
import { useNavigate } from 'react-router-dom';

function Signup() {


    const navigate = useNavigate();
    const [error, setError] = useState(false)
    const [errorMessage, setMessage] = useState("")
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(formData.password !== formData.confirmPassword){
            setError(true)
            setMessage("Password does not Match!")
        }else{
            signup(formData);
        }
    };

    async function signup(postData) {
        try {
          const response = await fetch("http://127.0.0.1:5000/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          });
    
          if (!response.ok) {
            setError(true)
            setMessage("Email Already Exist!")
          }
    
          const data = await response.json();
          // Perform actions with the response data if needed
          console.log("Response data:", data);
          return data; // Return the data if necessary
        } catch (error) {
          console.error("Error:", error);
        }
      }


    return (
        <>
            <div className="global-container">
                <div className="card login-form">
                    <div className="card-body">
                        <h3 className="card-title text-center">Sign Up</h3>
                        <div className="card-text">
                        {
                           error ? <div class="alert alert-danger alert-dismissible fade show" role="alert">{errorMessage}</div> : null
                        }
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control form-control-sm"
                                        id="firstName"
                                        aria-describedby="firstNameHelp"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control form-control-sm"
                                        id="lastName"
                                        aria-describedby="lastNameHelp"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input

                                        required
                                        type="text"
                                        className="form-control form-control-sm"
                                        id="username"
                                        aria-describedby="usernameHelp"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        required
                                        type="email"
                                        className="form-control form-control-sm"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input

                                        required
                                        type="password"
                                        className="form-control form-control-sm"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input

                                        required
                                        type="password"
                                        className="form-control form-control-sm"
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Sign up
                                </button>
                                <div className="sign-up">
                                    have an account already? <span style={{color:'blue', cursor: 'pointer'}} onClick={() => navigate('/login')}> Sign in</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;