const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') // 載入 method-override
const flash = require('connect-flash')

// dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose')

// Define server related variables
const port = process.env.PORT

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))
// setting body-parser
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
// middleware: res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  if (req.user) { res.locals.user.name = req.user.name === '' ? '我' : req.user.name }
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 將 request 導入路由器
app.use(routes)

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
