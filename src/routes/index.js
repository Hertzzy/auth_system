const bodyParser = require('body-parser')

const user = require('./userRoute')
const auth = require('./authRoute')
const role = require('./roleRoute')

module.exports = app => {
  app.use(
    bodyParser.json(),
    role,
    user,
    auth,
  )
}
