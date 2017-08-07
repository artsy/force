import * as routes from './routes'
import adminOnly from 'desktop/lib/admin_only.coffee'
import express from 'express'

const app = module.exports = express.Router()
// import { resize, crop } from '../../components/resizer'
// { toSentence } = require 'underscore.string'
// markdown = require '../../components/util/markdown'

// app.set('views', `${__dirname}/templates`)
// app.set('view engine', 'jade')
// app.locals.resize = resize
// app.locals.crop = crop
// app.locals.toSentence = toSentence
// app.locals.markdown = markdown
app.get('/article2/:slug/amp', adminOnly, routes.ampArticle)
app.get('/article2/:slug', adminOnly, routes.index)
