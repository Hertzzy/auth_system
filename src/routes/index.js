const bodyParser = require('body-parser');

const user = require('./userRoute');
const auth = require('./authRoute');
const doc = require('./docRoute');

module.exports = app => {
  app.use(bodyParser.json(), user, auth, doc);
};
