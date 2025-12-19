
import './Popularartists.css'
import { useRef, useState, useEffect } from 'react'
import Artistcard from './Artistcard.jsx'

function Popularartists(){
   const [artists,setArtists]=useState([]);
  useEffect(()=>{
    const fetchartists=async()=>{
      try{
      const url="/api/artists";
      const response=await fetch(url,{
         credentials: "include"
      });
      const data=await response.json();
      setArtists(data.artists.items);
      }
      catch(err){
      console.log(err);
      }
    }
    fetchartists();
  },[])
   const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;

        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    useEffect(() => {
        checkScroll(); 
        const el = scrollRef.current;
        el.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        return () => {
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

   return (
    <>
      <div className="popularartists-section">
        <div className="popularartists-header">
          <h2>Popular Artists</h2>
          <a href="/artists" className="show-all">Show all</a>
        </div>

        <div className="scroll-container">
          {showLeft && (
            <button className="scroll-btn left" onClick={scrollLeft}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18L9 12L15 6" />
              </svg>
            </button>
          )}
          
          <div className="popularartists" ref={scrollRef}>
            {artists.map((artist,index)=>(
              <div className="artistcards" key={index}>
                <Artistcard artist={artist} />
              </div>
            ))}
          </div>

          {showRight && (
            <button className="scroll-btn right" onClick={scrollRight}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6L15 12L9 18" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Popularartists 

