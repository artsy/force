_             = require 'underscore'
sinon         = require 'sinon'
Backbone      = require 'backbone'
Post          = require '../../models/post'
Profile       = require '../../models/profile'
Artwork       = require '../../models/artwork'
{ fabricate } = require 'antigravity'

describe 'Post', ->

  beforeEach ->
    @profile = fabricate 'profile'

  describe "#metaTitle", ->

    it "correctly formats meta title", ->
      new Post(profile: @profile).metaTitle().should.equal "Craig Spaeth | Artsy"
      new Post(title: "Title", profile: @profile).metaTitle().should.equal "Craig Spaeth | Title | Artsy"
      new Post(summary: "Body", profile: @profile).metaTitle().should.equal "Craig Spaeth | Body | Artsy"
      new Post(summary: "Body", title: "Title", profile: @profile).metaTitle().should.equal "Craig Spaeth | Title | Artsy"
      new Post(
        profile: @profile
        summary: "I am a much longer body for this post. Wohoo! OMG LOL. The red brown fox jumped over the grey dog."
      ).metaTitle().should.equal "Craig Spaeth | I am a much longer body for this post. Wohoo! OMG LOL. The... | Artsy"

  describe "#metaDescription", ->

    beforeEach ->
      @artwork = fabricate 'artwork'
      @artworkTwo = fabricate 'artwork'

    it "correctly formats meta title", ->
      new Post(profile: @profile, artworks: [@artwork]).metaDescription().should.equal new Artwork(@artwork).toOneLine()
      new Post(title: "Title", profile: @profile, artworks: [@artwork]).metaDescription().should.equal new Artwork(@artwork).toOneLine()
      new Post(title: "Title", profile: @profile, artworks: [@artwork, @artworkTwo]).metaDescription().should.equal "#{new Artwork(@artwork).toOneLine()}, #{new Artwork(@artworkTwo).toOneLine()}"
      new Post(summary: "Body", profile: @profile, artworks: [@artwork]).metaDescription().should.equal "Body | #{new Artwork(@artwork).toOneLine()}"
      new Post(summary: "Body", title: "Title", profile: @profile, artworks: [@artwork]).metaDescription().should.equal "Body | #{new Artwork(@artwork).toOneLine()}"

  describe '#defaultImage', ->

    it 'returns the first image of the first artwork', ->
      postImage =
        type: 'PostImage'
      image =
        is_default: true
      postArtwork =
        artwork: fabricate('artwork', images: [image])
        type: 'PostArtwork'
      post = new Post(attachments: [postImage, postArtwork])

      post.defaultImage().get('is_default').should.equal image.is_default

    it 'returns the first image if there is no artwork', ->
      image =
        type: 'PostImage'
      post = new Post(attachments: [image])

      post.defaultImage().should.equal image

    it 'returns object if there are no attachments', ->
      post = new Post(attachments: [])
      post.defaultImage().should.be.type('object')
