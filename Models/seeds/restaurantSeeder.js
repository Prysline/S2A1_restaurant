const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('../database')
const dataList = require('./restaurant.json')

// setting mongoose server
mongoose.connect('mongodb://localhost/restaurant-list') // 設定連線到 mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  getSeederFromJSON(dataList.results)
  console.log('get seeds done')
})

function getSeederFromJSON (json) {
  json.forEach(item => {
    Restaurant.create(item)
  })
}
