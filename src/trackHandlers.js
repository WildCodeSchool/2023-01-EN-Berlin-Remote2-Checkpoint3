const database = require('./database');

const getTracks = (req, res) => {
  let sql = 'select * from track';
  let sqlValues = [];

  const queryKeys = Object.keys(req.query);

  if (queryKeys.length === 1 && queryKeys[0] === 'album') {
    sql += ' where id_album = ?';
    sqlValues = Object.values(req.query);
  }

  database
    .query(sql, sqlValues)
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
