fs = require 'fs'
path = require 'path'
jade = require 'jade'
{ fabricate } = require '@artsy/antigravity'

describe 'Meta tags', ->
  describe 'index', ->
    before ->
      @sd = APP_URL: 'http://localhost:5000'
      @file = "#{path.resolve __dirname, '../'}/templates/meta.jade"
      @html = jade.render fs.readFileSync(@file).toString(), sd: @sd, asset: ((u) -> u)

    it 'includes canonical url, twitter card, og tags, title, description', ->
      @html.should.containEql '<title>Art Gallery Shows and Museum Exhibitions | Artsy</title>'
      @html.should.containEql '<meta property="og:title" content="Art Gallery Shows and Museum Exhibitions | Artsy"/>'
      @html.should.containEql '<meta name="description" content="Explore Artsy\'s comprehensive listing of current gallery shows and museum exhibitions from around the world."/>'
      @html.should.containEql '<meta property="og:description" content="Explore Artsy\'s comprehensive listing of current gallery shows and museum exhibitions from around the world."/>'
      @html.should.containEql '<meta property="twitter:description" content="Explore Artsy\'s comprehensive listing of current gallery shows and museum exhibitions from around the world."/>'
      @html.should.containEql '<link rel="canonical" href="http://localhost:5000/shows"/>'
      @html.should.containEql '<meta property="og:url" content="http://localhost:5000/shows"/>'
      @html.should.containEql '<meta property="og:image" content="/images/og_image.jpg"/>'
      @html.should.containEql '<meta property="og:type" content="website"/>'
      @html.should.containEql '<meta property="twitter:card" content="summary"/>'

  describe 'city', ->
    before ->
      @sd = APP_URL: 'http://localhost:5000'
      @file = "#{path.resolve __dirname, '../'}/templates/meta.jade"
      @html = jade.render fs.readFileSync(@file).toString(), asset: ((u) -> u), sd: @sd, city: name: 'Cool Place'

    it 'includes canonical url, twitter card, og tags, title, description', ->
      @html.should.containEql '<title>Cool Place Art Gallery Shows and Museum Exhibitions | Artsy</title>'
      @html.should.containEql '<meta property="og:title" content="Cool Place Art Gallery Shows and Museum Exhibitions | Artsy"/>'
      @html.should.containEql '<meta name="description" content="Explore shows in Cool Place on Artsy."/>'
      @html.should.containEql '<meta property="og:description" content="Explore shows in Cool Place on Artsy."/>'
      @html.should.containEql '<meta property="twitter:description" content="Explore shows in Cool Place on Artsy."/>'
      @html.should.containEql '<link rel="canonical" href="http://localhost:5000/shows"/>'
      @html.should.containEql '<meta property="og:url" content="http://localhost:5000/shows"/>'
      @html.should.containEql '<meta property="og:image" content="/images/og_image.jpg"/>'
      @html.should.containEql '<meta property="og:type" content="website"/>'
      @html.should.containEql '<meta property="twitter:card" content="summary"/>'
      @html.should.containEql '<meta name="fragment" content="!"/>'
