CREATE TABLE album (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  genre varchar(255),
  picture varchar(255),
  artist varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE track (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(128) NOT NULL,
  youtube_url varchar(255),
  id_album int,
  PRIMARY KEY (id),
  CONSTRAINT FK_idalbum FOREIGN KEY (id_album)
    REFERENCES album(id)
);

INSERT INTO
album (title, artist)
VALUES
(
    'Actress Spring',
    'Shevchuk'
),
(
    'Imagine',
    'Lennon'
);

INSERT INTO
track (title, id_album)
VALUES
(
    'Rain',
    1
),
(
    'Imagine',
    2
);