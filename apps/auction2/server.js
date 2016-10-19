import * as routes from './routes'
const express = require('express')

const app = module.exports = express()
app.set('view engine', 'jade')
app.set('views', `${__dirname}/templates`)

app.get('/auction2/:id', routes.index)
