import * as routes from './routes'
import express from 'express'
import reactRenderer from 'express-react-views'

const app = module.exports = express()

app.set('view engine', 'jade')
app.engine('jsx', reactRenderer.createEngine({ transformViews: false }))

app.set('views', `${__dirname}/templates`)

app.get('/sale/:id', routes.index)
app.get('/sale/:id/confirm-registration', routes.index)

app.get('/auction/:id', routes.index)
app.get('/auction/:id/confirm-registration', routes.redirectLive, routes.index)
