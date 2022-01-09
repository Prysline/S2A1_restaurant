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
  description: String,
  userId: { // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

// 會在 mongo 中建立名為 restaurant 的 collection
module.exports = mongoose.model('Restaurant', restaurantSchema)
