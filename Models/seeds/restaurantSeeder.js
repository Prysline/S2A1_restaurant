const db = require('../../config/mongoose') // 載入 mongoose
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const dataList = require('./restaurant.json')

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
    Promise.all([SeederRegister(1), SeederRegister(2)])
    .then(() => {
      console.log('get seeds done.')
      process.exit()
    })
})

// restaurentListIndex: 餐廳編號陣列
function getSeederFromJSON (userId, restaurentListIndex) {
  return Promise.all(restaurentListIndex.map(id => {
    dataList.results[id - 1].userId = userId
    return Restaurant.create(dataList.results[id - 1])
  })).then(() => console.log(`restaurant ${restaurentListIndex} data created!`))
}

function SeederRegister (id) {
  const name = ''
  const email = `user${id}@example.com`
  const password = '12345678'
  return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.create({ name, email, password: hash }))
    .then(() => {
      console.log(`user: ${email} created!`)
      return User.findOne({ email })
    }).then(user => {
      // user1 -> restaurant id: 1, 2, 3
      // user2 -> restaurant id: 4, 5, 6
      const i = (id - 1) * 3 + 1
      return getSeederFromJSON(user._id, [i, i + 1, i + 2])
    })
}
