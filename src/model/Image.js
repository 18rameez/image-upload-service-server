const {getDB} = require("../util/database")

class Image {

    constructor(userId, name, size, filePath, uploaded_date){
       this.userId = userId
       this.name = name;
       this.size = size;
       this.filePath = filePath;
       this.uploaded_date = uploaded_date;
    }

    save(){
        const db = getDB()
        return db.collection("images").insertOne(this)
    }

    static getAll(userId){
        const db = getDB()
        return db.collection("images").find({userId: userId}).toArray()
    }
}

module.exports = Image;