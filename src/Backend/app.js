const express=require('express');
const app=express();
const userModel=require('./userModel')
const cors = require("cors");
const bodyParser = require("body-parser");
const connection=require('./db.js');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser')
const { get } = require('mongoose');
const verifyToken = require("./verifyToken");

require("dotenv").config();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,              
}));
app.use(bodyParser.json()); 
app.use(cookieParser());
connection();



app.post("/api/Signup",async(req,res)=>{
    let {email}=req.body;
    try{
     const existinguser=await userModel.findOne({email});
     if(existinguser){
        return res.json({success:false,message:"Email already registered,To continue,login."});
     }
     const newuser=await userModel.create({email});
       return res.json({ success: true, message: "Email saved successfully", user: { _id: newuser._id, email: newuser.email } })
    }catch(error){
     res.status(500).json({ success: false, message: "Server error" });
    }
})


app.post("/api/setpassword",async(req,res)=>{
   const {userId,password}=req.body;
   const salt =await bcrypt.genSalt(10);
   const hashed=await bcrypt.hash(password,salt)
   try{
     const user = await userModel.findById(userId);
     if(!user){
     return res.json({success:false,message:"User not found"});
     }
     user.password=hashed;
    await user.save();
   return res.json({success:true,message:"Password set successfully"});
   }
   catch(err){
  return res.status(500).json({ success: false, message: "Server error" });
   }
})
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const hash = user.password; // stored bcrypt hash
    const result = await bcrypt.compare(password, hash);

    if (!result) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    // Sign token with user id (so server can identify user later)
    const jwtSecret = process.env.JWT_SECRET || "secretkey";
    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: "7d" });

    // Set cookie with token. httpOnly so frontend JS can't read it.
    // sameSite:'lax' allows cross-site top-level navigation; adjust secure:true in production (HTTPS).
      res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax"
});



    return res.json({ success: true, message: "Logged in" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


  const clientId = "8d34a0ebc8c447ffa64194205e937683";
const clientSecret = "35445eba7cf840f9bdc6b51e10bdba6f";

async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
  });

  const data = await response.json();
  return data.access_token;
}

    const terms3=["b","punjabi","ar","r","d","s",'o','k']
     const randomTerm4 = terms3[Math.floor(Math.random() * terms3.length)];
  const urrl=`https://api.spotify.com/v1/search?q=${randomTerm4}&type=artist&limit=10`;
  const urrrl=`https://api.spotify.com/v1/search?q=${randomTerm4}&type=artist&limit=30`;
app.get("/api/artists",verifyToken,async (req,res)=>{
  try{
    const token=await getAccessToken();
  const response=await fetch(urrl,{
   headers: {
      Authorization: `Bearer ${token}`, 
    },
})
const data=await response.json();
return res.json(data);
  }
  catch(err){
        console.error("Error fetching albums:", err);
    res.status(500).json({ message: "Failed to fetch albums" });
  }
})
app.get("/api/allartists",verifyToken,async (req,res)=>{
  try{
    const token=await getAccessToken();
  const response=await fetch(urrrl,{
   headers: {
      Authorization: `Bearer ${token}`, 
    },
})
const data=await response.json();
return res.json(data);
  }
  catch(err){
        console.error("Error fetching albums:", err);
    res.status(500).json({ message: "Failed to fetch albums" });
  }
})


     const terms = ["a", "s", "a", "d", "punjabi", "n","dance","k","bollywood","hindi","english"];
     const randomTerm = terms[Math.floor(Math.random() * terms.length)];
     const url=`https://api.spotify.com/v1/search?q=${randomTerm}&type=track&limit=10`;
     const urll=`https://api.spotify.com/v1/search?q=${randomTerm}&type=track&limit=25`;
