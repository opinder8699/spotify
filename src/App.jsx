import './App.css';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Footer from './Components/Footer';
import Maincontent from './Components/Maincontent';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Signuppassword from './Components/Signuppassword';
import { BrowserRouter, Routes, Route ,Outlet} from "react-router-dom";
import TermsandConditions from './Components/TermsandConditions';
import Songshowall from './Components/Songshowall';
import Showallalbums from './Components/Showallalbums';
import Showallartists from './Components/Showallartists';
import Searchpage from './Components/Searchpage';
import Songssearch from './Components/Songssearch';
import Albumsearch from './Components/Albumsearch';
import Artistsearch from './Components/Artistsearch';
import PlaylistPage from './Components/PlaylistPage';
import Likedsongs from './Components/Likedsongs';
import { LikedSongsProvider } from "./LikedSongsContext";
import SongDetail from './Components/SongDetail';
import ArtistDetail from './Components/ArtistDetail';
import AlbumDetail from './Components/AlbumDetail';
import ProfilePage from './Components/ProfilePage';


function Layout() {
  return (
  <>
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
function App() {
  const [likedsongs,setLikedsongs]=useState([]);
  return (
    <>
     <BrowserRouter>
      <LikedSongsProvider>
      <Routes>
        <Route element={<Layout/>}>
        <Route path="/home" element={<Maincontent likedsongs={likedsongs} setLikedsongs={setLikedsongs}/>} />
         <Route path="/songs" element={<Songshowall likedsongs={likedsongs} setLikedsongs={setLikedsongs}/>} />
          <Route path="/artists" element={<Showallartists/>} />
          <Route path="/albums" element={<Showallalbums/>} />
          <Route path="/search" element={<Searchpage/>} />
          <Route path="/search/songs" element={<Songssearch/>} />
          <Route path="/search/albums" element={<Albumsearch/>} />
           <Route path="/search/artists" element={<Artistsearch/>} />
            <Route path="/playlists" element={<PlaylistPage/>} />
            <Route path="/playlist/:id" element={<PlaylistPage />} />
             <Route path="/song/:id" element={<SongDetail/>} />
             <Route path="/artist/:id" element={<ArtistDetail/>} />
              <Route path="/album/:id" element={<AlbumDetail />} />
                  <Route path="/profile" element={<ProfilePage />} />
              <Route path="/likedsongs" element={<Likedsongs  likedsongs={likedsongs}/>} />
        </Route>
        <Route path="/" element={<Login />} />
         <Route path="/login" element={<Login />} />
           <Route path="/Signup" element={<Signup />} />
           <Route path="/setpassword" element={<Signuppassword/>} />
            <Route path="/termsandconditions" element={<TermsandConditions/>} />
      </Routes>
      </LikedSongsProvider>
      </BrowserRouter>
    </>
  );
}


export default App;



