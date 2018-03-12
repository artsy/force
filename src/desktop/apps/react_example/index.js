import * as routes from './routes'
import adminOnly from 'desktop/lib/admin_only.coffee'
import express from 'express'

const app = module.exports = express()

app.set('view engine', 'jade')
app.set('views', `${__dirname}/components`)

app.get('/react-example', adminOnly, routes.index)
