const userModel = require("../models/user.model")

// when create a service -- when you want to change into database
// thrid validation --> check all filed are not balnk

module.exports.createUser = async({username,email,password,role}) => {
    if(!username || !email || !password){
        throw new Error ("All Filed Are Required");
    }

    const user = await userModel.create({username,email,password, role});
      return user;
}

module.exports.updateUser = async ({userId, username, email}) => {
    const updateUser = await userModel.findOneAndUpdate(
        {_id: userId},
        {username, email},
        {new: true}
    ).select("-password")

    if(!updateUser){
        throw new Error("user not fount")
    }

    return updateUser;
}