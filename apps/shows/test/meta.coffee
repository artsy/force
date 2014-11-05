fs = require 'graceful-fs'
jade = require 'jade'
{ fabricate } = require 'antigravity'

describe 'Meta tags', ->
  describe 'index', ->
    before ->
      @sd = ASSET_PATH: 'http://localhost:5000', APP_URL: 'http://localhost:5000'
      @file = "#{process.cwd()}/apps/shows/templates/meta.jade"
      @html = jade.render fs.readFileSync(@file).toString(), sd: @sd

    it 'includes canonical url, twitter card, og tags, title, description', ->
      @html.should.containEql '<title>Art Gallery Shows and Museum Exhibitions | Artsy</title>'
      @html.should.containEql '<meta property="og:title" content="Art Gallery Shows and Museum Exhibitions | Artsy"/>'
      @html.should.containEql '<meta name="description" content="Explore all shows on Artsy."/>'
      @html.should.containEql '<meta property="og:description" content="Explore all shows on Artsy."/>'
      @html.should.containEql '<meta property="twitter:description" content="Explore all shows on Artsy."/>'
      @html.should.containEql '<link rel="canonical" href="http://localhost:5000/shows"/>'
      @html.should.containEql '<meta property="og:url" content="http://localhost:5000/shows"/>'
      @html.should.containEql '<meta property="og:image" content="http://localhost:5000/og_image.jpg"/>'
      @html.should.containEql '<meta property="og:type" content="website"/>'
      @html.should.containEql '<meta property="twitter:card" content="summary"/>'

  describe 'city', ->
    before ->
      @sd = ASSET_PATH: 'http://localhost:5000', APP_URL: 'http://localhost:5000'
      @file = "#{process.cwd()}/apps/shows/templates/meta.jade"
      @html = jade.render fs.readFileSync(@file).toString(), sd: @sd, city: name: 'Cool Place'

    it 'includes canonical url, twitter card, og tags, title, description', ->
      @html.should.containEql '<title>Cool Place Art Gallery Shows and Museum Exhibitions | Artsy</title>'
      @html.should.containEql '<meta property="og:title" content="Cool Place Art Gallery Shows and Museum Exhibitions | Artsy"/>'
      @html.should.containEql '<meta name="description" content="Explore shows in Cool Placeon Artsy."/>'
      @html.should.containEql '<meta property="og:description" content="Explore shows in Cool Placeon Artsy."/>'
      @html.should.containEql '<meta property="twitter:description" content="Explore shows in Cool Placeon Artsy."/>'
      @html.should.containEql '<link rel="canonical" href="http://localhost:5000/shows"/>'
      @html.should.containEql '<meta property="og:url" content="http://localhost:5000/shows"/>'
      @html.should.containEql '<meta property="og:image" content="http://localhost:5000/og_image.jpg"/>'
      @html.should.containEql '<meta property="og:type" content="website"/>'
      @html.should.containEql '<meta property="twitter:card" content="summary"/>'
      @html.should.containEql '<meta name="fragment" content="!"/>'
