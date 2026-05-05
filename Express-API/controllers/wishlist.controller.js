const wishlistService = require("../services/wishlist.service");

module.exports.AddToWishlist = async(req,res) =>{
    try {
       const userId = req.user.id;
       const {item} = req.body;
       console.log(item)
       const wishlist = await wishlistService.AddToWishlist({userId, item});

        if(!wishlist) return res.status(404).json({msg: "product not found! "})

       return res.status(200).json({ msg: "add item into wishlist", wishlist });
     } catch (error) {
       return res.status(500).json({ msg: error.message });
     }
} 