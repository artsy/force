jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
Order           = require '../../../models/order'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe "Order Templates", ->

  beforeEach ->
    @order = new Order(fabricate 'order')
    @template = render('index')(
      sd:
        ASSET_PATH: 'localhost:3000'
      order: @order
    )

  it "renders the order form", ->
    @template.should.include @order.get('total')
    @template.should.include @order.get('line_items')[0].partner_location.city
