import 'babel-core/register'
import express from 'express'
import * as routes from './routes'
import adminOnly from 'desktop/lib/admin_only.coffee'

const app = module.exports = express()

app.set('view engine', 'jade')
app.set('views', `${__dirname}/components`)

app.get('/categories3', adminOnly, routes.index)
