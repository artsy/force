#
# Landing pages for traffic-ed locations and regions
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

locations =
  'new-york': { name: 'New York', coords: [40.74729, -73.98188] }
  'london': { name: 'London', coords: [51.51026, -0.11908] }
  'los-angeles': { name: 'Los Angeles', coords: [33.97835, -118.23516] }
  'paris': { name: 'Paris', coords: [48.85949, 2.32881] }
  'berlin': { name: 'Berlin', coords: [52.51849, 13.39753] }
  'miami': { name: 'Miami', coords: [25.78779, -80.19774] }
  'san-francisco': { name: 'San Francisco', coords: [37.76661, -122.41408] }
  'tokyo': { name: 'Tokyo', coords: [35.66758, 139.78425] }
  'sao-paulo': { name: 'São Paulo', coords: [-23.57505, -46.63451] }
  'milan': { name: 'Milan', coords: [45.46323, 9.17878] }

handler = (context) ->
  (req, res) ->
    routes.show req, res, context

for slug, context of locations
  app.get "/#{slug}", handler(context)
