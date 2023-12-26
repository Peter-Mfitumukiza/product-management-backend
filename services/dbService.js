const dbConfig = require('../config/db');
const sql = require('mssql');

async function common_db_call(spName, plist, callback) {
    sql.connect(dbConfig)
        .then((pool) => {
            const request = pool.request();

            plist.forEach(item => {
                if (item.Direction == 0) {
                    //setting input parameters
                    request.input(item.ParamName, item.Value);
                } else if (item.Direction == 1) {
                    //setting output parameters
                    request.output(item.ParamName, sqlDataType(item.DataType.toLowerCase()));
                }
            })
            request.execute(spName).then(result => {
                callback(null, result);
            }).catch(err => {
                callback(err, null);
            })
        }).catch(err => {
            callback(err, null);
        })
}

module.exports.common_db_call = common_db_call;