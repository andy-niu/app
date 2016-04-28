var mysql = require('mysql');
var pool = require('./pool')
var base = require('./base')

var DB_NAME = 'Loger';


var report = {
                Platform:"",
                Browser:"",
                InputType:"",
                Version:"",
                IsCrawler:"",
                IsMobileDevice:"",
                Custom:"",
                IP:"",
                UrlReferrer:"",
                Url:"",
                AddDate:new Date()
            };

report.base = base;
pool.getConnection(function(err, connection) {

  var useDbSql = "USE " + DB_NAME;
  connection.query(useDbSql, function (err) {
    if (err) {
        console.log("USE Error: " + err.message);
        return;
    }
    console.log('USE succeed');
  });
    
  report.selectAll = function name(callback) {
        connection.query('SELECT * FROM Log', function(err, rows, fields) {
            if (err) throw err;
             callback(err,rows);     
       });
  }
  
  report.add = function name(_report,callback) {
      try {
          var sql= report.base.heredoc(function(){/*
                                    INSERT INTO Loger.Log
                                            (
                                            Platform,Browser,InputType,Version,IsCrawler,IsMobileDevice,Custom,IP,UrlReferrer,Url,AddDate
                                            )
                                            VALUES
                                            (
                                            ?,?,?,?,?,?,?,?,?,?,NOW()
                                            )
                                  */});
            //console.log(sql);
            connection.query(sql,[_report.Platform,_report.Browser,_report.InputType,_report.Version,_report.IsCrawler,_report.IsMobileDevice,_report.Custom,_report.IP,_report.UrlReferrer,_report.Url], function(err, rows, fields) {
                if (err) throw err;
                callback(err,rows);     
            });
      } catch (error) {
          console.log(error);
      }
       
  }
 
});
module.exports = report;