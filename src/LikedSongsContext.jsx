import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const LikedSongsContext = createContext();

export const LikedSongsProvider = ({ children }) => {
  const [likedsongs, setLikedsongs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/liked-songs", { withCredentials: true })
      .then(res => setLikedsongs(res.data.likedsongs));
  }, []);

  return (
    <LikedSongsContext.Provider value={{ likedsongs, setLikedsongs }}>
      {children}
    </LikedSongsContext.Provider>
  );
};

export const useLikedSongs = () => useContext(LikedSongsContext);
