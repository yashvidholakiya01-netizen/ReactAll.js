const express = require("express");
const jwt = require("jsonwebtoken");
const usemodel = require("./model/user.model");
const bcrypt = require("bcrypt");

const app = express();
// user ni req server pase jai tyare server ne, user kon se te khabar hoti nathi, mate darek req
// sathe user ne authorize karvo joy
// user -req --> server
//ex. login req --> server ne khabar nathi hoti user kon se

//cookie parser ==> save token into brower strorage

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/hash", (req,res) => {
   let password = "abc@123"
//    bcrypt.hash("password","number", (err, hash) => {

//    })
 bcrypt.hash(password,10,(err,hash) => {
    console.log(hash)
    res.send(hash);
 })
})
// login --password compare


// data --> convert jwt --> save cookie
app.get("/jwt", (req, res) => {
  let data = { username: "test", email: "test@gmail.com", role: "admin" };
  let token = jwt.sign(data, "aabbccdd")
  console.log(token,"token")

  res.cookie("token", token)
  res.send("go to cookie")
});

//signup
app.get("/signup", async(req,res) => {
 let createUser = await usemodel.create({
    username: "test_user",
    email: "test@gmail.com",
    password: "test123"
   });
   res.send(createUser)
})

app.listen(3000, () => {
  console.log("server is running");
});
