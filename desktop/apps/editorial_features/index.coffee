express = require 'express'
routes = require './routes'
{ crop } = require '../../components/resizer/index'
adminOnly = require '../../lib/admin_only'

app = module.exports = express()
app.set 'views', "#{__dirname}"
app.set 'view engine', 'jade'
app.locals.crop = crop

app.get '/2016-year-in-art', routes.eoy
app.get '/venice-biennale', (_, res) -> res.redirect '/venice-biennale/toward-venice'
app.get '/venice-biennale/:slug', adminOnly, routes.venice
app.get '/vanity/*', routes.vanity