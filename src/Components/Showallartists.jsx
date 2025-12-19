import React, { useState, useEffect } from "react";
import Artistcard from "./Artistcard.jsx";
import "./Showallartists.css";

function Showallartists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const url = "/api/allartists"; 
        const response = await fetch(url,{
           credentials: "include"
        });
        const data = await response.json();
        setArtists(data.artists.items);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="showallartists">
      <h2 className="showallartiststitle">Popular Artists</h2>

      <div className="artistlist">
        {artists.map((artist, index) => (
          <Artistcard key={index} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default Showallartists;
