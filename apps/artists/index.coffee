#
# Artists A-Z index
#

express = require 'express'
routes = require './routes'
timeout = require 'connect-timeout'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/artists', timeout('25s'), routes.index
app.get '/artists/:letter', timeout('25s'), routes.letter
