const express=require('express');
const app=express();
const userModel=require('./userModel')
const cors = require("cors");
const bodyParser = require("body-parser");
const connection=require('./db.js');
const bcrypt = require("bcrypt");
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); 
connection();



app.post("/Signup",async(req,res)=>{
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


app.post("/setpassword",async(req,res)=>{
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


  app.post("/login",async(req,res)=>{
   const{email,password}=req.body;
   try{
       const user=await userModel.findOne({email});
      if(!user){
      return res.json({success:false,message:"User not found"});
   }
   const hash=user.password;
     const result =await bcrypt.compare(password,hash);
     if(result){
      return res.json({success:true,message:""});
     }else{
      return res.json({success:false,message:"Incorrect Password"})
     }
   }
   catch(err){
 res.status(500).json({ success: false, message: "Server error" });
   }
  })



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


app.get("/api/artists",async (req,res)=>{
  try{
    const token=await getAccessToken();
    const terms=["b","punjabi","ar","r","d","s",'o','k']
     const randomTerm = terms[Math.floor(Math.random() * terms.length)];
  const url=`https://api.spotify.com/v1/search?q=${randomTerm}&type=artist&limit=10`;
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


app.get("/api/songs",async(req,res)=>{
  try{
    const token =await getAccessToken();
      const terms = ["a", "s", "a", "d", "punjabi", "n","dance","k","bollywood","hindi","english"];
    const randomTerm = terms[Math.floor(Math.random() * terms.length)];
  const url=`https://api.spotify.com/v1/search?q=${randomTerm}&type=track&limit=10`;
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


  app.get("/api/albums",async(req,res)=>{
     try {
      const token =await getAccessToken();
    const terms = ["punjabi", "pop", "bollywood", "romantic",'dance','hollywood'];
    const randomTerm = terms[Math.floor(Math.random() * terms.length)];

    const url = `https://api.spotify.com/v1/search?q=${randomTerm}&type=album&limit=10`;
    const response=await fetch(url,{
   headers: {
      Authorization: `Bearer ${token}`, 
    },
});
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error("Error fetching albums:", err);
    res.status(500).json({ message: "Failed to fetch albums" });
  }
  })


app.listen(5000,() => console.log("Server running on port 5000"));