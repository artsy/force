#
# /partners
#

express = require 'express'
routes  = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/partners', routes.partners
#app.get '/galleries', routes.galleries
#app.get '/institutions', routes.institutions
