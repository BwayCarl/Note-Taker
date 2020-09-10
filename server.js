// Dependencies _______________________________
const express = require("express");
const path = require("path");
const fs = require("fs")

// Sets up Express App and Heroku Port control || else default port number.
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing ___________
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Listener starts the server ________
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
    });

   

// Setup notes
fs.readFile("Develop/db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);

    
    // ROUTES __________________________________
    
    // API Routes

    // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
    app.get("/api/notes", function(req, res) {
        
        res.json(notes);
    });

    // POST `/api/notes` - Should receive a new note to save on the request body, 
    //add it to the `db.json` file, and then return the new note to the client.
    app.post("/api/notes", function(req, res) {
        
        let newNote = req.body;
        notes.push(newNote);
        updateDb();
        return console.log("Added new note: " +newNote.title);
    });

    // Recalls a note via ID
    app.get("/api/notes/:id", function(req,res) {
        res.json(notes[req.params.id]);
    });

    // Deletes a note via ID
    app.delete("/api/notes/:id", function(req, res) {
        notes.splice(req.params.id, 1);
        updateDb();
        console.log("Deleted note with ID of "+req.params.id);
    });

    // HTML Routes 

    // GET `/notes` - Should return the `notes.html` file.
    app.get('/notes', function(req,res) {
        res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
    });
    
    // GET `*` - Should return the `index.html` file
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "Develop/public/index.html"));
    });

    // db.json file is updated when notes are added or deleted.
    function updateDb() {
        fs.writeFile("Develop/db/db.json",JSON.stringify(notes),err => {
            if (err) throw err;
            return true;
        });
    }
});

