// import React, { useEffect, useState } from "react";
// import "./PlaylistPage.css";
// import { FaTimes } from "react-icons/fa";
// import { useParams, useNavigate } from "react-router-dom";

// function PlaylistPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isViewMode = Boolean(id);

//   const [playlistName, setPlaylistName] = useState("My Playlist");
//   const [playlistSongs, setPlaylistSongs] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);

//   /* ---------- FETCH EXISTING PLAYLIST ---------- */
//   useEffect(() => {
//     if (!id) return;

//     const fetchPlaylist = async () => {
//       try {
//         const res = await fetch(`/api/playlist/${id}`, {
//           credentials: "include",
//         });
//         const data = await res.json();

//         if (data.success) {
//           setPlaylistName(data.playlist.name);
//           setPlaylistSongs(data.playlist.songs || []);
//           setIsSaved(true);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchPlaylist();
//   }, [id]);

//   /* ---------- SEARCH SONGS ---------- */
//   const handleChange = async (value) => {
//     setSearchValue(value);
//     if (!value.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     const res = await fetch("/api/search", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ value }),
//     });

//     const data = await res.json();
//     setSearchResults(data.tracks?.items || []);
//   };

//   /* ---------- ADD SONG ---------- */
//   const handleAddSong = async (song) => {
//     if (playlistSongs.find((s) => s.songId === song.id)) return;

//     const updatedSongs = [
//       ...playlistSongs,
//       {
//         songId: song.id,
//         name: song.name,
//         artist: song.artists.map((a) => a.name).join(", "),
//         image: song.album.images[0]?.url,
//       },
//     ];

//     setPlaylistSongs(updatedSongs);

//     if (isViewMode) {
//       await fetch(`/api/playlist/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ songs: updatedSongs }),
//       });
//     }
//   };
// const updatePlaylistName = async () => {
//   if (!id) return;

//   await fetch(`/api/playlist/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//     body: JSON.stringify({
//       name: playlistName
//     })
//   });
// };

//   /* ---------- REMOVE SONG ---------- */
//   const handleRemoveSong = async (songId) => {
//     const updatedSongs = playlistSongs.filter(
//       (s) => s.songId !== songId
//     );

//     setPlaylistSongs(updatedSongs);

//     if (isViewMode) {
//       await fetch(`/api/playlist/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ songs: updatedSongs }),
//       });
//     }
//   };

//   /* ---------- SAVE NEW PLAYLIST ---------- */
//   const handleSavePlaylist = async () => {
//     if (playlistSongs.length === 0) return;

//     const res = await fetch("/api/create-playlist", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({
//         name: playlistName,
//         songs: playlistSongs,
//       }),
//     });

//     const data = await res.json();
//     if (data.success) setIsSaved(true);
//   };

//   /* ---------- DELETE PLAYLIST ---------- */
//   const handleDeletePlaylist = async () => {
//     const confirm = window.confirm("Delete this playlist?");
//     if (!confirm) return;

//     await fetch(`/api/playlist/${id}`, {
//       method: "DELETE",
//       credentials: "include",
//     });

//     navigate("/home");
//   };

//   return (
//     <div className="playlist-container">
//       {/* ---------- HEADER ---------- */}
//       <div className="playlist-header">
//         {isEditing ? (
//          <input
//   className="playlist-title-input"
//   value={playlistName}
//   onChange={(e) => setPlaylistName(e.target.value)}
//   onBlur={() => {
//     setIsEditing(false);
//     updatePlaylistName();
//   }}
//   autoFocus
// />

//         ) : (
//           <h1
//             className="playlist-title editable"
//             onClick={() => setIsEditing(true)}
//           >
//             {playlistName}
//           </h1>
//         )}

//         {!isViewMode && (
//           <button
//             className="save-playlist-btn"
//             onClick={handleSavePlaylist}
//             disabled={playlistSongs.length === 0 || isSaved}
//           >
//             {isSaved ? "Saved ✓" : "Save Playlist"}
//           </button>
//         )}

//         {isViewMode && (
//           <button
//             className="delete-playlist-btn"
//             onClick={handleDeletePlaylist}
//           >
//             Delete Playlist
//           </button>
//         )}
//       </div>

//       {/* ---------- PLAYLIST SONGS ---------- */}
//       {playlistSongs.length > 0 && (
//         <table className="playlist-table">
//           <tbody>
//             {playlistSongs.map((song, index) => (
//               <tr key={song.songId}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <div className="song-info">
//                     <img src={song.image} className="song-img" />
//                     <div>
//                       <div className="song-title">{song.name}</div>
//                       <div className="song-artist">{song.artist}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td>
//                   <button
//                     className="remove-button"
//                     onClick={() => handleRemoveSong(song.songId)}
//                   >
//                     <FaTimes />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* ---------- SEARCH ---------- */}
//       <div className="playlist-body">
//         <h2 className="playlist-subtitle">
//           Let’s find something for your playlist
//         </h2>

//         <input
//           className="playlist-search"
//           placeholder="Search for songs..."
//           value={searchValue}
//           onChange={(e) => handleChange(e.target.value)}
//         />

//         <div className="search-results">
//           {searchResults.map((song) => (
//             <div key={song.id} className="search-item">
//               <div className="search-left">
//                 <img
//                   src={song.album.images[0]?.url}
//                   className="search-img"
//                 />
//                 <div>
//                   <div className="song-title">{song.name}</div>
//                   <div className="song-artist">
//                     {song.artists.map((a) => a.name).join(", ")}
//                   </div>
//                 </div>
//               </div>

//               <button
//                 className="add-button"
//                 onClick={() => handleAddSong(song)}
//               >
//                 Add
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PlaylistPage;
import React, { useEffect, useState } from "react";
import "./PlaylistPage.css";
import { FaTimes } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

function PlaylistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isViewMode = Boolean(id);

  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  /* ---------- OPEN SONG DETAIL ---------- */
  const openSongDetail = (songId) => {
    navigate(`/song/${songId}`);
  };

  /* ---------- FETCH EXISTING PLAYLIST ---------- */
  useEffect(() => {
    if (!id) return;

    const fetchPlaylist = async () => {
      try {
        const res = await fetch(`/api/playlist/${id}`, {
          credentials: "include",
        });
        const data = await res.json();

        if (data.success) {
          setPlaylistName(data.playlist.name);
          setPlaylistSongs(data.playlist.songs || []);
          setIsSaved(true);
        }
      } catch (err) {
        console.log("Fetch playlist error:", err);
      }
    };

    fetchPlaylist();
  }, [id]);

  /* ---------- SEARCH SONGS ---------- */
  const handleChange = async (value) => {
    setSearchValue(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ value }),
      });

      const data = await res.json();
      setSearchResults(data.tracks?.items || []);
    } catch (err) {
      console.log("Search error:", err);
    }
  };

  /* ---------- ADD SONG ---------- */
  const handleAddSong = async (song) => {
    if (playlistSongs.find((s) => s.songId === song.id)) return;

    const updatedSongs = [
      ...playlistSongs,
      {
        songId: song.id,
        name: song.name,
        artist: song.artists.map((a) => a.name).join(", "),
        image: song.album.images[0]?.url,
      },
    ];

    setPlaylistSongs(updatedSongs);

    try {
      if (isViewMode) {
        await fetch(`/api/playlist/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ songs: updatedSongs }),
        });
      }
    } catch (err) {
      console.log("Add song error:", err);
    }
  };

  /* ---------- REMOVE SONG ---------- */
  const handleRemoveSong = async (e, songId) => {
    e.stopPropagation();

    const updatedSongs = playlistSongs.filter(
      (s) => s.songId !== songId
    );

    setPlaylistSongs(updatedSongs);

    try {
      if (isViewMode) {
        await fetch(`/api/playlist/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ songs: updatedSongs }),
        });
      }
    } catch (err) {
      console.log("Remove song error:", err);
    }
  };

  /* ---------- UPDATE PLAYLIST NAME ---------- */
  const updatePlaylistName = async () => {
    if (!isViewMode) return;

    try {
      await fetch(`/api/playlist/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: playlistName }),
      });
    } catch (err) {
      console.log("Update name error:", err);
    }
  };

  /* ---------- SAVE NEW PLAYLIST ---------- */
  const handleSavePlaylist = async () => {
    if (playlistSongs.length === 0) return;

    try {
      const res = await fetch("/api/create-playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: playlistName,
          songs: playlistSongs,
        }),
      });

      const data = await res.json();
      if (data.success) setIsSaved(true);
    } catch (err) {
      console.log("Save playlist error:", err);
    }
  };

  /* ---------- DELETE PLAYLIST ---------- */
  const handleDeletePlaylist = async () => {
    const ok = window.confirm("Delete this playlist?");
    if (!ok) return;

    try {
      await fetch(`/api/playlist/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      navigate("/home");
    } catch (err) {
      console.log("Delete playlist error:", err);
    }
  };

  return (
    <div className="playlist-container">
      {/* ---------- HEADER ---------- */}
      <div className="playlist-header">
        {isEditing ? (
          <input
            className="playlist-title-input"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              updatePlaylistName();
            }}
            autoFocus
          />
        ) : (
          <h1
            className="playlist-title editable"
            onClick={() => setIsEditing(true)}
          >
            {playlistName}
          </h1>
        )}

        {!isViewMode && (
          <button
            className="save-playlist-btn"
            onClick={handleSavePlaylist}
            disabled={playlistSongs.length === 0 || isSaved}
          >
            {isSaved ? "Saved ✓" : "Save Playlist"}
          </button>
        )}

        {isViewMode && (
          <button
            className="delete-playlist-btn"
            onClick={handleDeletePlaylist}
          >
            Delete Playlist
          </button>
        )}
      </div>

      {/* ---------- PLAYLIST SONGS ---------- */}
      {playlistSongs.length > 0 && (
        <table className="playlist-table">
          <tbody>
            {playlistSongs.map((song, index) => (
              <tr
                key={song.songId}
                className="playlist-row"
                onClick={() => openSongDetail(song.songId)}
              >
                <td>{index + 1}</td>

                <td>
                  <div className="song-info">
                    <img src={song.image} className="song-img" />
                    <div>
                      <div className="song-title">{song.name}</div>
                      <div className="song-artist">{song.artist}</div>
                    </div>
                  </div>
                </td>

                <td>
                  <button
                    className="remove-button"
                    onClick={(e) =>
                      handleRemoveSong(e, song.songId)
                    }
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------- SEARCH ---------- */}
      <div className="playlist-body">
        <h2 className="playlist-subtitle">
          Let’s find something for your playlist
        </h2>

        <input
          className="playlist-search"
          placeholder="Search for songs..."
          value={searchValue}
          onChange={(e) => handleChange(e.target.value)}
        />

        <div className="search-results">
          {searchResults.map((song) => (
            <div key={song.id} className="search-item">
              <div className="search-left">
                <img
                  src={song.album.images[0]?.url}
                  className="search-img"
                />
                <div>
                  <div className="song-title">{song.name}</div>
                  <div className="song-artist">
                    {song.artists.map((a) => a.name).join(", ")}
                  </div>
                </div>
              </div>

              <button
                className="add-button"
                onClick={() => handleAddSong(song)}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaylistPage;


