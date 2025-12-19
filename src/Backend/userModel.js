const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },

  likedsongs: [
    {
      songId: { type: String, required: true }, 
      name: String,
      artist: String,
      image: String,
    }
  ],
  playlists: [
    {
      name: String,
      songs: [
        {
          songId: String,
          name: String,
          artist: String,
          image: String
        }
      ],
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);

