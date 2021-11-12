// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

// 將網址結構符合字串的 request 導向模組
router.use('/', home)
router.use('/index', home)
router.use('/restaurants', restaurants)

// 匯出路由器
module.exports = router
