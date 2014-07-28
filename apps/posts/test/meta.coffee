fs = require 'fs'
jade = require 'jade'
{ fabricate } = require 'antigravity'

describe 'Meta tags', ->

  before ->
    @sd =
      ASSET_PATH: "http://localhost:5000"
      APP_URL: "http://localhost:5000"
    @file = "#{process.cwd()}/apps/posts/meta.jade"
    @html = jade.render fs.readFileSync(@file).toString(),
      sd: @sd

  it 'includes canonical url, twitter card, og tags, and title', ->
    @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
    @html.should.containEql "<link rel=\"canonical\" href=\"http://localhost:5000/posts"
    @html.should.containEql "<meta property=\"og:url\" content=\"http://localhost:5000/posts"
    @html.should.containEql "<meta property=\"og:title\" content=\"Posts | Artsy"
    @html.should.containEql "<meta property=\"og:description\" content=\"Posts are insights on artists and artworks by the Artsy community, including posts by users, galleries and institutions, and the Artsy editorial staff."
