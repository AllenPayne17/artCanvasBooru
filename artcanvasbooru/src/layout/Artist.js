import React, {useEffect, useState} from "react";
import { useAppContext } from "../AppContex";

function Artist() {

    
    const {artists, users} = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredArtists, setFilteredArtists] = useState([]);
  
    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value); // Update the searchQuery state with the input value
    };
  
    useEffect(() => {
      // Perform the filtering when the searchQuery or artists change
      if (searchQuery.trim() === '') {
        // If search query is empty, display all artists
        setFilteredArtists(artists);
      } else {
        // Filter artists based on the search query
        const filtered = artists.filter(artist =>
          `${artist.firstName} ${artist.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredArtists(filtered);
      }
    }, [searchQuery, artists]);  
        
        useEffect(()=> {
            users();

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        
    return(
        <>
            <div className="container-fluid">
                    <nav className="navbar navbar-light">
                        <div className="d-flex">
                            <input className="form-control m-2" value={searchQuery} onChange={handleSearchInputChange} type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-primary m-2" type="submit">Search</button>
                        </div>
                    </nav>
                    <div  className="m-2">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Full name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Posts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredArtists.length > 0 ? filteredArtists.map((artist, index) => (
                                    <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{artist.firstName + " " + artist.lastName}</td>
                                    <td>{artist.email}</td>
                                    <td>{0}</td>
                                    </tr>
                                    ))
                                    :
                                    <tr className="text-center">
                                        <td colspan="4">No Artist Found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
            </div>
        </>
    )
}

export default Artist;