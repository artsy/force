import express from 'express'
import * as routes from './routes'
import { crop, resize } from 'desktop/components/resizer/index.coffee'
import { toSentence } from 'underscore.string'
import { data as sd } from 'sharify'
import adminOnly from 'desktop/lib/admin_only.coffee'

const app = (module.exports = express())
app.set('view engine', 'jade')
app.set('views', `${__dirname}/templates`)
app.locals.resize = resize
app.locals.crop = crop
app.locals.toSentence = toSentence

app.get('/posts', routes.redirectMagazine)
app.get('/magazine', routes.redirectMagazine)
app.get('/articles', routes.articles)
app.get('/news', adminOnly, routes.news)
app.get(sd.TEAM_BLOGS, routes.teamChannel)
app.get('/venice-biennale-2015', routes.section)
app.get('/gallery-insights/opt-in', (_, res) => {
  res.redirect('/gallery-insights')
})
