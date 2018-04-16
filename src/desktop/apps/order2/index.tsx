import * as routes from 'desktop/apps/order2/routes'
import adminOnly from 'desktop/lib/admin_only.coffee'
import express from 'express'

const app = (module.exports = express())
app.set('view engine', 'jade')
app.set('views', `${__dirname}/Components`)

app.get('/order2', adminOnly, routes.index)
