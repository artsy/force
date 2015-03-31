jade = require 'jade'
path = require 'path'
fs = require 'fs'
Page = require '../../../models/page'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Future of Art', ->

  it 'includes a link to the WSJ article', ->
    render('future_of_art')(sd: {}, asset: (->), page: new Page()).should
      .containEql "online.wsj.com/articles/carter-cleveland"
