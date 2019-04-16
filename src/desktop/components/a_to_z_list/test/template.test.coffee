_ = require 'underscore'
{ AToZ } = require 'artsy-backbone-mixins'
Backbone = require 'backbone'
cheerio = require 'cheerio'
fs = require 'fs'
jade = require 'jade'
path = require 'path'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

class AToZCollectionModel extends Backbone.Model
  alphaSortKey: -> @get 'sortable_id'
  displayName: -> @get 'name'
  href: -> "/#{@get('sortable_id')}"

class AToZCollection extends Backbone.Collection
  _.extend @prototype, AToZ
  model: AToZCollectionModel

describe 'A to Z List Template', ->

  beforeEach ->
    @m1 = new AToZCollectionModel({ sortable_id: "twenty-thirteen", name: "Twenty Thirteen" })
    @m2 = new AToZCollectionModel({ sortable_id: "2014", name: "2014" })
    @m3 = new AToZCollectionModel({ sortable_id: "twenty-fourteen", name: "Twenty Fourteen" })
    @m4 = new AToZCollectionModel({ sortable_id: "fifteen-plus-twenty", name: "Fifteen + Twenty" })
    @m5 = new AToZCollectionModel({ sortable_id: "two-times", name: "Two Times", artworks_count: 0 })
    @m6 = new AToZCollectionModel({ sortable_id: "tim", name: "Tim", artworks_count: 1 })
    @collection = new AToZCollection([ @m1, @m2, @m3, @m4, @m5, @m6 ])

  describe 'template', ->

    it 'renders an A to Z list', ->
      html = render('template')({ aToZGroup: @collection.groupByAlphaWithColumns(3) })
      $ = cheerio.load html
      $('.a-to-z-row').length.should.equal 3

      # only link to 5 due to the 0 artworks count on @m5
      $('.a-to-z-row a').length.should.equal 5

      $('.a-to-z-row-letter').eq(0).text().should.equal '0-9'
      $('.a-to-z-row').eq(0).html().should.containEql @m2.displayName()

      $('.a-to-z-row-letter').eq(1).text().should.equal 'F'
      $('.a-to-z-row').eq(1).html().should.containEql @m4.displayName()

      $('.a-to-z-row-letter').eq(2).text().should.equal 'T'
      $('.a-to-z-row').eq(2).html().should.containEql @m6.displayName()


      # three rows with the specified three cols each
      $('.a-to-z-row .a-to-z-column').length.should.equal 9
