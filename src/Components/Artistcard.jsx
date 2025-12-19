import "./Artistcard.css";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Artistcard({ artist }) {
  const navigate = useNavigate();

  const openArtist = () => {
    navigate(`/artist/${artist.id}`);
  };

  const playPreview = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="artistcard" onClick={openArtist}>
      <div className="imagewrapper">
        <img
          src={artist.images?.[0]?.url}
          className="artistimage"
          alt={artist.name}
        />

        <button className="playbutton" onClick={playPreview}>
          <FaPlay className="playicon" />
        </button>
      </div>

      <div className="artisttext">
        <h3 className="artistname">{artist.name}</h3>
        <p className="artisttype">Artist</p>
      </div>
    </div>
  );
}

export default Artistcard;

