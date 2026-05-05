const productModel = require("../models/product.model");

// create product
module.exports.createProduct = async ({
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
}) => {
  if (
    !name ||
    !description ||
    !stock ||
    !price ||
    !sku ||
    !images ||
    !brand ||
    !category
  ) {
    throw new Error("All Feild Are Required !!");
  }

  let product = await productModel.create({
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

  return product;
};

module.exports.singleProduct = async (id) => {
  const product = await productModel.findOne({ _id: id });

  return product;
};

module.exports.AllProduct = async () => {
  return await productModel.find();
};

module.exports.updateProduct = async ({
  productId,
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
}) => {
  const updateProduct = productModel.findOneAndUpdate(
    { _id: productId },
    {
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
    },
    { new: true },
  );

  if(!updateProduct){
    throw new Error("product not found")
  }
  return updateProduct;
};

module.exports.deleteProduct = async (id) => {
  return await productModel.findOneAndDelete({_id: id});
  
}