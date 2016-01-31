import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const APP_PORT = process.env.PORT || 8000;

/* Cached Data*/
let cachedNotes = [
    {
        id: 1,
        text: 'This is a Note',
        position: [0, 0]
    }
];
let nextID = 2;

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(express.static(path.resolve(__dirname, '../../public')));
server.get('/api/notes', (req, res) => {
    res.send(cachedNotes);
});

server.post('/api/notes/add', (req, res) => {
    const newNote = req.body;
    newNote.id = nextID++;
    cachedNotes = cachedNotes.concat([newNote]);
    res.send(newNote);
});


server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

server.listen(APP_PORT, () => {
    // TODO: may not be localhost
    console.log(`======= App Server running on http://localhost:${APP_PORT}`); // eslint-disable-line no-console
});
