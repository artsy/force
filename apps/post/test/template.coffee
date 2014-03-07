_               = require 'underscore'
jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
cheerio         = require 'cheerio'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
Post            = require '../../../models/post'
Profile         = require '../../../models/profile'
Artwork         = require '../../../models/artwork'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Post Templates', ->

  describe 'Post', ->

    beforeEach ->
      sd =
        ARTSY_URL : 'http://localhost:5000'
        ASSET_PATH: 'http://localhost:5000'
      post = new Post fabricate('post')
      profile = new Profile fabricate 'profile'
      @html = render('index')({
        sd      : sd
        post    : post
        profile : profile
      })

    describe 'template', ->

      it 'renders post header', ->
        $ = cheerio.load @html
        $('#post').html().should.containEql 'Craig Spaeth'

  describe 'Related Artists', ->

    beforeEach ->
      postAttachments = [
        {
          position: 1
          type: "PostArtwork"
          artwork: fabricate('artwork')
        }]

      post = new Post fabricate('post', attachments: postAttachments)
      artists = post.relatedArtists(1).models

      for artist in artists
        artist.set poster_artwork: new Artwork(fabricate('artwork'))

      @html = render('related_artists')({
        artists: artists
      })

    describe 'template', ->

      xit 'renders post header', ->
        $ = cheerio.load @html
        $('.related-artists-container').html().should.containEql 'Artists Mentioned In Post'
        $('.related-artists-container').html().should.containEql 'Andy Warhol'
        $('.post-page-feature-item img').length.should.equal 1

  describe 'Featured Posts', ->

    beforeEach ->
      attachment =
        position: 1
        type: "PostArtwork"
        artwork: fabricate('artwork', artist: fabricate('artist'))

      posts = [
        new Post(fabricate('post', attachments: [attachment]))
        new Post(fabricate('post', attachments: [attachment]))
        new Post(fabricate('post', attachments: [attachment]))
      ]

      for post in posts
        thumbnail = post.featuredPostsThumbnail()
        post.set featured_posts_thumbnail: thumbnail

      @html = render('featured_posts')({
        posts: posts
      })

    describe 'template', ->

      xit 'renders post header', ->
        $ = cheerio.load @html
        $('.featured-posts-container').html().should.containEql 'Featured Posts'
        $('.featured-post-item').length.should.equal 3
        $('.featured-post-item .fixed-post-image').length.should.equal 3
