// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')
const restaurants = require('./modules/restaurants')
const { authenticator } = require('../middleware/auth')

// 將網址結構符合字串的 request 導向模組
router.use('/users', users)
router.use('/auth', auth)
router.use('/restaurants', authenticator, restaurants)
router.use('/index', authenticator, home)
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router
