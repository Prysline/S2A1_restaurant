const db = require('../../config/mongoose') // 載入 mongoose
const bcrypt = require('bcryptjs')
const Restaurant = require('../database')
const User = require('../user')
const dataList = require('./restaurant.json')

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  SeederRegister(1)
  SeederRegister(2)
  console.log('get seeds done')
})

// restaurentListIndex: 餐廳編號陣列
function getSeederFromJSON (userId, restaurentListIndex) {
  restaurentListIndex.forEach(id => {
    dataList.results[id - 1].userId = userId
    Restaurant.create(dataList.results[id - 1])
  })
}

function SeederRegister (id) {
  const name = ''
  const email = `user${id}@example.com`
  const password = '12345678'
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.create({ name, email, password: hash }))
    .then(() => {
      User.findOne({ email }).then(user => {
        const i = (id - 1) * 3 + 1
        getSeederFromJSON(user._id, [i, i + 1, i + 2])
      })
    })
    .catch(err => console.log(err))
}
