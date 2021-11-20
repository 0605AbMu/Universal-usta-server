const getetWork = new (require("./db")).DB("getetWork.json");


class gtWork{
    constructor(){
    }
    //get take of user works

    takeAllProcessingWorks(){
        return getetWork.allGetetWork();
    }
    takeOneUserProcessWorkById(userId){
        return getetWork.getUsersWorkById(userId);
    }
    addWorkProcess(userId, workId){
        return getetWork.getWork(userId, workId);
    }

    }
    
    
    module.exports.processWork = new gtWork();
    