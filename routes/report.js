var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var report = require('../models/report.js');
var guid = require('guid');
var platform = require('platform');

/* GET home page. */
router.get('/', function(req, res, next) {
    var beforeurl = req.query["beforeurl"];
    console.log(beforeurl);
    
    var c = { 
          ip : report.base.getClientIp(req),
          method : req.method,
          path : req.path ,
          accept : req.headers["accept"],
          userAgent : req.headers['user-agent'],
    };
    
    var isCrawler =function(userAgeent) {
        var array = [ "Baiduspider","Googlebot","360Spider","Sosospider", "sogou spider"];
        var bool = false;
        for (var key in array) {
          if (userAgeent.indexOf(array[key])>-1) {
            bool = true;
            break;
          }
        }
        return bool;
    }
    
    function  isMobile(userAgent) {
      return userAgent.indexOf("Mobile") == -1 ? false: true;
    }
    //guid.create().value
    
    var tiket = req.cookies.tiket;
    console.log("Cookies: ", req.cookies.tiket);   
    if(tiket == "" || tiket == undefined){
      tiket = guid.create().value;
      res.cookie('tiket', tiket, { maxAge: 24*60*60*1e3 });
    }
    var info=platform.parse(c.userAgent);
    try {
      
        report.Browser= info.name;
        report.ip=c.ip;
        report.Custom= tiket;
        report.InputType='';
        report.IsCrawler= isCrawler(c.userAgent);
        report.Url = c.path;
        report.UrlReferrer = beforeurl;
        report.Version = info.version;
        report.Platform ="Os:" +info.os+";layout:"+info.layout+";";
        report.IsMobileDevice = isMobile(c.userAgent);
        
    } catch (error) {
        console.log(error);
        res.send('');
        res.end();
        return;
    }
    
    report.add(report,function(err,data) {
      res.setHeader("Content-Type", "application/x-javascript");
      res.send('');
      res.end();
    });
});

module.exports = router;
