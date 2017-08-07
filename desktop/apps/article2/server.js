import * as routes from './routes'
import adminOnly from 'desktop/lib/admin_only.coffee'
import express from 'express'

const app = module.exports = express.Router()

app.get('/article2/:slug/amp', adminOnly, routes.ampArticle)
app.get('/article2/:slug', adminOnly, routes.index)
