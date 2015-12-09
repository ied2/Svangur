'use strict';

var pg = require('pg');

var DATABASE = process.env.DATABASE_URL;

module.exports.listUsers = function listUsers (cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var query = 'SELECT username FROM users LIMIT 20';
    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

// My code here

module.exports.listText = function listText (username, date, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    var user = username.trim();
    console.log("date: " + date);

    var query = "SELECT * FROM comments WHERE username LIKE '"+user+"%' ORDER BY date DESC";

    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

module.exports.listDiary = function listDiary (username, id, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    var user = username.trim();
    console.log("id: " + id);

    var query = "SELECT * FROM comments WHERE username LIKE '"+user+"%' AND id = '"+id+"'";

    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

module.exports.deleteDiary = function deleteDiary (id,cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var query = "DELETE FROM comments WHERE id = '"+id+"'";

    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

module.exports.listRestaurants = function listRestaurants (cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var query = "SELECT * FROM restaurants";

    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

module.exports.createComment = function createComment (username, title, text, date, cb) {
    createCommentFromUser(username, title, text, date, cb);
};

function createCommentFromUser (username, title, text, date, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username, text, date, title];
    var query = 'INSERT into comments' +
                '(username, text, date, title) VALUES($1, $2, $3, $4)';
    client.query(query, values, function (err, result) {
      done();

      if (err) {
        console.error(err);
        return cb(error);
      } else {
        return cb(null, true);
      }
    });
  });
}