"use strict"
const fs = require("fs");
const jfs = require("jsonfile");
const nanoid = require("nanoid");
const path = require("path")
function getId(){
    return nanoid.nanoid(20);
}

class DB{
 constructor(fileName){
     this.fileName = path.join("data", fileName);
     if (!fs.existsSync("data")){
         fs.mkdirSync("data");
         fs.mkdirSync(path.join("data", "images"));
     }
     if (!fs.existsSync(this.fileName)){
        
        
        jfs.writeFileSync(this.fileName, [], {spaces: " ", flag:"wx"})            
     }
     
 }
 readFull(){
     return jfs.readFileSync(this.fileName);
 }

 writeObject(data, imageData, rootDir){
    data.id = getId();
  if (imageData!=undefined){
          try {
            rootDir!=undefined?fs.existsSync(path.join("data", "images", rootDir))?"":fs.mkdirSync(path.join("data", "images", rootDir)):"";          
            fs.writeFileSync(path.join("data", "images", rootDir||"", data.id+".jpg"), imageData);
            data.imageData = path.join("data", "images", rootDir||"", data.id+".jpg");

        } catch (error) {
            data.imageData = undefined;
        }
        
  }

    
try {
let r = this.readFull();
r.push(data);
    jfs.writeFileSync(this.fileName, r , {spaces: " "});
    
    return data;
    
} catch (error) {
 return undefined;   
}
}

// Id Bo'yicha olish
readObjectById(Id){
    try {
        return jfs.readFileSync(this.fileName)
        .filter(({id})=>id==Id)[0];
    } catch (error) {
        return undefined;
    }
}
// Login bo'yicha olish
readObjectByLogin(Login){
    try {
        return jfs.readFileSync(this.fileName)
        .filter(({login})=>login==Login)[0];
    } catch (error) {
        return undefined;
    }
}

// Parol bo'yicha olish

readObjectByParol(Parol){
    try {
        return jfs.readFileSync(this.fileName)
        .filter(({parol})=>parol==Parol)[0];
    } catch (error) {
        return undefined;
    }
}

// Login va Parol bo'yicha olish
readObjectByParam(Login, Parol){
    try {
        return jfs.readFileSync(this.fileName)
        .filter(({login, parol})=>login==Login&&parol==Parol)[0];
    } catch (error) {
        return undefined;
    }
}

updateObjectById(data,  imageData, rootDir){
    try {
        let r = this.readFull();
        // data.id = Id;
        if (imageData!=undefined){
            try {
                fs.writeFileSync(path.join("data", "images", rootDir||"", data.id+".jpg"), imageData);
                data.imageData = path.join("data", "images", rootDir||"", data.id+".jpg");    
            } catch (error) {
                
            }
            
        }
        r[r.findIndex(({id})=>id==data.id)] = data;
        jfs.writeFileSync(this.fileName, r, {spaces: " "});
        
        return data;
    
    } catch (error) {
        return undefined;
    }
    
    }
    



deleteObjectById(Id, rootDir){
try {
    let r = this.readFull();
    r.splice(r.findIndex(({id})=>id==Id), 1);
    jfs.writeFileSync(this.fileName, r, {spaces: " "});
    if (rootDir!=undefined){
       try {
        fs.unlinkSync(path.join("data", "images", rootDir||"", Id+".jpg"));   
       } catch (error) {
           
       }
        
    }
    return "O'chirildi";

} catch (error) {
    return undefined;
}

}

deleteAllData(dataPath, imagesPath){
   try {
                
fs.renameSync(dataPath, path.join("data", "old data of "+path.parse(dataPath).name+" at ("+ (new Date().toDateString()+")("+new Date().getSeconds()+").json")))
                
        if (imagesPath!=undefined){
            fs.readdirSync(imagesPath).map(e=>{ fs.unlinkSync(path.join(imagesPath,e))});
        }

        return true;
    } catch (error) {
        return false;
    }
}


}




module.exports.DB = DB;

