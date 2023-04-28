const database = require('./database');

const getTracks = (req, res) => {
  database
    .query('select * from track')
    .then(([tracks]) => {
      res.json(tracks);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from the database');
    });
};
const getTrackById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query('select * from track where id = ?', [id])
    .then(([track]) => {
      if (track[0] != null) {
        res.json(track[0]);
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
  getTracks,
  getTrackById,
};
