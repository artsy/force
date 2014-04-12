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
      image   = type: 'PostImage'
      post    = new Post(attachments: [image])
      post.defaultImage().get('type').should.equal 'PostImage'

    it 'returns the first image if there is no PostImage or artwork', ->
      link = type: 'PostLink', url: 'existy', oembed_json: type: 'photo'
      post = new Post(attachments: [link])
      post.defaultImage().imageUrlFor().should.equal 'existy'
      post.defaultImage().imageUrl().should.equal 'existy'

    it 'returns undefined if there are no attachments', ->
      post = new Post(attachments: [])
      _.isUndefined(post.defaultImage()).should.be.ok

  describe '#relatedArtists', ->

    xit 'returns related artists', ->
      postAttachments = [
        {
          position: 1
          type: "PostArtwork"
          artwork: fabricate('artwork')
        }, {
          position: 2
          type: "PostArtwork"
          artwork: fabricate('artwork')
        }, {
          position: 3
          type: "PostArtwork"
          artwork: fabricate('artwork')
        }]

      post = new Post fabricate('post', attachments: postAttachments)
      relatedArtists = post.relatedArtists(3)
      relatedArtists.length.should.equal 3
      relatedArtists[0].get('id').should.equal postAttachments[0].artwork.artist.id
      relatedArtists[1].get('id').should.equal postAttachments[1].artwork.artist.id
      relatedArtists[2].get('id').should.equal postAttachments[2].artwork.artist.id

    it 'doesnt error with no artists', ->
      post = new Post fabricate('post')
      post.relatedArtists(3).should.be.ok

  describe '#featuredPostsThumbnail', ->

    it 'returns thumbnail', ->
      attachments = [
        {
          id: _.uniqueId()
          position: 1
          type: "PostLink"
          url: "http://www.youtube.com/watch?v=d7zaja7ytWI"
        }, {
          id: _.uniqueId()
          html: "<iframe></iframe>"
          position: 4
          sanitized_html: "<iframe></iframe>"
          type: "PostEmbed"
        }, {
          position: 1
          type: "PostArtwork"
          artwork: fabricate('artwork', artist: fabricate('artist', id: 'andy-01', name: 'andy 1'))
        }]

      post = new Post(fabricate('post', attachments: attachments))
      post.featuredPostsThumbnail().get('artwork').id.should.equal attachments[2].artwork.id

    it 'doesnt error', ->
      post = new Post(fabricate('post'))
      _.isUndefined(post.featuredPostsThumbnail()).should.be.ok

  describe '#onPostPage', ->

    it 'true if on post page', ->
      post = new Post(fabricate('post'))
      post.onPostPage("/post/#{post.get('id')}").should.be.ok
      post.onPostPage("/post/foo").should.not.be.ok
