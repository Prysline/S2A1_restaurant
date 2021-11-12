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
// setting body-parser
app.use(express.urlencoded({ extended: true }))

// Route
app.get('/', (req, res) => {
  const query = req.query.submit
  Restaurant.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants, query }))
    .catch(error => console.error(error))
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

app.get('/new', (req, res) => {
  Restaurant.find()
  .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  .then(restaurants => {
    // 列出資料庫中所有出現過的餐廳類別
    const category = showAllLabelContentFromList(restaurants, 'category')
    res.render('new', { category })
  })
  .catch(error => console.error(error))
})

app.post('/new', (req, res) => {
  let body = req.body
  Restaurant.find()
  .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  .then(restaurants => {
    body.id = Object.keys(restaurants).length + 1
    Restaurant.create(body)
    .then(()=> {
      res.redirect('/')
    })
    .catch(error => console.error(error))
  })
  .catch(error => console.error(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = Number(req.params.id)
  Restaurant.find()
  .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  .then(restaurants => {
    const item = getItemFromListById (restaurants, id)
    res.render('show', { item })
  })
  .catch(error => console.error(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  Restaurant.find()
  .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  .then(restaurants => {
    const category = showAllLabelContentFromList(restaurants, 'category')
    const item = getItemFromListById (restaurants, id)
    res.render('edit', { item, category })
  })
  .catch(error => console.error(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const body = req.body
  return Restaurant.findById(id)
    .then(item => {
      // check content & save
      Object.keys(body).forEach(key => {
        if (typeof (item[key]) === 'number') {
          item[key] = Number(body[key])
        } else {
          item[key] = body[key]
        }
      })
      return item.save()
    })
    .then(() => res.redirect('/?submit=edit'))
    .catch(error => console.error(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
  .then(todo => todo.remove())
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})

function showAllLabelContentFromList (list, label) {
  return [...new Set(list.map((item) => item[label]))]
}

function getItemFromListById (list, id) {
  return list.find(item => item.id === id)
}