// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Restaurant = require('../../Models/database')

// 定義首頁路由
router.get('/', (req, res) => {
  const submit = req.query.submit
  const sort = req.query.sort
  const listSort = getSortObj(sort)
  Restaurant.find()
    .lean()
    .sort(listSort)
    .then(restaurants => res.render('index', { restaurants, submit, sort }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const sort = req.query.sort
  const listSort = getSortObj(sort)
  Restaurant.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort(listSort)
    .then(restaurants => {
      restaurants = restaurants.filter((item) => {
        return (
          item.name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
          item.category.toLowerCase().includes(keyword.toLowerCase())
        )
      })
      if (restaurants.length > 0) {
        res.render('index', { restaurants, keyword, sort })
      } else {
        const searching = 'searching'
        res.render('index', { keyword, searching })
      }
    })
    .catch(error => console.error(error))
})

router.get('/new', (req, res) => {
  Restaurant.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort('id')
    .then(restaurants => {
      // 列出資料庫中所有出現過的餐廳類別
      const category = [...new Set(restaurants.map((item) => item.category))]
      res.render('new', { category })
    })
    .catch(error => console.error(error))
})
router.post('/new', (req, res) => {
  const body = req.body
  Restaurant.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => {
      const length = Object.keys(restaurants).length - 1
      body.id = restaurants[length].id + 1
      Restaurant.create(body)
        .then(() => {
          res.redirect('/?submit=new')
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router

// Function
function getSortObj (sortRule) {
  switch (sortRule) {
    case 'early':
      return '_id'
    case 'latest':
      return '-_id'
    case 'nameAtoZ':
      return 'name'
    case 'nameZtoA':
      return '-name'
    case 'category':
      return 'category'
    default:
      return '_id'
  }
}
