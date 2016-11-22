express = require 'express'
routes = require './routes'
adminOnly = require '../../lib/middleware/admin_only'
{ crop } = require '../../components/resizer/index'

app = module.exports = express()
app.set 'views', "#{__dirname}"
app.set 'view engine', 'jade'
app.locals.crop = crop

app.get '/eoy-2016', adminOnly, routes.eoy