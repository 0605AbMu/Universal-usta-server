const workDB = new (require("./db")).DB("workData.json");

class works{
constructor(){

}

//Create
createWork(data, imageData){
if (imageData==undefined){
    return    workDB.writeObject(data)
} else{
    return workDB.writeObject(data, imageData, "workImages")
}

}

//Read
readWorkById(id){
    return workDB.readObjectById(id);
}
readAllWork(){
    return workDB.readFull();
}
//Update
updateWork(data, imageData){
    if (imageData!=undefined){
        return workDB.updateObjectById(data, imageData, "workImages");
    } else{
        return workDB.updateObjectById(data);
    }
    
}

//Delete
deleteWorkById(Id){   
    return workDB.deleteObjectById(Id, "workImages");
}


deleteAllData(){
return workDB.deleteAllData(require("path").join("data", "workData.json"),require("path").join("data", "images", "workImages") )
}

}


module.exports.workData = new works();
