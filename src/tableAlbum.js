const database = require('./database');

//   getting the ALBUM
const getAlbums = (_, res) => {
  database
    .query('select * from album')
    .then(([album]) => {
      console.log(album);
      res.status(200).json(album);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json('Error retrieving data from database');
    });
};

// GET THE ID
// GET THE ID
const getAlbumID = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query('select * from album where id = ?', [id])
    .then(([result]) => {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json('Not Found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

// ALBUM SONGS
const getTrackAlbum = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query('select * from track where id_album = ?', [id])
    .then(([result]) => {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json('Not Found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

// POST REQUEST

const postAlbum = (req, res) => {
  const { title, genre, picture, artist } = req.body;

  database
    .query(
      'INSERT INTO album (title, genre, picture, artist) VALUES (?, ?, ?, ?) ',
      [title, genre, picture, artist]
    )
    .then(([result]) => {
      console.log(result);
      res.location(`/api/albums/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

// PUT REQUEST
const updateAlbum = (req, res) => {
  const { title, genre, picture, artist } = req.body;
  const id = req.params.id;

  database
    .query(
      'UPDATE album SET title =?, genre = ?, picture= ?, artist=?   WHERE id=?',
      [title, genre, picture, artist, id]
    )
    .then(([result]) => {
      console.log(result.affectedRows);
      if (!result.affectedRows) {
        res.status(404).json('error happen :), try again');
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      res.status(500).json('error editing', err);
    });
};
// DELETE METHOD
const deleteAlbum = (req, res) => {
  const id = +req.params.id;

  database
    .query('DELETE FROM album WHERE id = ?', [id])
    .then(([result]) => {
      if (!result.affectedRows) {
        res.status(404).json('not found');
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

module.exports = {
  getAlbums,
  getAlbumID,
  getTrackAlbum,
  postAlbum,
  updateAlbum,
  deleteAlbum,
};
