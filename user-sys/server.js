const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const useModel = require("./model/user.model");
const postModel = require("./model/post.model");
const userModel = require("./model/user.model");
const path = require("path");
const upload = require("./config/multer");
const morgan = require("morgan");

//img folder --> img --> aa.jpg (laptop)
// my img folder --> img --> aa.jpg (mobile)

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("index")
})

app.get("/signup", (req,res) => {
    res.render("signup")
})

app.get("/profile", auth,async(req,res) => {
  let user = await userModel.findOne({email:req.user.email}).populate("posts")

    res.render("profile",{user})
})

app.get("/post",auth ,(req,res) => {
  res.render("post")
})

app.post("/post",auth, upload.single("imgurl"), async(req,res) => {
  let user = await userModel.findOne({email:req.user.email})

  let {title, description} = req.body;
console.log(req.file);
 let creatpost = await postModel.create({
    userId: user._id,
    title,
    description,
    imgurl:req.file.filename,
  });
   //add(push) posts into user data
 user.posts.push(creatpost)
 await user.save();

 res.redirect("/profile")
})

app.get("/editprofile", auth,async (req,res) => {
 const user = await userModel.findOne({email:req.user.email})
 res.render("editprofile",{user})
})

app.post("/create", (req,res) => {
  let {fullname,username, email,password,phone,image} = req.body;
  bcrypt.hash(password,10,async (err,hash) => {
   try {
     await userModel.create({
       fullname,
        username,
        email,
        phone,
        password: hash,
        image,
    }) 
   } catch (err) {
    res.send(err);
   }  
  })
    res.redirect("/");
})

app.post("/login", async(req,res) => {
  let {email,password} = req.body;
  const user = await useModel.findOne({email:email})
  if (!user) {
     res.send("something went wrong - email")
  } else {
    bcrypt.compare(password, user.password,(err,r) => {
      if (r) {
        let token = jwt.sign({email:user.email}, "aabbccdd")
        
        res.cookie("token", token)
        res.redirect("/profile")
      } else {
          res.send("something went wrong")
      }
   })
  }
})

app.get("/logout", (req,res) => {
  res.clearCookie()
  res.redirect("/")
})
app.post("/edit", auth,async(req,res) => {
  let {fullname,username,email,phone,image} = req.body;

 await userModel.findOneAndUpdate({email: req.user.email},{fullname,username,email,phone,image},{new:true})
 res.redirect("profile")
})
//middleware functions
function auth (req,res,next) {
  let token = req.cookies.token
 if(!token){
  res.send("access denied!")
 }
 try {
  let  verified = jwt.verify(token, "aabbccdd")
   req.user = verified;
  next();
 } catch (error) {
  console.log("invaild token")
 }
}
app.listen(3000, () => {
  console.log("server is running");
});
