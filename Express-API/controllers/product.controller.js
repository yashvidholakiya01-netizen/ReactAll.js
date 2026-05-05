const productService = require("../services/product.service");
const productModel = require("../models/product.model");

module.exports.createProduct = async (req, res) => {
  const {
    name,
    description,
    stock,
    price,
    discount,
    isNewproduct,
    sku,
    images,
    brand,
    category,
  } = req.body;

  const isExist = await productModel.findOne({ sku: sku });

  if (isExist) {
    return res.status(400).json({ message: "Product Already Registerd" });
  }

  const product = await productService.createProduct({
    name,
    description,
    stock,
    price,
    discount,
    isNewproduct,
    sku,
    images,
    brand,
    category,
  });

  return res.status(200).json({ msg: "Product Added Successfully", product });
};

module.exports.singleProduct = async (req, res) => {
  try {
    const product = await productService.singleProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }

    return res.status(200).json({ msg: "product found", product });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

//all product

module.exports.allProduct = async (req, res) => {
  try {
    const product = await productService.AllProduct();

    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }

    return res.status(200).json({ msg: "fetch all product", product });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

module.exports.updateProduct = async (req, res) => {
  const productId = req.params.id;

  const {
    name,
    description,
    stock,
    price,
    discount,
    isNewproduct,
    sku,
    images,
    brand,
    category,
  } = req.body;

  const updateProduct = await productService.updateProduct({ productId,
    name,
    description,
    stock,
    price,
    discount,
    isNewproduct,
    sku,
    images,
    brand,
    category,
  });

  return res
    .status(200)
    .json({ msg: "user update successfully", updateProduct });
};

module.exports.deleteProduct = async(req,res) => {
  try {
    const productId = req.params.id;

    const deleteProduct = await productService.deleteProduct(productId);

    if(!deleteProduct){
      return res.status(404).json({msg: "product not found"})
    }
      return res.status(200).json({msg: "product deleted"})
  } catch (error) {
    return res
    .status(500)
    .json({ msg: error.message });
  }

  
}
