import * as routes from './routes'
import express from 'express'

const app = module.exports = express()

app.set('view engine', 'jade')
app.set('views', `${__dirname}/components/layout`)

app.get('/sale/:id', routes.index)
app.get('/sale/:id/confirm-registration', routes.index)

app.get('/auction/:id', routes.index)
app.get('/auction/:id/confirm-registration', routes.redirectLive, routes.index)
