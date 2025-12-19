const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },                   

  image: { 
    type: String, 
    required: true 
  },                   

  artist: { 
    type: String, 
    required: true 
  },                 

});

module.exports = mongoose.model("Song", SongSchema);
