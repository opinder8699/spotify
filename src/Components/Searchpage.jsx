import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Searchpage.css";
import Searchsong from "./Searchsong";
import Searchartists from "./Searchartists";
import Searchalbums from "./Searchalbums";

function Searchpage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { value } = location.state || { value: "" };

  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (!value) return;

    async function fetchData() {
      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
           credentials: "include",
          body: JSON.stringify({ value }),
        });
        const data = await response.json();
        setTracks(data.tracks?.items || []);
        setArtists(data.artists?.items || []);
        setAlbums(data.albums?.items || []);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    }

    fetchData();
  }, [value]);


  return (
    <div className="searchall">
      <div className="filterbuttons">
        <button className="active">All</button>
        <button  onClick={() => navigate("/search/songs", { state: { value } })}>Songs</button>
        <button onClick={() => navigate("/search/artists", { state: { value } })}>
          Artists
        </button>
        <button onClick={() => navigate("/search/albums", { state: { value } })}>
          Albums
        </button>
      </div>

      <h2 className="topresult-heading">Top results</h2>

      <div className="content">
        <Searchsong tracks={tracks} />
        <Searchartists artists={artists} />
        <Searchalbums albums={albums} />
      </div>
    </div>
  );
}

export default Searchpage;



