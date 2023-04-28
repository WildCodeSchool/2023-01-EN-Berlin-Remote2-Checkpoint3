const database = require('./database');

//   getting the SONGS
const getSongs = (_, res) => {
  database
    .query('select * from track')
    .then(([track]) => {
      console.log(track);
      res.json(track);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json('Error retrieving data from database');
    });
};

// GET THE ID
const getSongsID = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query('select * from track where id = ?', [id])
    .then(([track]) => {
      if (track.length > 0) {
        res.status(200).json(track[0]);
      } else {
        res.status(404).json('Not Found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

// SEND POST REQUEST
const postSong = (req, res) => {
  const { title, youtube_url, id_album } = req.body;

  database
    .query(
      'INSERT INTO track (title, youtube_url, id_album ) VALUES (?, ?, ?) ',
      [title, youtube_url, id_album]
    )
    .then(([songs]) => {
      console.log(songs);
      res.location(`/api/tracks/${songs.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

// SEND PUT REQUEST
const updateSong = (req, res) => {
  const { title, youtube_url, id_album } = req.body;
  const id = req.params.id;

  database
    .query(
      'UPDATE track SET title =?,youtube_url = ?, id_album= ?    WHERE id=?',
      [title, youtube_url, id_album, id]
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
const deleteSong = (req, res) => {
  const id = req.params.id;

  database
    .query('DELETE FROM track WHERE id = ?', [id])
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
  getSongs,
  getSongsID,
  postSong,
  updateSong,
  deleteSong,
};
