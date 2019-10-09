pug = require 'pug'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'

render = ->
  filename = path.resolve __dirname, "../index.pug"
  pug.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Error Handler Template', ->
  beforeEach ->
    @html = render()(
      sd: {
        CURRENT_USER: { type: 'Admin' }
      }
      asset: (x) -> x
      message: 'This is the error message'
      detail: 'This is the error detail'
      code: 400
    )

    @outputtedHtml = cheerio.load(@html).html()

  it 'displays all the relevant information', ->
    @outputtedHtml.should.containEql 'This is the error message'
    @outputtedHtml.should.containEql 'This is the error detail'
    @outputtedHtml.should.containEql '400'
