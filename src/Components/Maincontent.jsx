import Artistcard from './Artistcard'
import Popularalbums from './Popularalbums'
import Popularartists from './Popularartists'
import PopularRadio from './Popularradio'
import Trendingsongs from './Trendingsongs'
function Maincontent(){
  return(
    <>
    <div className="content">
  <Trendingsongs/>
  <Popularartists/>
  <Popularalbums/>
  {/* <PopularRadio/> */}
    </div>
    </>
  )
}
export default Maincontent
