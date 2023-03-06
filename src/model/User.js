const {getDB} = require("../util/database")


class User {

  constructor(name, email, password, apikey){

    this.name = name;
    this.email = email;
    this.password = password;
    this.apikey = apikey

  }

  save(){
    const db = getDB()
    return db.collection("users").insertOne(this)
  }

  static getUser(email){
    const db = getDB()
    return db.collection("users").findOne({"email": email})
  }

  static checkApikey(apikey){
    const db = getDB()
    return db.collection("users").findOne({"apikey": apikey})
  }
}


module.exports = User;