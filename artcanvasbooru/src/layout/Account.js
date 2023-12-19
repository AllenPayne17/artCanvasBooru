import React, { useEffect, useState } from "react";
import { useAppContext } from "../AppContex";
import male from '../images/male.png';
import female from '../images/female.png';
import '../styles/Account.css'


function Account() {

    const {isMale, userData} = useAppContext()

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("")

    useEffect(() => {

        if(userData){
            setFullName(userData.firstName + " " + userData.lastName);
            setEmail(userData.email)
            setAbout(userData.about ? userData.about : "")
        }

      }, [userData]);

    return(
        <>
        
        <div className="container mt-2">
            <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 mt-3">
                    <div className="card h-100">
                    <div className="card-body">
                        <div className="account-settings">
                        <div className="user-profile">
                            <div className="user-avatar">
                            <img
                                src={isMale ? male : female}
                                alt="Maxwell Admin"
                            />
                            </div>
                            <h5 className="user-name">{fullName}</h5>
                            <h6 className="user-email">{email}</h6>
                        </div>
                        <div className="about">
                            <h5>About</h5>
                            <p>
                                {
                                    about
                                }
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 mt-3">
                    <div className="card h-100">
                    <div className="card-body">
                        <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 className="mb-2 text-primary">Personal Details</h6>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="FirstName">First name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="FirstName"
                                placeholder="First name"
                            />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="LastName">Last name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="LastName"
                                placeholder="Last name"
                            />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="eMail">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="eMail"
                                placeholder="email"
                            />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="username"
                            />
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                            <label htmlFor="phone">About</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>
                        </div>
                        <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right">
                            <button
                                type="button"
                                id="submit"
                                name="submit"
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                id="submit"
                                name="submit"
                                className="btn btn-primary"
                            >
                                Update
                            </button>
                            </div>
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

export default Account;