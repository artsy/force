#
# The Shortcut redirects
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.get '/:short', routes.index
