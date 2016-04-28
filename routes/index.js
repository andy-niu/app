var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var report = require('../models/report.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  
  var clientInfo = { 
            ip : report.base.getClientIp(req),
            method : req.method,
            path : req.path ,
            accept : req.headers["accept"],
            userAgent : req.headers['user-agent'],
          };
  report.selectAll(function(err,data) {
     res.render('index', { title: 'Express', data : data,err:err ,agent : clientInfo });
  })
});

module.exports = router;
