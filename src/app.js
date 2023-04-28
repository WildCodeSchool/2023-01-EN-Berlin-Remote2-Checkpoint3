require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const albumHandlers = require('./albumHandlers');

app.get('/api/albums', albumHandlers.getAlbums);
app.get('/api/albums/:id', albumHandlers.getAlbumById);
app.post('/api/albums', albumHandlers.postAlbum);
app.delete('/app/albums/:id', albumHandlers.deleteAlbumById);

const trackHandlers = require('./trackHandlers');

app.get('/api/tracks', trackHandlers.getTracks);
app.get('/api/tracks/:id', trackHandlers.getTrackById);
app.get('/api/albums/:id/tracks', trackHandlers.getTracksByAlbumId);

// Please keep this module.exports app, we need it for the tests !
module.exports = app;
