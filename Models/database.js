const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: String,
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: String,
  phone: String,
  google_map: String,
  rating: {
    type: Number,
    required: true
  },
  description: String
})

// 會在 mongo 中建立名為 restaurant 的 collection
module.exports = mongoose.model('Restaurant', restaurantSchema)
