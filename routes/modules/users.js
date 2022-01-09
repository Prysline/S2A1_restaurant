// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const User = require('../../Models/user')

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', (req, res) => {
})
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists.')
      res.render('register', { name, email, password, confirmPassword })
    } else {
      return User.create({ name, email, password, confirmPassword })
        .then(() => res.redirect('/users/login'))
        .catch(err => console.log(err))
    }
  })
})

// 匯出路由模組
module.exports = router
