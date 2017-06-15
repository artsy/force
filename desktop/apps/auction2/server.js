import * as routes from './routes'
import adminOnly from 'desktop/lib/admin_only.coffee'
import express from 'express'

const app = module.exports = express.Router()

// app.get('/sale2/:id', adminOnly, routes.index)
// app.get('/sale2/:id/confirm-registration', adminOnly, routes.index)

app.get('/auction2/:id', adminOnly, routes.index)
app.get('/auction2/:id/confirm-registration', routes.redirectLive, adminOnly, routes.index)
