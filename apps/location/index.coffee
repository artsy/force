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
  'hong-kong': { name: 'Hong Kong', coords: [22.284032, 114.155717] }
  'milan': { name: 'Milan', coords: [45.46323, 9.17878] }
  'sao-paulo': { name: 'São Paulo', coords: [-23.57505, -46.63451] }
  'tokyo': { name: 'Tokyo', coords: [35.66758, 139.78425] }
  'boston': { name: 'Boston', coords: [42.351138, -71.072402] }
  'toronto': { name: 'Toronto', coords: [43.652092, -79.404716] }
  'beijing': { name: 'Beijing', coords: [39.912493, 116.412163] }
  'chicago': { name: 'Chicago', coords: [41.884192, -87.632618] }
  'santa-fe': { name: 'Santa Fe', coords: [35.676886, -105.959873] }
  'shanghai': { name: 'Shanghai', coords: [31.222472, 121.455917] }

handler = (context) ->
  (req, res) ->
    routes.show req, res, context, ([slug, loc] for slug, loc of locations when loc isnt context)

for slug, context of locations
  app.get "/#{slug}", handler(context)
