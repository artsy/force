express = require('express')
module.exports = app = express()
app.listen(process.env.PORT, -> process.send? 'listening') if module is require.main
