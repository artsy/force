#
# The home page
#

express = require 'express'
routes = require './routes'
markdown = require '../../components/util/markdown'
{ resize } = require '../../components/resizer'
sd = require('sharify').data

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.locals.resize = resize
app.locals.markdown = markdown
app.get '/', routes.index
