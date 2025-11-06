import Artistcard from './Artistcard'
import Popularalbums from './Popularalbums'
import Popularartists from './Popularartists'
import PopularRadio from './Popularradio'
import Trendingsongs from './Trendingsongs'
import Searchpage from './Searchpage'
function Maincontent({ likedsongs, setLikedsongs }){
  return(
    <>
    <div className="content">
  <Trendingsongs likedsongs={likedsongs} setLikedsongs={setLikedsongs}/>
  <Popularartists/>
  <Popularalbums/>
    </div>
    </>
  )
}
export default Maincontent
