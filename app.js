const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // 載入 mongoose

const Restaurant = require('./Models/database.js')

// Define server related variables
const port = 3000

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
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))

// Route
app.get('/', (req, res) => {
  renderIndexFromModel(res,Restaurant)
})
app.get('/index', (req, res) => {
  renderIndexFromModel(res,Restaurant)
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  Restaurant.find()
  .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  .then(restaurants => {
    restaurants = restaurants.filter((item) => {
      return (
        item.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
        item.category.toLowerCase().includes(keyword.toLowerCase())
      )
    })
    if (restaurants.length > 0) {
      res.render('index', { restaurants, keyword })
    } else {
      const searching = 'searching'
      res.render('index', { keyword, searching })
    }
  })
  .catch(error => console.error(error))
})

})

app.get('/restaurants/:id', (req, res) => {
  Restaurant.find()
  .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  .then(restaurants => {
    res.render('show', { item: restaurants[req.params.id - 1] })
  })
  .catch(error => console.error(error))
})

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})

function renderIndexFromModel(res, model) {
  model.find()
  .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  .then(restaurants => res.render('index', { restaurants }))
  .catch(error => console.error(error))
}