import * as routes from 'desktop/apps/auctions2/routes'
import adminOnly from 'desktop/lib/admin_only.coffee'
import express from 'express'

const app = module.exports = express.Router()

app.get('/auctions2', adminOnly, routes.index)
app.get('/auctions2/reminders', adminOnly, routes.reminders)
app.get('/auction', adminOnly, routes.redirectAuction)
