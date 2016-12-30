var express = require('express')
var router = express.Router()
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'enigma'
});

router.get('/', function (req, res) {
  var sql = "SELECT * FROM pelanggan";

  connection.query(sql, function(err, rows, fields){
    if(err) throw err;

    res.json(rows);
  });
})

router.get('/byPhone', function(req, res){
  var sql = "SELECT * FROM pelanggan WHERE NO_TELEPON = ?";
  var id = req.query.number;
  connection.query(sql,[id], function(err, rows, fields){
    if(err) throw err;

    if(rows.length > 0){
        res.json(rows);
    }else{
      res.status(500).json({ error: 'Data not found dude!' });
    }

  });
})

router.get('/byInternet', function(req, res){
  var sql = "SELECT * FROM pelanggan WHERE NO_INTERNET = ?";
  var id = req.query.number;
  connection.query(sql,[id], function(err, rows, fields){
    if(err) throw err;

    if(rows.length > 0){
        res.json(rows);
    }else{
      res.status(500).json({ error: 'Data not found dude!' });
    }
  });
})

router.get('/tagihan', function(req, res){
  var sql = "SELECT SUM(harga) as total FROM tagihan WHERE NCLI = ? and STATUS = 0";
  var id = req.query.ncli;
  connection.query(sql,[id], function(err, rows, fields){
    if(err) throw err;

    if(rows.length > 0){
      console.log(rows);
        res.json(rows);
    }else{
      res.status(500).json({ error: 'Data not found dude!' });
    }
  });
})

module.exports = router
