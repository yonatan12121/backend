const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
require('dotenv').config()

mongoose.set('strictQuery', true);



require('dotenv').config()
const mongoUrl = process.env.mongoUrl;
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));


require("./SongModel");



const Songs = mongoose.model("Songs");


app.post("/addsong", async (req, res) => {
  console.log("Song added");
  const { values } = req.body;

  console.log(values);
  var Title = values.title;
  var Artist = values.artist;
  var Album = values.album;
  var Genre = values.genre;

  try {
    await Songs.create({
      Title,
      Artist,
      Album,
      Genre,
    });
    res.send({ status: "ok" });
    console.log("success");


  } catch (error) {
    res.send({ status: "error" });
    console.log(error);

  }
});


app.get("/Getsong", async (req, res) => {
  Songs.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send(data);


    }
  })

})

app.get("/Totalsong", async (req, res) => {
  Songs.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send(data.length);


    }
  })

})

app.get("/genre", async (req, res) => {
  const { Genre } = req.body; 
  console.log(Genre);
  const Song = await Songs.findOne({ Genre });
  var gene;
  if (!Song && Song === null) {
    gene = "there is no song with that Genre"
  }
  else {
    gene = Song;
  }
  return res.json({ gene });

})


app.get("/artist", async (req, res) => {
  const { Artist } = req.body;
  const Song = await Edirs.findOne({ Artist });
  var gene;
  if (!Song && Song === null) {
    gene = "there is no song with that genre"
  }
  gene = Song;
  return res.json({ gene });

})

app.post("/Updatesong", async (req, res) => {

  const { values } = req.body;
  console.log(values);
  var id = values.id;
  var Title = values.title;
  var Artist = values.artist;
  var Album = values.album;
  var Genre = values.genre;
  // console.log(values);
  // console.log(email, firstName, lastName, DOB, nation, gender);
  console.log("ti", Title);
  try {
    const data = await Songs.updateMany({ _id: id }, { $set: { Title, Artist, Album, Genre } })
    data.save();
  } catch (error) {
    res.send(error);
  }
  console.log("update the Song")

});

app.post("/Removesong", async (req, res) => {
  const { title } = req.body;
  console.log(title);
  Songs.deleteOne(
    { _id: title }, (err, doc) => {
      if (err) return console.log(err);
      console.log("removed the Song")



    })




});







app.listen(5000, () => {
  console.log("Server Started");
});