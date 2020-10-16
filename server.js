const path = require("path");
const fs = require("fs")
const express = require("express");
const encoding = "utf8";

// initializes express
const app = express();

// initializes port
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// path and file join
const savePath = path.resolve(__dirname, "db");
const saveFile = path.join(savePath, "db.json");
let data = []
// reads file contents


// converts to json
//let savedContent = JSON.parse(fileContents);
//console.log(savedContent)
let id = 1

// brings you to the index page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// brings you to the notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

// gets the notes that are saved in the db.json file
app.get("/api/notes", function(req, res) {
     fs.readFile(saveFile,"utf8", (err,results) => {
        if (err) throw err;
        console.log(results)
        data = JSON.parse(results)
        return res.json(data);
    });
   
});

// gets a certain note saved in the db.json file
app.get("/api/notes/:id", function(req, res) {
    const userChoice = req.params.id;
    console.log(req.params);
    for (let i = 0; i < savedContent.length - 1; i++) {
        if (userChoice == savedContent[i].id) {
            return res.json(savedContent[i]);
        }
    }
    return res.json(false);
});

// posts a note to the body when the user clicks the save button
app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    id = Math.max(...data.map(note => note.id)) + 1;
    newNote.id = id;
    id += 1;
    data.push(newNote);
    const savedContentJson = JSON.stringify(data);
    console.log(savedContentJson);
    fs.writeFile(saveFile, savedContentJson, this.encoding, err => {
        if (err) throw err;
    });
    res.json(newNote);
});
app.delete("/api/notes/:id", function(req, res) {
      const getId = parseInt(req.params.id)
      console.log(getId)
      for (let i = 0; i < data.length; i++) {
          if (data[i].id===getId){
              data.splice(i,1)
          }
      }
      const savedContentJson = JSON.stringify(data);
      console.log(savedContentJson);
      fs.writeFile(saveFile, savedContentJson, this.encoding, err => {
          if (err) throw err;
      });
      res.json(data);
})
// wildcard to route to homepage when requested address isn't valid
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// server up and running when this function runs
app.listen(PORT, function() {
    console.log(`App listening on PORT: ${ PORT }`);
});