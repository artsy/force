_             = require 'underscore'
jade          = require 'jade'
path          = require 'path'
fs            = require 'fs'
cheerio       = require 'cheerio'
Backbone      = require 'backbone'
{ fabricate } = require 'antigravity'
Genes      = require '../../../collections/genes'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Genes', ->

  before ->
    sd =
      ARTSY_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @genes = new Genes [
      fabricate('gene',
        name: '21st Twenty First'
        id: '21st-twenty-first'
      )
      fabricate('gene',
        name: "Abstract"
        id: 'abstract'
      )
      fabricate('gene',
        name: "UNIX"
        id: 'unix'
      )
    ]
    @aToZGroup = @genes.groupByAlphaWithColumns(3)
    @html = render('template')({
      sd          : sd
      aToZGroup   : @aToZGroup
      geneCount   : @genes.length
    })

  describe 'template', ->

    it 'renders an A to Z list of gallery genes with links to the gene', ->
      $ = cheerio.load @html
      @genes.each (gene) ->
        markup = $(".all-genes-list").html()
        markup.should.include gene.get 'name'
        markup.should.include "/gene/#{gene.get('id')}"
      $(".a-to-z-row-letter").eq(0).text().should.equal @aToZGroup[0].letter
      $(".a-to-z-row-letter").eq(1).text().should.equal @aToZGroup[1].letter
      $(".a-to-z-row-letter").eq(2).text().should.equal @aToZGroup[2].letter

    it 'includes a page title', ->
      $ = cheerio.load @html
      $('.all-genes-title').text().should.equal "All Genes"
