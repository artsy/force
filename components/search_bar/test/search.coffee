Search = require '../collections/search'

describe 'Search', ->
  beforeEach ->
    @items = [{ owner_type: 'PartnerGallery' }, { owner_type: 'PartnerMuseum' }, { foo: 'bar' }]

  describe '#url', ->
    it 'has the correct url', ->
      search = new Search()
      search.url().should.containEql '/api/v1/match/?visible_to_public=true'

    it 'can be used with multiple match endpoints', ->
      search = new Search mode: 'profiles'
      search.url().should.containEql '/api/v1/match/profiles?visible_to_public=true'

    it 'takes a fair_id', ->
      search = new Search mode: 'profiles', fairId: 'fair-id'
      search.url().should.containEql '/api/v1/match/profiles?visible_to_public=true&fair_id=fair-id'

  describe '#parse', ->
    it 'casts items as SearchResults', ->
      search = new Search
      parsed = search.parse(@items)
      parsed[0].constructor.name.should.equal 'SearchResult'

    it 'can restrict the results by type based on the owner_type', ->
      search = new Search mode: 'profiles', restrictType: 'PartnerGallery'
      parsed = search.parse(@items)
      parsed.length.should.equal 1
      parsed[0].get('model').should.equal 'profile'

    it 'can restrict the results by multiple owner_types', ->
      search = new Search mode: 'profiles', restrictType: ['PartnerMuseum', 'PartnerNonProfit']
      @items.push owner_type: 'PartnerNonProfit'
      parsed = search.parse(@items)
      parsed.length.should.equal 2
      parsed[0].get('model').should.equal 'profile'

    it 'can return heterogeneous results', ->
      search = new Search
      parsed = search.parse(@items)
      parsed.length.should.equal @items.length
