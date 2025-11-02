import './Artistcard.css';
import { FaPlay } from 'react-icons/fa';

function Artistcard({ artist }) {
  return (
    <div className="artistcard">
      <div className="imagewrapper">
        <img src={artist.images[0]?.url} className="artistimage" alt={artist.name} />
        <button className="playbutton">
          <FaPlay className="playicon" />
        </button>
      </div>
      <h3 className="artisttname">{artist.name}</h3>
    </div>
  );
}

export default Artistcard;



