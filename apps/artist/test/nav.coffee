_ = require 'underscore'
Nav = require '../nav'

describe 'Nav', ->
  beforeEach ->
    @nav = new Nav artist: { id: 'foobar' }, statuses:
      artworks: true
      shows: true
      artists: true
      contemporary: false
      articles: false
      merchandisable: false
      bibliography: false
      collections: false
      exhibitions: false

  describe '#sections', ->
    it 'generates the sections of the nav based on the passed in statuses', ->
      _.pluck(@nav.sections(), 'name').should.eql [
        'Overview', 'Works', 'Articles', 'Shows', 'Related Artists'
      ]

    it 'evaluates the href given the artist id', ->
      _.pluck(@nav.sections(), 'href').should.eql [
        '/artist/foobar'
        '/artist/foobar/works'
        '/artist/foobar/articles'
        '/artist/foobar/shows'
        '/artist/foobar/related-artists'
      ]

  describe '#active', ->
    it 'finds the active section given the current path', ->
      @nav.active('/artist/foobar/works').href.should.equal '/artist/foobar/works'
      _.isUndefined(@nav.active('/artist/foobar/wrong')).should.be.true

  describe '#rels', ->
    it 'generates the next and prev relationships given the current path', ->
      { next, prev } = @nav.rels('/artist/foobar/works')
      next.href.should.equal '/artist/foobar/articles'
      prev.href.should.equal '/artist/foobar'
      { next, prev } = @nav.rels('/artist/foobar/works?with=querystring')
      next.href.should.equal '/artist/foobar/articles'
      prev.href.should.equal '/artist/foobar'
      { next, prev } = @nav.rels('/artist/foobar')
      _.isUndefined(prev).should.be.true
      next.href.should.equal '/artist/foobar/works'
      { next, prev } = @nav.rels('/artist/foobar/related-artists')
      prev.href.should.equal '/artist/foobar/shows'
      _.isUndefined(next).should.be.true
