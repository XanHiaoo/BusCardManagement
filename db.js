var mssql = require('mssql');
const sqlConfig = {
    user:'sa',
    password: '123456',
    database: 'BusCardManagement',
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        // encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs//这句话很重要不然无法连接
    }
}
var db = {};
db.sql = function (sql, callBack) {
    var connection = new mssql.ConnectionPool(sqlConfig, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        var ps = new mssql.PreparedStatement(connection);
        ps.prepare(sql, function (err) {
            if (err){
                console.log(err);
                return;
            }
            ps.execute('', function (err, result) {
                if (err){
                    console.log(err);
                    return;
                }

                ps.unprepare(function (err) {
                    if (err){
                        console.log(err);
                        callback(err,null);
                        return;
                    }
                    callBack(err, result);
                });
            });
        });
    });
};

module.exports = db;  