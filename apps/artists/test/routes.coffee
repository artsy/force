{ parseId } = routes = require '../routes'

describe 'Artists routes', ->
  describe '#parseId', ->
    it 'works on all sorts of valid paths and URLs', ->
      parseId('https://www.artsy.net/artist/alexander-calder').should.equal 'alexander-calder'
      parseId('/artist/alexander-calder').should.equal 'alexander-calder'
      parseId('artist/alexander-calder').should.equal 'alexander-calder'
      parseId('https://www.artsy.net/artist/alexander-calder/').should.equal 'alexander-calder'
      parseId('/artist/alexander-calder/').should.equal 'alexander-calder'
