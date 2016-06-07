var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var report = require('../models/report');


/* GET home page. */
router.get('/', function(req, res, next) {
  
  var clientInfo = { 
            ip : report.base.getClientIp(req),
            method : req.method,
            path : req.path ,
            accept : req.headers["accept"],
            userAgent : req.headers['user-agent'],
          };
  var pageIndex=1, pageSize=10;
  pageIndex=req.query.p?req.query.p:pageIndex;
  report.select("",pageIndex,pageSize,function(err,data,pageTotal) {
     res.render('index', { title: 'mzmalls.com', data : data,err:err,pageInfo:{pageIndex:pageIndex,pageTotal:pageTotal} ,agent : clientInfo });
  })
});

module.exports = router;
