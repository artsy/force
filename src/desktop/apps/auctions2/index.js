import * as routes from 'desktop/apps/auctions2/routes'
import adminOnly from 'desktop/lib/admin_only'
import express from 'express'

const app = (module.exports = express())

app.set('view engine', 'jade')
app.set('views', `${__dirname}/components`)

app.get('/auctions2', adminOnly, routes.index)
