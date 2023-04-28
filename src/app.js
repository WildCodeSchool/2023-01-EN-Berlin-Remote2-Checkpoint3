const express = require('express');
const app = express();

// add express.json to be able to use POST METHOD!!
app.use(express.json());

// import database
const tableTrack = require('./tableTrack');
const tableAlbum = require('./tableAlbum');

// ROUTE FOR TRACK TABLE!
app.get('/api/tracks', tableTrack.getSongs);
app.get('/api/tracks/:id', tableTrack.getSongsID);
app.post('/api/tracks', tableTrack.postSong);
app.put('/api/tracks/:id', tableTrack.updateSong);
app.delete('/api/tracks/:id', tableTrack.deleteSong);

// ROUTE FOR ALBUM TABLE
app.get('/api/albums', tableAlbum.getAlbums);
app.get('/api/albums/:id', tableAlbum.getAlbumID);
app.get('/api/albums/:id/tracks', tableAlbum.getTrackAlbum);
app.post('/api/albums', tableAlbum.postAlbum);
app.put('/api/albums/:id', tableAlbum.updateAlbum);
app.delete('/api/albums/:id', tableAlbum.deleteAlbum);
// Please keep this module.exports app, we need it for the tests !
module.exports = app;
