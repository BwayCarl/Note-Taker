// Dependencies _______________________________
const express = require("express");
const path = require("path");
const fs = require("fs")

// Sets up the Express App _____________________
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing ___________
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


fs.readFile ("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    
    let notes = (JSON.parse.data);


//API Routes ___________________________________

// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
    res.json(notes);
});
    //* POST `/api/notes` - Should receive a new note to save on the request body, 
    //add it to the `db.json` file, and then return the new note to the client.
    
    app.post("/api/notes", function(req, res) {
        
        let newNote = req.body;
        notes.push(newNote);
        updateDb();
        return console.log(newNote);
        
      });
    });
    
// Routes _______________________________________

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
  

// Starts the server to begin listening ________
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    });