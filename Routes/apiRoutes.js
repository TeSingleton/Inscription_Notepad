const express = require('express');
 const router = express.Router();

 const savedNotes= require('../db/savedNotes');

 router.get('/notes', (req, res) => {
    // run getNotes() method
    savedNotes.getNotes()
         .then((notes) => {
        // return response in json format
         return res.json(notes)
        })
        // if error, return status 500 with error
        .catch((err) => res.status(500).json(err));
});


router.post('/notes', (req, res) => {
    // run addNote() method
    savedNotes.addNote(req.body)
         .then((note) => res.json(note))
         .catch((err) => res.status(500).json(err));
});

router.delete('/notes/:id', (req, res) => {
    // run deleteNote() method with req id as a parameter
    savedNotes.deleteNote(req.params.id)
         .then((note) => res.json({ ok: true }))
         .catch((err) => res.status(500).json(err));
});

module.exports = router;