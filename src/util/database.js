const {MongoClient} = require("mongodb")

let db_url = "mongodb+srv://rameez18:22121997@cluster0.vj3gh.mongodb.net/image_upload_service"
let _db;

function createDBConnection (callback) {

    MongoClient.connect(db_url)
    .then(client => {
       _db = client.db()
       callback()
    })
    .catch(err => {
        throw err
    })
}


function getDB (){
    if(_db){
       return _db;
    }else {
        throw new Error("No DB found")
    }
}

exports.createDBConnection = createDBConnection;
exports.getDB = getDB;