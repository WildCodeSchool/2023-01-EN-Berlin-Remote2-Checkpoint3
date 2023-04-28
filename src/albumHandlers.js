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

module.exports = {
  getAlbums,
  getAlbumById,
};
