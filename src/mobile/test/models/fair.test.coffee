Backbone = require 'backbone'
Fair = require '../../models/fair'
{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'

describe 'Fair', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @fair = new Fair fabricate 'fair'

  afterEach ->
    Backbone.sync.restore()

  describe '#imageUrl', ->

    it 'returns the replaced image url', ->
      @fair.set image_url: 'foo/bar/:version.jpg', image_versions: ['square']
      @fair.imageUrl().should.equal 'foo/bar/square.jpg'

  describe '#href', ->

    it 'returns a client link using the organizer profile id', ->
      @fair.href().should.equal "/#{@fair.get('organizer').profile_id}"

  describe '#small', ->

    it 'returns true if the fair layout is small', ->
      @fair.set(layout: 'small_fair').small().should.be.ok()

  describe '#title', ->

    it 'if small returns organizer name', ->
      @fair.set organizer: { name: 'The Kitten Conglomerate' }, layout: 'small_fair'
      @fair.title().should.equal 'The Kitten Conglomerate'

    it 'if big returns the fair name', ->
      @fair.set name: 'The Pug Conglomerate', layout: ''
      @fair.title().should.equal 'The Pug Conglomerate'

  describe '#subtitle', ->

    it 'if small returns the summary', ->
      @fair.set(
        summary: 'The greatest fair with all the art!'
        layout: 'small_fair'
      ).subtitle().should.equal('The greatest fair with all the art!')

    it 'returns some combinations of dates and location if big', ->
      @fair.set(
        start_at: new Date(200,1,1)
        end_at: new Date(200,1,2)
        location: fabricate 'location'
      ).subtitle().should.equal "Feb. 1st &ndash; 2nd #{@fair.location().cityState()}"

  describe '#fetchSections', ->

    it 'fetches and returns sections', (done) ->
      @fair.fetchSections success: (sections) ->
        sections.first().get('partner_shows_count').should.equal 2
        done()
      Backbone.sync.args[0][2].url.should.match /// /api/v1/fair/.*/sections ///
      Backbone.sync.args[0][2].success [{ section: 'Focus', partner_shows_count: 2 }]

  describe '#fetchShows', ->

    it 'fetches fair booths with a default size of 3 and sorted by featured', (done) ->
      @fair.fetchShows success: (shows) ->
        shows.first().get('name').should.equal 'Many Foos at the Bars'
        done()
      Backbone.sync.args[0][2].data.size.should.equal 3
      Backbone.sync.args[0][2].data.sort.should.equal '-featured'
      Backbone.sync.args[0][2].success { results: [fabricate 'show', name: 'Many Foos at the Bars'] }

  describe '#fetchPartners', ->

    it 'fetches the fairs partners', ->
      @fair.fetchPartners success: (partners) ->
        partners.first().get('name').should.equal 'FooBar Gallery'
      Backbone.sync.args[0][2].success [fabricate('partner', name: 'FooBar Gallery')]
      Backbone.sync.args[0][2].success []

  describe '#fetchArtists', ->

    it 'fetches the fairs artists', ->
      @fair.fetchArtists success: (artists) ->
        artists.first().get('name').should.equal 'FooBar'
      Backbone.sync.args[0][1].url.should.match /// fair/.*/artists ///
      Backbone.sync.args[0][2].success [fabricate('artist', name: 'FooBar')]
      Backbone.sync.args[0][2].success []

  describe '#fetchOptions', ->

    it 'fetches the fair options', (done) ->
      @fair.fetchOptions success: (options = {}) ->
        options.get('medium').Painting.should.equal 'painting'
        done()
      Backbone.sync.args[0][2].url.should.match /// /api/v1/search/filtered/fair/.*/options ///
      Backbone.sync.args[0][2].success { medium: { 'Painting': 'painting'} }

  describe '#fetchCounts', ->

    it 'fetches the counts by medium', (done) ->
      @fair.fetchCounts success: (counts) ->
        counts.get('medium').painting.should.equal 14
        done()
      Backbone.sync.args[0][2].url.should.match /// /api/v1/search/filtered/fair/.*/suggest ///
      Backbone.sync.args[0][2].success { medium: { 'painting': 14 } }

  describe '#fetchArtworks', ->

    it 'fetches the fairs artworks'
