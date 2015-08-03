#
# Editorial Organizaiton page like Artsy Editorial. Looks like a user page
# for now until it maybe gets first class design.
#

express = require 'express'
routes = require './routes'
{ crop, fill, resize } = require '../../components/resizer'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'
app.locals.resize = resize
app.locals.crop = crop

app.get '/:id', routes.index
