import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../AppContex';
import '../styles/upload.css';

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

function FileUpload() {
  const [text, setText] = useState(true);
  const uploadInputRef = useRef(null);

  const {
    setSelectedFile, 
    handleUpload, 
    tags, 
    setTags,
    title, 
    setTitle,
    description,
    setDescription,
  } = useAppContext();

  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  useEffect(() => {
    const readURL = (input) => {
      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const imageResult = document.getElementById('imageResult');
          if (imageResult) {
            imageResult.src = e.target.result;
          }
        };

        reader.readAsDataURL(input.files[0]);
        setSelectedFile(input.files[0]); // Store the selected file
        setText(false);
      }
    };

    const uploadInput = uploadInputRef.current;
    if (uploadInput) {
      uploadInput.addEventListener('change', function () {
        readURL(this);
      });
    }

    return () => {
      if (uploadInput) {
        uploadInput.removeEventListener('change', function () {
          readURL(this);
        });
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (tags) => {
    const capitalizedTags = tags.map((tag) => {
      return tag.charAt(0).toUpperCase() + tag.slice(1); // Capitalize the first letter
    });
    setTags(capitalizedTags);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  
  return (
    <>
      <header className="text-center">
        <h1 className="">Upload an Art at ArtCanvasBooru</h1>
        <p className="lead mb-0">
          Please read the guidelines before uploading something.
          <br /> Violating the rules will result in a ban.
        </p>
      </header>
      <div className="row py-4">
        <div className="col-lg-6 mx-auto">
          <div className="input-group mb-3 px-2 py-2 rounded-pill input-file border">
            <input id="upload" ref={uploadInputRef} type="file" className="form-control border-0" />
            <label htmlFor="upload" id="upload-label" className="font-weight-light text-muted">
              Choose file
            </label>
            <div className="input-group-append">
              <label htmlFor="upload" className="btn btn-light m-0 rounded-pill px-4">
                <i className="fa fa-cloud-upload mr-2 text-muted"></i>
                <small className="text-uppercase font-weight-bold text-muted">Choose file</small>
              </label>
            </div>
          </div>
          <p className="font-italic text-center lead">The image uploaded will be rendered inside the box below.</p>
          <div className="image-area mt-4">{
              text ? <p id="imageResultText">Uploaded image result</p> :
              <img id="imageResult" src="#" alt="" className="img-fluid rounded shadow-sm mx-auto d-block" />
          }
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Title</label>
              <input 
                type="text"
                className="form-control in-sty"
                id="exampleFormControlInput1"
                value={title}
                onChange={handleTitleChange}
                ref={titleInputRef}
               />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Art Description</label>
              <textarea
                className="form-control in-sty"
                id="exampleFormControlTextarea1"
                rows="3"
                value={description}
                onChange={handleDescriptionChange}
                ref={descriptionInputRef}
              ></textarea>
            </div>
            <div className="form-group">
            <label htmlFor="tags">Tags</label>
              <TagsInput className='form-control' id="tags" value={tags} onChange={handleChange} />
            </div>
          <button onClick={handleUpload} type="button" className="btn btn-post">Post</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FileUpload;