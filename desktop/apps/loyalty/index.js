const express = require('express')

const app = module.exports = express()
app.use('/loyalty', require('reaction-force').default.loyalty)