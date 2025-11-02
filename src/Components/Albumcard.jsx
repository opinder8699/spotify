import './AlbumCard.css';
import { FaPlay } from 'react-icons/fa';

function AlbumCard({ album }) {
  return (
    <div className="albumcard">
      <div className="imagewrapper">
        <img
          src={album.images[0].url}
          className="albumimage"
          alt={album.collectionName}
        />
        <button className="playbutton">
          <FaPlay className="playicon" />
        </button>
      </div>
      <h3 className="a">{album.name}</h3>
       <p className="artistnames">
        {album.artists.map((artist) => artist.name).join(", ")}
      </p>
    </div>
  );
}

export default AlbumCard;