app.get("/api/songs",verifyToken,async(req,res)=>{
  try{
    const token =await getAccessToken();
    const response=await fetch(url,{
   headers: {
      Authorization: `Bearer ${token}`, 
    },
})
const data=await response.json();
return res.json(data);
  }
  catch(err){
     console.error("Error fetching albums:", err);
    res.status(500).json({ message: "Failed to fetch albums" });
  }
})
app.get("/api/allsongs",verifyToken,async(req,res)=>{
  try{
    const token =await getAccessToken();
    const response=await fetch(urll,{
   headers: {
      Authorization: `Bearer ${token}`, 
    },
})
const data=await response.json();
return res.json(data);
  }
  catch(err){
     console.error("Error fetching albums:", err);
    res.status(500).json({ message: "Failed to fetch albums" });
  }
})


       const terms1 = ["punjabi", "pop", "bollywood", "romantic",'dance','hollywood'];
    const randomTerm1 = terms1[Math.floor(Math.random() * terms1.length)];
    const urla = `https://api.spotify.com/v1/search?q=${randomTerm1}&type=album&limit=10`;
     const urlat = `https://api.spotify.com/v1/search?q=${randomTerm1}&type=album&limit=20`;
  app.get("/api/albums",verifyToken,async(req,res)=>{
     try {
      const token =await getAccessToken();
    const response=await fetch(urla,{
   headers: {
      Authorization: `Bearer ${token}`, 
    },
});
    const data = await response.json();
    return res.json(data);
  } catch (err) {
     res.status(500).json({ message: "Failed to fetch albums" });
    console.error("Error fetching albums:", err);
   }
  })
  app.get("/api/allalbums",verifyToken,async(req,res)=>{
      try {
      const token =await getAccessToken();
    const response=await fetch(urlat,{
   headers: {
      Authorization: `Bearer ${token}`, 
    },
});
    const data = await response.json();
    return res.json(data);
  } catch (err) {
     res.status(500).json({ message: "Failed to fetch albums" });
    console.error("Error fetching albums:", err);
   }
  })

  app.post("/api/search",verifyToken,async(req,res)=>{
    try{
    const {value}=req.body;
    const token= await getAccessToken();
         const urls=`https://api.spotify.com/v1/search?q=${value}&type=track&limit=10`;
         const urlab = `https://api.spotify.com/v1/search?q=${value}&type=album&limit=10`;
         const urrrl=`https://api.spotify.com/v1/search?q=${value}&type=artist&limit=10`;
         const ress=await fetch(urls,{
   headers: {
      Authorization: `Bearer ${token}`, 
    },
});
    const resat=await fetch(urrrl,{
   headers: {
      Authorization: `Bearer ${token}`, 
    },
});
    const resab=await fetch(urlab,{
   headers: {
      Authorization: `Bearer ${token}`, 
    },
});
     const datas=await ress.json();
     const datat=await resat.json();
     const datab=await resab.json();

 return res.json({
      tracks: datas.tracks,
      artists: datat.artists,
      albums: datab.albums,
    });

    
    }catch(err){
          res.status(500).json({ message: "Failed to fetch data" });
      console.log(err);
    }
         
  })

app.post("/api/search/songs",verifyToken,async(req,res)=>{
   const token=await getAccessToken();
   const {value}=req.body;
    const urls=`https://api.spotify.com/v1/search?q=${value}&type=track&limit=25`;
    const response=await fetch(urls,{
   headers: {
      Authorization: `Bearer ${token}`, 
    },
})
 const data=await response.json();
  return res.json(data);
})

app.post("/api/search/albums",verifyToken,async(req,res)=>{
   const token=await getAccessToken();
   const {value}=req.body;
    const urls=`https://api.spotify.com/v1/search?q=${value}&type=album&limit=20`;;
    const response=await fetch(urls,{
   headers: {
      Authorization: `Bearer ${token}`, 
    },
})
 const data=await response.json();
  return res.json(data);
})


