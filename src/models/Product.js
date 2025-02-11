const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
//   handle: String,
//   title: String,
//   body: String,
//   vendor: String,
//   type: String,
//   tags: String,
//   options: [
//     {
//       name: String,
//       value: String,
//     },
//   ],
//   variant: {
//     sku: String,
//     grams: Number,
//     inventoryTracker: String,
//     inventoryQty: Number,
//     inventoryPolicy: String,
//     fulfillmentService: String,
//     price: Number,
//     compareAtPrice: Number,
//   },
//   imageSrc: String,
});

module.exports = mongoose.model("Product", productSchema);
