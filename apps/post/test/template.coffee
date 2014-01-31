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

describe 'Post', ->

  beforeEach ->
    @sd =
      ARTSY_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @post = new Post fabricate('post')
    @profile = new Profile fabricate 'profile'
    @html = render('index')({
      sd      : @sd
      post    : @post
      profile : @profile
    })

  describe 'template', ->

    it 'renders post header', ->
      $ = cheerio.load @html
      $('#post').html().should.contain 'Craig Spaeth'

describe 'Related Artists', ->

  beforeEach ->
    @sd =
      ARTSY_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    postAttachments = [
      {
        id: _.uniqueId()
        position: 1
        type: "PostArtwork"
        artwork: fabricate('artwork', artist: fabricate('artist', id: 'andy-01', name: 'andy 1'))
      }, {
        id: _.uniqueId()
        position: 2
        type: "PostArtwork"
        artwork: fabricate('artwork', artist: fabricate('artist', id: 'andy-02', name: 'andy 2'))
      }, {
        id: _.uniqueId()
        position: 3
        type: "PostArtwork"
        artwork: fabricate('artwork', artist: fabricate('artist', id: 'andy-03', name: 'andy 3'))
      }]

    post = new Post fabricate('post', attachments: postAttachments)
    post.set

    artists = post.relatedArtists(3).models

    for artist in artists
      artist.set poster_artwork: new Artwork(fabricate('artwork'))

    @html = render('related_artists')({
      sd: @sd
      artists: artists
    })

  describe 'template', ->

    it 'renders post header', ->
      $ = cheerio.load @html
      $('.related-artists-container').html().should.contain 'Artists Mentioned In Post'
      $('.related-artists-container').html().should.contain 'andy 1'
      $('.related-artists-container').html().should.contain 'andy 2'
      $('.related-artists-container').html().should.contain 'andy 3'
      $('.post-page-feature-item img').length.should.equal 3

describe 'Featured Posts', ->

  beforeEach ->
    @sd =
      ARTSY_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    attachment =
      id: _.uniqueId()
      position: 1
      type: "PostArtwork"
      artwork: fabricate('artwork', artist: fabricate('artist', id: 'andy-01', name: 'andy 1'))

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

    it 'renders post header', ->
      $ = cheerio.load @html
      $('.featured-posts-container').html().should.contain 'Featured Posts'
      $('.featured-post-item').length.should.equal 3
      $('.featured-post-item .fixed-post-image').length.should.equal 3
