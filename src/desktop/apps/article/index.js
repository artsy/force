import * as routes from './routes'
import express from 'express'

const app = module.exports = express()

app.set('view engine', 'jade')
app.set('views', `${__dirname}/templates`)

app.get('/article/:slug/amp', routes.amp)
app.get('/article/:slug', routes.index)
app.get('/series/:slug', routes.index)
app.get('/series/:seriesSlug/:slug', routes.index)
app.get('/video/:slug', routes.index)
app.post('/signup/editorial', routes.editorialSignup)
app.get('/post/:id', routes.redirectPost)
app.get('/:id/posts', routes.redirectPost)
