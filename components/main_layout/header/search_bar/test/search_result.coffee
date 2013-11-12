fabricate     = require('antigravity').fabricate
rewire        = require 'rewire'
SearchResult  = rewire '../models/search_result.coffee'

describe 'SearchResult', ->
  describe '#initialize', ->
    describe '#location', ->
      it 'has a location attribute when it is an artwork', ->
        model = new SearchResult(fabricate('artwork', model: 'artwork'))
        model.get('location').should.equal '/artwork/skull1'

      it 'has a location attribute when it is a profile', ->
        model = new SearchResult(fabricate('profile', model: 'profile'))
        model.get('location').should.equal '/alessandra'

    describe '#displayModel', ->
      it 'has a display_model attribute when it is a artwork', ->
        model = new SearchResult(fabricate('artwork', model: 'artwork'))
        model.get('display_model').should.equal 'Artwork'

      it 'has a display_model attribute when it is a gene', ->
        model = new SearchResult(model: 'gene')
        model.get('display_model').should.equal 'Category'

    describe '#imageUrl', ->
      it 'has an image_url attribute that is tokenless when logged out', ->
        model = new SearchResult(fabricate('artwork', model: 'artwork'))
        model.get('image_url').should.equal "/api/v1/artwork/#{model.id}/default_image.jpg"

      it 'has an image_url attribute that with the token appened when logged in', ->
        token = 'token'
        SearchResult.__set__ 'sd', { GRAVITY_XAPP_TOKEN: token }
        model = new SearchResult(fabricate('artwork', model: 'artwork'))
        model.get('image_url').should.equal "/api/v1/artwork/#{model.id}/default_image.jpg?xapp_token=#{token}"
