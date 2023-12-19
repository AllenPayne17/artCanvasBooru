import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Images.css'



function Image(){
    const [images, setImages] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
      const fetchCharacters = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/all_posts');
    
          if (response.ok) {
            const data = await response.json();
            setImages(data);
          } else {
            throw new Error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      fetchCharacters();
    }, []);

    console.log(images)

    return(
        <>
        <div  className="grid-wrapper">

            {
            images ? images.map((image, index) => (
                    <div onClick={() => { navigate(`/art/${image.username}/${image._id}`) }} key={index}>
                        <img src={image.imageUrl} alt={'artpost' + index} key={index} />
                    </div>
            ))
            :
            <h1>
                no image to display
            </h1>
            }
        </div>
        </>
    )
}

export default Image;