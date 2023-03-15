const mongoose= require("mongoose");

const SongScehma = new mongoose.Schema(
    {

    Title: String,
    Artist: String,
    Album: String,
    Genre: String,
      
      
    },
    {
        collection: "Songs",

    }

);

mongoose.model("Songs", SongScehma);