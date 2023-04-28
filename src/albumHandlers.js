const database = require('./database');

const getAlbums = (req, res) => {
  database
    .query('select * from album')
    .then(([albums]) => {
      res.json(albums);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from the database');
    });
};
const getAlbumById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query('select * from album where id = ?', [id])
    .then(([album]) => {
      if (album[0] != null) {
        res.json(album[0]);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from the database');
    });
};
const deleteAlbumById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query('delete from album where id = ?', [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error deleting the album');
    });
};
const postAlbum = (req, res) => {
  const { title, genre, picture, artist } = req.body;
  database
    .query(
      'insert into album (title, genre, picture, artist) values (?, ?, ?, ?)',
      [title, genre, picture, artist]
    )
    .then(([result]) => {
      res.location(`/api/albums/${result.insertId}`).status(201).json({
        id: result.insertId,
        title: title,
        genre: genre,
        picture: picture,
        artist: artist,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the album');
    });
};

module.exports = {
  getAlbums,
  getAlbumById,
  postAlbum,
  deleteAlbumById,
};
