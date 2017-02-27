express = require('express')
module.exports = app = express()
if module is require.main
  require('./lib/setup') app
  app.listen(process.env.PORT, -> process.send? 'listening')
