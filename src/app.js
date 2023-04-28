require('dotenv').config();
const express = require('express');

const app = express();

const albumHandlers = require('./albumHandlers');

app.get('/api/album', albumHandlers.getAlbums);
app.get('/api/album/:id', albumHandlers.getAlbumById);

const trackHandlers = require('./trackHandlers');

app.get('/api/track', trackHandlers.getTracks);
app.get('/api/track/:id', trackHandlers.getTrackById);

// Please keep this module.exports app, we need it for the tests !
module.exports = app;
