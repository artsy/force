import * as routes from './routes'
const express = require('express')

const app = module.exports = express()
app.set('view engine', 'jade')
app.set('views', `${__dirname}/templates`)

app.get('/sale/:id', routes.index)
app.get('/sale/:id/confirm-registration', routes.index)

app.get('/auction/:id', routes.index)
app.get('/auction/:id/confirm-registration', routes.redirectLive, routes.index)
