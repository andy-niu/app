//var mysql = require('mysql');
//var pool = require('./pool')
var mysql = require('./pool.js').instance();  
var base = require('./base')

var DB_NAME = 'loger';


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

var db = mysql.getConnection(DB_NAME);

// db.query('insert into table values(?, ?, ?)', [param1, param2, param3], function(err, results, fields) {  
//     if (err) {
//         logger.log('error', err);
//     } else {
//         console.log('成功');
//     }
// });
//查询全部
report.selectAll = function(callback) {
       db.query('SELECT * FROM Log', function(err, rows, fields) {
            if (err) throw err;
            callback(err,rows);     
       });
  }
//根据条件查询
report.select = function(where ,pageIndex ,pageSize ,callback) {
    
    pageIndex=!pageIndex ? 1: pageIndex==0 ? 1 : pageIndex;
    pageSize=!pageSize ?10 : pageSize==0 ? 10 : pageSize;

    report.GetCount(where,function(err,row){
        console.log(row)
        var count = row[0].Counts;
        var total =Math.floor(count % pageSize > 0 ? (count / pageSize) + 1 : count / pageSize);
        var thisPageIndex = (pageIndex - 1) * pageSize;
        if(where!=""){
            where+=(" where " + strWhere);
        }
        var sql='SELECT * FROM Log '+where+" ORDER BY id desc limit "+ thisPageIndex + "," + pageSize;
        console.log(sql);
        db.query(sql, function(err, rows, fields) {
            if (err) throw err;		
            callback(err,rows,total);   	
        });
            
    });
}
//获取总数
report.GetCount = function(where,callback) {
    var sql='SELECT count(0)Counts FROM Log';
    if(where!=''){
        sql+=" where " + where;
    }
    db.query(sql, function(err, rows, fields) {
        if (err) throw err;
        callback(err,rows);     
    });
}
//添加 
report.add = function(_report,callback) {
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
        db.query(sql,[_report.Platform,_report.Browser,_report.InputType,_report.Version,_report.IsCrawler,_report.IsMobileDevice,_report.Custom,_report.IP,_report.UrlReferrer,_report.Url], function(err, rows, fields) {
            if (err) throw err;
            callback(err,rows);     
        });
    } catch (error) {
        console.log(error);
    }
    
}

// pool.getConnection(function(err, connection) {

//   var useDbSql = "USE " + DB_NAME;
//   connection.query(useDbSql, function (err) {
//     if (err) {
//         console.log("USE Error: " + err.message);
//         return;
//     }
//     console.log('USE succeed');
//   });
    
//   report.selectAll = function name(callback) {
//         connection.query('SELECT * FROM Log', function(err, rows, fields) {
//             if (err) throw err;
//             callback(err,rows);     
//        });
//   }
  
//   report.select = function name(where,pageIndex,pageSize,callback) {
	  
// 	pageIndex=!pageIndex?1:pageIndex==0?1:pageIndex;
// 	pageSize=!pageSize?10:pageSize==0?10:pageSize;
	
// 	report.GetCount(where,function(err,row){
// 		console.log(row)
// 		var count = row[0].Counts;
// 		var total = count % pageSize > 0 ? (count / pageSize) + 1 : count / pageSize;
// 		var thisPageIndex = (pageIndex - 1) * pageSize;
// 		if(where!=""){
// 			where+=(" where " + strWhere);
// 		}
// 		var sql='SELECT * FROM Log '+where+" ORDER BY id desc limit "+ thisPageIndex + "," + pageSize;
// 		console.log(sql);
// 		connection.query(sql, function(err, rows, fields) {
// 			if (err) throw err;		
// 			callback(err,rows);   	
// 		});
			
// 	});
//   }
  
//   report.GetCount = function name(where,callback) {
        
//         connection.query('SELECT count(0)Counts FROM Log', function(err, rows, fields) {
//             if (err) throw err;
//             callback(err,rows);     
//        });
//   }
  
//   report.add = function name(_report,callback) {
//       try {
//           var sql= report.base.heredoc(function(){/*
//                                     INSERT INTO Loger.Log
//                                             (
//                                             Platform,Browser,InputType,Version,IsCrawler,IsMobileDevice,Custom,IP,UrlReferrer,Url,AddDate
//                                             )
//                                             VALUES
//                                             (
//                                             ?,?,?,?,?,?,?,?,?,?,NOW()
//                                             )
//                                   */});
//             //console.log(sql);
//             connection.query(sql,[_report.Platform,_report.Browser,_report.InputType,_report.Version,_report.IsCrawler,_report.IsMobileDevice,_report.Custom,_report.IP,_report.UrlReferrer,_report.Url], function(err, rows, fields) {
//                 if (err) throw err;
//                 callback(err,rows);     
//             });
//       } catch (error) {
//           console.log(error);
//       }
       
//   }
// });
module.exports = report;