express = require 'express'
routes = require './routes'
markdown = require '../../components/util/markdown.coffee'
{ crop } = require '../../components/resizer/index'

app = module.exports = express()
app.set 'views', "#{__dirname}"
app.set 'view engine', 'jade'
app.locals.crop = crop
app.locals.markdown = markdown

app.get '/2016-year-in-art', routes.eoy
app.get '/venice-biennale', (_, res) -> res.redirect '/venice-biennale/toward-venice'
app.get '/venice-biennale/:slug', routes.venice
app.get '/vanity/*', routes.vanity