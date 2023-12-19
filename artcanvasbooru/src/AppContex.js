import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [selectedKey, setSelectedKey] = useState("link-1");
  const [auth, setAuth] = useState(true);
  const [isMale, setIsMale] = useState(true);
  const [userData, setUserData] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);


  // image upload
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);

  const contextValue = {
    title, 
    setTitle,
    description,
    setDescription,
    tags, 
    setTags,
    selectedFile,
    setSelectedFile,
    handleUpload,
    selectedKey,
    setSelectedKey,
    auth,
    setAuth,
    isMale,
    setIsMale,
    artists,
    setArtists,
    setUserData,
    userData,
    users
  };

  async function handleUpload() {
    try {
      if (!selectedFile) {
        console.error('Please select a file.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        const post = {
          // '_id': userData._id,
          '_id': '656cd9228167912fd8d9d940',
          'imageUrl': data.secure_url,
          'title': title,
          'description': description,
          'tags': tags,
          'artist': userData.firstName + " " + userData.lastName,
          'username': userData.username,
          'comments': [],
          'DatePost': Date.now()
        }

        uploading(post)

      } else {
        console.error('Error uploading image:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }  

  async function uploading(post) {
    try{
      fetch('http://127.0.0.1:5000/post-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log('Post creation successful:', data);
    })
    .catch(error => {
        console.error('There was a problem creating the post:', error);
    });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  async function users() {
    try {
      const response = await fetch("http://127.0.0.1:5000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      // Set the fetched user data into the state variable 'artists'
      setArtists(data.users);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  useEffect(() => {
    // Fetch user data when the AppProvider mounts
    users();
  }, []); // Empty dependency array ensures this effect runs once after initial render

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};