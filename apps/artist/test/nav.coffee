_ = require 'underscore'
Nav = require '../nav'
artistJSON = require './fixtures'

describe 'Nav', ->
  beforeEach ->
    @nav = new Nav artist: artistJSON

  describe '#sections', ->
    it 'generates the sections of the nav based on the passed in statuses', ->
      _.pluck(@nav.sections(), 'name').should.eql [
        'Overview', 'Works', 'CV', 'Articles', 'Shows', 'Auction Results', 'Related Artists'
      ]

    it 'evaluates the href given the artist id', ->
      _.pluck(@nav.sections(), 'href').should.eql [
        '/artist/jeff-koons-1'
        '/artist/jeff-koons-1/works'
        '/artist/jeff-koons-1/cv'
        '/artist/jeff-koons-1/articles'
        '/artist/jeff-koons-1/shows'
        '/artist/jeff-koons-1/auction-results'
        '/artist/jeff-koons-1/related-artists'
      ]

  describe '#active', ->
    it 'finds the active section given the current path', ->
      @nav.active('/artist/jeff-koons-1/works').href.should.equal '/artist/jeff-koons-1/works'
      _.isUndefined(@nav.active('/artist/jeff-koons-1/wrong')).should.be.true()

  describe '#rels', ->
    it 'generates the next and prev relationships given the current path', ->
      { next, prev } = @nav.rels('/artist/jeff-koons-1')
      _.isUndefined(prev).should.be.true()
      next.href.should.equal '/artist/jeff-koons-1/works'

      { next, prev } = @nav.rels('/artist/jeff-koons-1/works')
      prev.href.should.equal '/artist/jeff-koons-1'
      next.href.should.equal '/artist/jeff-koons-1/cv'

      { next, prev } = @nav.rels('/artist/jeff-koons-1/works?with=querystring')
      prev.href.should.equal '/artist/jeff-koons-1'
      next.href.should.equal '/artist/jeff-koons-1/cv'

      { next, prev } = @nav.rels('/artist/jeff-koons-1/cv')
      prev.href.should.equal '/artist/jeff-koons-1/works'
      next.href.should.equal '/artist/jeff-koons-1/articles'

      { next, prev } = @nav.rels('/artist/jeff-koons-1/articles')
      prev.href.should.equal '/artist/jeff-koons-1/cv'
      next.href.should.equal '/artist/jeff-koons-1/shows'

      { next, prev } = @nav.rels('/artist/jeff-koons-1/shows')
      prev.href.should.equal '/artist/jeff-koons-1/articles'
      next.href.should.equal '/artist/jeff-koons-1/auction-results'

      { next, prev } = @nav.rels('/artist/jeff-koons-1/auction-results')
      prev.href.should.equal '/artist/jeff-koons-1/shows'
      next.href.should.equal '/artist/jeff-koons-1/related-artists'

      { next, prev } = @nav.rels('/artist/jeff-koons-1/related-artists')
      prev.href.should.equal '/artist/jeff-koons-1/auction-results'
      _.isUndefined(next).should.be.true()
