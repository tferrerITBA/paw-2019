CREATE TABLE IF NOT EXISTS users(
  userid SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS profile_pictures(
  profile_picture_id SERIAL PRIMARY KEY,
  userid INTEGER UNIQUE NOT NULL,
  data BYTEA NOT NULL,
  FOREIGN KEY (userid) REFERENCES users ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clubs(
  clubid SERIAL PRIMARY KEY,
  clubname VARCHAR(100) NOT NULL,
  location VARCHAR(500) NOT NULL,
  club_created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS pitches(
  pitchid SERIAL PRIMARY KEY,
  clubid INTEGER NOT NULL,
  pitchname VARCHAR(100) NOT NULL,
  sport VARCHAR(100) NOT NULL,
  pitch_created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (clubid) REFERENCES clubs ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pitch_pictures(
  pitch_picture_id SERIAL PRIMARY KEY,
  pitchid INTEGER UNIQUE NOT NULL,
  data BYTEA NOT NULL,
  FOREIGN KEY (pitchid) REFERENCES pitches ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS events(
  eventid SERIAL PRIMARY KEY,
  userid INTEGER NOT NULL,
  pitchid INTEGER NOT NULL,
  eventname VARCHAR(100) NOT NULL,
  description VARCHAR(500),
  max_participants INTEGER NOT NULL,
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP,
  event_created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (userid) REFERENCES users ON DELETE CASCADE,
  FOREIGN KEY (pitchid) REFERENCES pitches ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS events_users(
  userid INTEGER NOT NULL,
  eventid INTEGER NOT NULL,
  vote INTEGER,
  FOREIGN KEY (userid) REFERENCES users ON DELETE CASCADE,
  FOREIGN KEY (eventid) REFERENCES events ON DELETE CASCADE,
  PRIMARY KEY (userid, eventid)
);
