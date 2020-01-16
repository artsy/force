ViewHelpers = require '../../helpers/view_helpers'
{ fabricate } = require '@artsy/antigravity'

describe 'ViewHelpers', ->
  describe 'sailthruTags', ->
    it 'formats sailthru tags properly', ->
      artist = fabricate 'artist', id: 'artist-id'
      partner = fabricate 'partner', id: 'partner-id'
      location = fabricate 'location', city: 'New York', country: 'US'
      show = fabricate 'show', partner: partner, artists: [artist], location: location
      ViewHelpers.sailthruTags(show).should.eql(
        ['artist-id', 'partner-id', 'gallery-show', 'new-york', 'us']
      )

    it 'ignores blank fields', ->
      artist = fabricate 'artist', id: 'artist-id'
      partner = fabricate 'partner', id: 'partner-id'
      location = fabricate 'location', city: null, country: 'US'
      show = fabricate 'show', partner: partner, artists: [artist], location: location
      ViewHelpers.sailthruTags(show).should.eql(
        ['artist-id', 'partner-id', 'gallery-show', 'us']
      )
