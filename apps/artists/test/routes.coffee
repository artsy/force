{ parseId } = routes = require '../routes'

describe 'Artists routes', ->
  describe '#parseId', ->
    it 'works on all sorts of valid paths and URLs (1)', ->
      parseId('https://www.artsy.net/artist/alexander-calder').should.equal 'alexander-calder'

    it 'works on all sorts of valid paths and URLs (2)', ->
      parseId('/artist/alexander-calder').should.equal 'alexander-calder'

    it 'works on all sorts of valid paths and URLs (3)', ->
      parseId('artist/alexander-calder').should.equal 'alexander-calder'

    it 'works on all sorts of valid paths and URLs (4)', ->
      parseId('https://www.artsy.net/artist/alexander-calder/').should.equal 'alexander-calder'

    it 'works on all sorts of valid paths and URLs (5)', ->
      parseId('/artist/alexander-calder/').should.equal 'alexander-calder'

    it 'works on all sorts of valid paths and URLs (6)', ->
      parseId('/artist/alexander-calder-2/').should.equal 'alexander-calder-2'

    it 'works on all sorts of valid paths and URLs (7)', ->
      parseId('/artist/alexander_calder-2/').should.equal 'alexander_calder-2'
