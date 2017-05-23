const express = require('express')

const app = module.exports = express()
app.use('/loyalty', require('@artsy/reaction-force').default.apps.loyalty)
