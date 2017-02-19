express = require('express')
setup = require './lib/setup'
module.exports = app = setup express()
app.listen(process.env.PORT, -> process.send? 'listening') if module is require.main
