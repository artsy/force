#
# Artists A-Z index
#

express   = require 'express'
routes    = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/artists', routes.index
app.get '/artists/:letter', routes.letter