app.post("/api/search/artists",verifyToken,async(req,res)=>{
   const token=await getAccessToken();
   const {value}=req.body;
    const urls=`https://api.spotify.com/v1/search?q=${value}&type=artist&limit=25`;;
    const response=await fetch(urls,{
   headers: {
      Authorization: `Bearer ${token}`, 
    },
})
 const data=await response.json();
  return res.json(data);
})

app.post("/api/like", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { songId, name, artist, image } = req.body;

    if (!songId) {
      return res.status(400).json({
        success: false,
        message: "songId required"
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    //  check already liked
    const alreadyLiked = user.likedsongs.some(
      (song) => song.songId === songId
    );

    if (alreadyLiked) {
      return res.status(400).json({
        success: false,
        message: "Song already liked"
      });
    }

    // ✅ add liked song
    user.likedsongs.push({
      songId,
      name,
      artist,
      image
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Song liked successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});
app.post("/api/unlike", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { songId } = req.body;

    await userModel.findByIdAndUpdate(
      userId,
      { $pull: { likedsongs: { songId } } }
    );

    res.json({ success: true, message: "Song unliked" });
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/liked-songs", verifyToken, async (req, res) => {
  const user = await userModel.findById(req.userId);
  res.json({
    success: true,
    likedsongs: user.likedsongs
  });
});

app.post("/api/create-playlist", verifyToken, async (req, res) => {
  const { name, songs } = req.body;

  if (!name) {
    return res.json({ success: false, message: "Playlist name required" });
  }

  const user = await userModel.findById(req.userId);

  user.playlists.push({
    name,
    songs
  });

  await user.save();

  res.json({
    success: true,
    message: "Playlist created",
    playlists: user.playlists
  });
});
app.get("/api/playlists", verifyToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("playlists");
    res.json({ success: true, playlists: user.playlists });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});
app.get("/api/playlist/:id", verifyToken, async (req, res) => {
  const user = await userModel.findById(req.userId);
  const playlist = user.playlists.id(req.params.id);
  res.json({ success: true, playlist });
});

app.put("/api/playlist/:id", verifyToken, async (req, res) => {
  const { name, songs } = req.body;

  const user = await userModel.findById(req.userId);

  const playlist = user.playlists.id(req.params.id);
  if (!playlist) {
    return res.status(404).json({ success: false });
  }

  if (name !== undefined) playlist.name = name;
  if (songs !== undefined) playlist.songs = songs;

  await user.save();

  res.json({ success: true });
});

app.delete("/api/playlist/:id", verifyToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    user.playlists = user.playlists.filter(
      (pl) => pl._id.toString() !== req.params.id
    );
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.get("/api/song/:id",verifyToken, async (req, res) => {
  try {
    const token = await getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const track = await response.json();

    res.json({
      success: true,
      track,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});
app.get("/api/artist/:id", verifyToken,async (req, res) => {
  try {
    const token = await getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/artists/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const artist = await response.json();

    res.json({ success: true, artist });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});
app.get("/api/artist/:id/top-tracks",verifyToken, async (req, res) => {
  try {
    const token = await getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/artists/${req.params.id}/top-tracks?market=IN`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    res.json({ success: true, tracks: data.tracks });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});
app.get("/api/album/:id", verifyToken,async (req, res) => {
  try {
    const token = await getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/albums/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const album = await response.json();

    res.json({ success: true, album });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});
app.get("/api/album/:id/tracks", verifyToken,async (req, res) => {
  try {
    const token = await getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/albums/${req.params.id}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    res.json({ success: true, tracks: data.items });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.get("/api/me", verifyToken, async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId)
      .select("email avatar likedsongs playlists");

    if (!user) {
      return res.status(404).json({ success: false });
    }

    res.json({
      success: true,
      user,
      stats: {
        liked: user.likedsongs.length,
        playlists: user.playlists.length,
      },
    });
  } catch (err) {
    console.error("ME API ERROR:", err);
    res.status(500).json({ success: false });
  }
});


app.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ success: true });
});


app.listen(5000,() => console.log("Server running on port 5000"));

