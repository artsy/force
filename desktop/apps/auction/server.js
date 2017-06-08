import * as routes from './routes'
import express from 'express'

const app = module.exports = express()

app.set('view engine', 'jade')
app.engine('jsx', require('express-react-views').createEngine({
  transformViews: false // No need since we're already importing `babel-core/register`
}))

app.set('views', `${__dirname}/templates`)

app.get('/sale/:id', routes.index)
app.get('/sale/:id/confirm-registration', routes.index)

app.get('/auction/:id', routes.index)
app.get('/auction/:id/confirm-registration', routes.redirectLive, routes.index)
