const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

const dataList = require('./restaurant.json')

// Define server related variables
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))

// Route
app.get('/', (req, res) => {
  res.render('index', { restaurants: dataList.results })
})
app.get('/index', (req, res) => {
  res.render('index', { restaurants: dataList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const restaurants = dataList.results.filter((item) => {
    return (
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
      item.category.toLowerCase().includes(keyword.toLowerCase())
    )
  })
  if (restaurants.length > 0) {
    res.render('index', { restaurants: restaurants, keyword: keyword })
  } else {
    res.render('index', { keyword: keyword })
  }
})

app.get('/restaurants/:id', (req, res) => {
  res.render('show', { item: dataList.results[req.params.id - 1] })
})

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
