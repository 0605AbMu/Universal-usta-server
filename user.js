const userDB = new (require("./db")).DB("userData.json");

class users{
constructor(){

}

//Create
createUser(data, imageData){
if (imageData==undefined){
    return    userDB.writeObject(data)
} else{
    return userDB.writeObject(data, imageData, "userImages")
}

}

//Read
readUserById(id){
    return userDB.readObjectById(id);
}

readUserByLogin(Login){
    return userDB.readObjectByLogin(Login)
}

readUserByParol(Parol){
    return userDB.readObjectByParol(Parol);
}

readUserByParam(Login, Parol){
    return userDB.readObjectByParam(Login, Parol);
}
readAllUser(){
    return userDB.readFull();
}
//Update
updateUserById(data, imageData){
    if (imageData!=undefined){
        return userDB.updateObjectById(data, imageData, "userImages");
    } else{
        return userDB.updateObjectById(data);
    }
    
}

//Delete
deleteUserById(Id){   
    return userDB.deleteObjectById(Id, "userImages");
}


deleteAllData(){
return userDB.deleteAllData(require("path").join("data", "userData.json"),require("path").join("data", "images", "userImages") )
}

}


module.exports.userData = new users();
