const userDB = require("./user").userData;
const workDB = require("./work").workData;
if (userDB.deleteAllData()&&workDB.deleteAllData()){
    console.log("Barcha ma'lumotlar tozalandi!")
} else{
    console.log("Barcha ma'lumotlar to'liq tozalanmadi?. Iltimos tekshirib ko'ring!")
}
