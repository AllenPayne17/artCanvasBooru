import React from "react";
// import { useParams } from 'react-router-dom';
// import { useAppContext } from "../AppContex";

import logo from "../images/Logo.png"
import Menus from "../layout/Menus";
import Submenu from "../element/Submenu";

function Art(){

    // const { username, id } = useParams();
    // const {getAllPost} = useAppContext();


    return(
        <>
        <div className='logo-header'>
            <img src={logo} alt='artcanvasbooru' />
        </div>
        <Menus />
        <Submenu />
        <div className="container p-4">
            <div className="row">
                <div className="col-md-6">
                    <img src="https://api.slingacademy.com/public/sample-photos/6.jpeg" alt=""/>
                </div>
                <div className="col-md-6">
                    <div className="text-center">
                        <h1>Ivan the Terrible and His Son Ivan </h1>
                        <p style={{fontStyle: 'italic'}}>by: Ilya Repin</p>
                    </div>
                    <div>
                        <h4>Art Description:</h4>
                        <p>"Ivan the Terrible and His Son Ivan on 16 November 1581 is a painting by Russian realist artist Ilya Repin made between 1883 and 1885. It depicts the grief-stricken Russian tsar Ivan the Terrible cradling his dying son, the Tsarevich Ivan Ivanovich, shortly after the elder Ivan had dealt a fatal blow to his son's head in a fit of anger. The painting portrays the anguish and remorse on the face of the elder Ivan and the gentleness of the dying Tsarevich, forgiving his father with his tears."</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Art;