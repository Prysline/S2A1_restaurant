// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Restaurant = require('../../Models/database')

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  Restaurant.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => {
      const item = getItemFromListById(restaurants, id)
      res.render('show', { item })
    })
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  Restaurant.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => {
      // 列出資料庫中所有出現過的餐廳類別
      const category = [...new Set(restaurants.map((item) => item.category))]
      const item = getItemFromListById(restaurants, id)
      res.render('edit', { item, category })
    })
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(item => item.remove())
    .then(() => res.redirect('/?submit=delete'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router

// function
function getItemFromListById (list, id) {
  return list.find(item => item.id === id)
}
