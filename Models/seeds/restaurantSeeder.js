const db = require('../../config/mongoose') // 載入 mongoose
const Restaurant = require('../database')
const dataList = require('./restaurant.json')

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
