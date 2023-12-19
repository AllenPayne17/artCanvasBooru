import React from "react";
import '../styles/Posts.css'
import Submenu from "../element/Submenu";

import Image from "../element/Images";
function Posts() {
    
    return(
        <>
        <Submenu />
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-auto mt-2 mb-2 back">
                    <nav className="navbar navbar-light">
                        <div className="search-bar">
                            <input className="form-control m-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-primary m-2" type="submit">Search</button>
                        </div>
                    </nav>
                    <div className=" m-2 mr-2 tagsList">
                        <h5>Tags</h5>
                    </div>
                </div>
                <div className="col mt-2 mb-2 back">
                        <Image />
                </div>
            </div>
        </div>
        </>
    )
}

export default Posts;