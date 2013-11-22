#
# /login, /sign_up and /forgot
# Render the homepage but force open the appropriate modals
#

express   = require 'express'
routes    = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/log_in', routes.index
app.get '/sign_up', routes.index
app.get '/forgot', routes.index
