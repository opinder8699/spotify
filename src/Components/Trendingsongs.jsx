import './Trendingsong.css'
import Songcard from './Songcard.jsx'
import { useRef, useState, useEffect } from 'react';

function Trendingsongs({ likedsongs, setLikedsongs }) {
    const songsRowRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const [songs,setSongs]=useState([]);
    useEffect(()=>{
        const fetchSongs=async()=>{
            try{
            const response=await fetch("/api/songs",{
                 credentials: "include"
            });
            const data=await response.json();
             setSongs(data.tracks.items);
            }catch(err){
                console.log(err);
            }
        }
        
    fetchSongs();
    },[])

    const scrollLeft = () => {
        songsRowRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        songsRowRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const checkScroll = () => {
        const el = songsRowRef.current;
        if (!el) return;

        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    useEffect(() => {
        checkScroll();
        const el = songsRowRef.current;
        el.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        return () => {
            el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    return (
        <div className="trendingsongs-section">
            <div className="trendingsongs-header">
                <h2>Trending Songs</h2>
                <a href="/songs" className="show-all">Show all</a>
            </div>

            <div className="scroll-container">
                {showLeft && (
                    <button className="scroll-btn left" onClick={scrollLeft}>
                        &#8249;
                    </button>
                )}

                <div className="songs-row" ref={songsRowRef}>
                    {songs.map((song, index) => (
                        <div className="songcard-wrapper" key={index}>
                            <Songcard song={song }
                              likedsongs={likedsongs}
                              setLikedsongs={setLikedsongs}
                            />
                        </div>
                    ))}
                </div>

                {showRight && (
                    <button className="scroll-btn right" onClick={scrollRight}>
                        &#8250;
                    </button>
                )}
            </div>
        </div>
    );
}

export default Trendingsongs;

