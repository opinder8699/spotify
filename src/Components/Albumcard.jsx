import "./AlbumCard.css";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AlbumCard({ album }) {
  const navigate = useNavigate();

  const openAlbum = () => {
    navigate(`/album/${album.id}`);
  };

  const playPreview = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="albumcard" onClick={openAlbum}>
      <div className="imagewrapper">
        <img
          src={album.images[0]?.url}
          className="albumimage"
          alt={album.name}
        />

        <button className="playbutton" onClick={playPreview}>
          <FaPlay className="playicon" />
        </button>
      </div>

      <div className="albumtext">
        <h3 className="albumname">{album.name}</h3>
        <p className="artistnames">
          {album.artists.map((a) => a.name).join(", ")}
        </p>
      </div>
    </div>
  );
}

export default AlbumCard;


