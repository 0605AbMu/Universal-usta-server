const express = require("express");
const app = express();
const fs = require("fs");
const fileUpload = require("express-fileupload");
const path = require("path")
const userDB = require("./user").userData;
const workDB = require("./work").workData;
const processWorkDB = require("./processWork").processWork;
app.use(fileUpload()) ;
app.use(express.static(path.join("data", "images", "userImages")))
app.use(express.static(path.join("data", "images", "workImages")))
app.get("/", (req, res)=>{
    res.send("Hello, I am Universal Usta's server. Your IP address: "+ req.ip)
})

//USER CRUD
app.post("/addUser", (req, res, next)=>{
res.send(userDB.createUser(req.body, req.files.image.data||undefined));
//console.log(req.files)
})

app.post("/updateUser", (req, res)=>{
    if (req.files!=null){
    res.send(userDB.updateUserById(req.body, req.files.image.data)||"Bunday IDga ega foydalanuvchi topilmadi");
    } else{
        res.send(userDB.updateUserById(req.body)||"Bunday IDga ega foydalanuvchi topilmadi");
    }
})

app.post("/readUserById", (req, res)=>{
    let data = userDB.readUserById(req.body.id)
    data!=undefined?res
    .send(data)
    .sendFile(path.resolve(data.imageData||""), (err=>{})):res.send("Bunday IDga ega foydalanuvchi topilmadi")
})

app.post("/readUserByLogin", (req, res)=>{
    res.send(userDB.readUserByLogin(req.body.login)||"Bunday Loginga ega foydalanuvchi topilmadi");
})

app.post("/readUserByPhone", (req, res)=>{
    res.send(userDB.readUserByPhone(req.body.phone)||undefined);
})

app.post("/readUserByPassword", (req, res)=>{
    res.send(userDB.readUserByParol(req.body.password)||"Bunday Parolga ega foydalanuvchi topilmadi");
})

app.post("/readUserByParam", (req, res)=>{
    res.send(userDB.readUserByParam(req.body.login, req.body.password)||"Bunday Parol va Login ga ega foydalanuvchi topilmadi");
})

app.post("/readAllUser", (req, res)=>{
    res.send(userDB.readAllUser()||"Foydalanuvchilar topilmadi");
})

app.post("/deleteUserById", (req, res)=>{
    res.send(userDB.deleteUserById(req.body.id)||"Bunday IDga ega foydalanuvchi topilmadi");
})
// User CRUD operation ended;

//WORK CRUD OPERATION
app.post("/addWork", (req, res, next)=>{
    res.send(workDB.createWork(req.body, req.files.image.data||undefined));
    })
    
    app.post("/updateWork", (req, res)=>{
        if (req.files!=null){
            res.send(workDB.updateWork(req.body, req.files.image.data)||"Bunday IDga ega ish topilmadi");
            } else{
                res.send(workDB.updateWork(req.body)||"Bunday IDga ega ish topilmadi");
            }
        
    })
    
    app.post("/readWorkById", (req, res)=>{
        let data = workDB.readWorkById(req.body.id)
        data!=undefined?res
        .send(data)
        .sendFile(path.resolve(data.imageData||""), (err=>{})):res.send("Bunday IDga ega ish topilmadi")
    })
    app.post("/readAllWork", (req, res)=>{
        res.send(workDB.readAllWork()||"Ishlar topilmadi");
    })

    
    app.post("/deleteWorkById", (req, res)=>{
        res.send(workDB.deleteWorkById(req.body.id)||"Bunday IDga ega ish topilmadi");
    })

    // WORK CRUD Operation ENDED
    app.post("/deleteWorkById", (req, res)=>{
        res.send(workDB.deleteWorkById(req.body.id)||"Bunday IDga ega ish topilmadi");
    })
    // upload image by id
    app.post("/imageById", (req, res)=>{
        
        var filePath = path.join("data", "images", "userImages", req.body.id+".jpg");
        res.download(filePath)

    });


    // Get works by userID and Work ID;
    app.post("/getAllProcessingWorks", (req,res)=>{
        res.send(processWorkDB.takeAllProcessingWorks()||"Jarayondagi ishlar mavjud emas");
    })

    app.post("/getProcessingWorkOfUser", (req,res)=>{
        res.send(processWorkDB.takeOneUserProcessWorkById(req.body.userId)||"Jarayondagi ishlari mavjud emas");
    })
    app.post("/addWorkToProcess", (req,res)=>{
        res.send(processWorkDB.addWorkProcess(req.body.userId, req.body.workId));
    })




    let listener =app.listen(process.env.PORT||4000, ()=>{
     
}).address();

console.log(`host: ${listener.address} port: ${listener.port}`)
