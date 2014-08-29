fabricate = require('antigravity').fabricate
rewire = require 'rewire'
SearchResult = rewire '../../models/search_result.coffee'
Fair = require '../../models/fair.coffee'

describe 'SearchResult', ->
  describe '#initialize', ->
    describe '#location', ->
      it 'has a location attribute when it is an artwork', ->
        model = new SearchResult(fabricate('artwork', model: 'artwork'))
        model.href().should.containEql '/artwork/skull'

      it 'has a location attribute when it is a show', ->
        model = new SearchResult(fabricate('show', model: 'partnershow'))
        model.href().should.containEql '/show/gagosian-gallery-inez-and-vinoodh'

      it 'has a location attribute when it is a profile', ->
        model = new SearchResult(fabricate('profile', model: 'profile'))
        model.href().should.equal '/alessandra'

    describe '#displayModel', ->
      it 'has a display_model attribute when it is a artwork', ->
        model = new SearchResult(fabricate('artwork', model: 'artwork'))
        model.get('display_model').should.equal 'Artwork'

      it 'has a display_model attribute when it is a show', ->
        model = new SearchResult(fabricate('show', model: 'partnershow'))
        model.get('display_model').should.equal 'Show'

      it 'has a display_model attribute when it is a gene', ->
        model = new SearchResult(model: 'gene')
        model.get('display_model').should.equal 'Category'

    describe '#imageUrl', ->
      it 'has an image_url attribute that is tokenless when logged out', ->
        model = new SearchResult(fabricate('artwork', model: 'artwork'))
        model.get('image_url').should.containEql "/api/v1/artwork/#{model.get('id')}/default_image.jpg"

      it 'has an image_url attribute that with the token appened when logged in', ->
        token = 'token'
        SearchResult.__set__ 'sd', { ARTSY_XAPP_TOKEN: token }
        model = new SearchResult(fabricate('artwork', model: 'artwork'))
        model.get('image_url').should.containEql "/api/v1/artwork/#{model.get('id')}/default_image.jpg?xapp_token=#{token}"

    describe '#highlightedDisplay', ->
      it 'highlights the search term in the display attribute and spits back some HTML', ->
        model = new SearchResult(fabricate('artwork', model: 'artwork'))
        model.highlightedDisplay('skull').should.equal '<span class="is-highlighted">Skull</span> by Andy Warhol'

    describe '#updateForFair', ->
      it 'cleans up data returned from fair search API', ->
        fair = new Fair(fabricate 'fair')
        modelA = new SearchResult(fabricate('show', model: 'partnershow'))
        modelB = new SearchResult(fabricate('artist', model: 'artist'))

        modelA.updateForFair(fair)
        modelB.updateForFair(fair)

        modelA.get('display_model').should.equal 'Booth'
        modelA.href().should.containEql '/show/gagosian-gallery-inez-and-vinoodh'
        modelB.href().should.containEql "/the-armory-show/browse/artist/pablo"
