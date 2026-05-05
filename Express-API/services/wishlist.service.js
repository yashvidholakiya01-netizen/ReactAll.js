const wishlistModel = require("../models/wishlist.model")

module.exports.AddToWishlist = async ({userId, item}) => {
    let wishlist = await wishlistModel.findOne({userId})
console.log(wishlist)

    if(!wishlist){
      return  wishlist = new wishlistModel({userId, productIds: []})
    }

    wishlist.productIds.push(item)
console.log(wishlist)
    return await wishlist.save();

}