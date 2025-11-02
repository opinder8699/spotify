import './SongCard.css';
import { FaPlay } from 'react-icons/fa';

function SongCard({ song }) {
  return (
    <div className="songcard">
      <div className="imagewrapper">
      
        <img
          src={song.album.images[0]?.url}
          className="songimage"
          alt={song.trackName}
        />
        
        
        <button className="playbutton">
          <FaPlay className="playicon" />
        </button>
      </div>

      <h3 className="songname">{song.name}</h3>
     <div className="singername">{song.artists[0].name}</div>
    </div>
  );
}

export default SongCard;

