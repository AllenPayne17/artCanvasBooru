import React from "react";

// layout
import Submenu from "../element/Submenu";
import Fileupload from "../element/FileUpload";


function Upload() {

    return(
        <>
        <Submenu />
        <div className="container p-4">
            <div className="upload">
                <Fileupload />
            </div>

        </div>
        </>
    )
}

export default Upload;