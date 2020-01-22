fabricate = require('@artsy/antigravity').fabricate
rewire = require 'rewire'
SearchResult = rewire '../../models/search_result.coffee'
Fair = require '../../models/fair.coffee'
moment = require 'moment'

describe 'SearchResult', ->
  describe '#initialize', ->
    describe '#location', ->
      it 'has a location attribute when it is an artwork', ->
        model = new SearchResult(fabricate('artwork', model: 'artwork'))
        model.get('location').should.containEql '/artwork/skull'

      it 'has a location attribute when it is a show', ->
        model = new SearchResult(fabricate('show', model: 'partnershow'))
        model.get('location').should.containEql '/show/gagosian-gallery-inez-and-vinoodh'

      it 'has a location attribute when it is a profile', ->
        model = new SearchResult(fabricate('profile', model: 'profile'))
        model.get('location').should.equal '/alessandra'

      it 'has a location attribute when it is an article', ->
        model = new SearchResult(fabricate('article', model: 'article'))
        model.href().should.containEql '/article/' + model.id

      it 'has a location attribute when it is a fair', ->
        model = new SearchResult(fabricate('fair', model: 'fair', profile_id: 'foo-profile'))
        model.get('location').should.containEql '/foo-profile'

      it 'has a location attribute when it is a page', ->
        model = new SearchResult(fabricate('page', model: 'page'))
        model.get('location').should.containEql '/' + model.id

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

      it 'has a display_model attribute when it is an article', ->
        model = new SearchResult(model: 'article')
        model.get('display_model').should.equal 'Article'

      it 'has a display_model attribute when it is a profile', ->
        model = new SearchResult(model: 'profile')
        model.get('display_model').should.equal 'Gallery'

      it 'has a display_model attribute when it an institution profile', ->
        model = new SearchResult(model: 'profile', owner_type: 'PartnerInstitution')
        model.get('display_model').should.equal 'Institution'

      it 'has a display_model attribute when it an institution seller profile', ->
        model = new SearchResult(model: 'profile', owner_type: 'PartnerInstitutionalSeller')
        model.get('display_model').should.equal 'Institution'
      
      it 'has a display_model attribute when it fair profile', ->
        model = new SearchResult(model: 'profile', owner_type: 'FairOrganizer')
        model.get('display_model').should.equal 'Fair'

  describe '#updateForFair', ->
    it 'modifies location and display model for fair booths', ->
      fair = new Fair(fabricate 'fair')
      modelA = new SearchResult(fabricate('show', model: 'partnershow'))
      modelB = new SearchResult(fabricate('artist', model: 'artist'))

      modelA.updateForFair(fair)
      modelB.updateForFair(fair)

      modelA.get('display_model').should.equal 'Booth'
      modelA.get('location').should.containEql '/show/gagosian-gallery-inez-and-vinoodh'
      modelB.get('location').should.containEql "/the-armory-show/browse/artist/pablo"

  describe '#formatArticleAbout', ->
    it 'constructs about based on publish time and excerpt', ->
      article = fabricate('article',
        model: 'article',
        display: 'Foo Article',
        description: 'Lorem Ipsum.',
        published_at: new Date("2-2-2014").toISOString())

      result = new SearchResult(article)
      result.displayModel().should.equal 'Article'
      result.about().should.equal("Feb 2nd, 2014 ... Lorem Ipsum.")

  describe '#formatEventAbout', ->
    it 'constructs a human readable event description', ->
      fair = fabricate('fair',
        model: 'fair',
        display: 'Foo Fair',
        start_at: new Date('10-5-2015').toISOString(),
        end_at: new Date('10-10-2015').toISOString(),
        city: 'New York')
      result = new SearchResult(fair)
      result.about().should.equal 'Art fair running from Oct 5th to Oct 10th, 2015 in New York'

  describe '#formatShowAbout', ->
    it 'constructs a show description for a partner show with artists', ->
      show = fabricate('show',
        model: 'partnershow'
        display: 'Foo Exhibition'
        start_at: new Date('10-5-2015 12:00:00').toISOString()
        end_at: new Date('10-10-2015 12:00:00').toISOString()
        artist_names: ['Banksy']
        address: '401 Broadway'
        venue: 'Foo Gallery'
        city: 'New York')
      result = new SearchResult(show)
      result.about().should.equal 'Past show featuring works by Banksy at Foo Gallery New York, 401 Broadway Oct. 5th – 10th 2015'

    it 'constructs a show description for a fair booth', ->
      show = fabricate('show',
        model: 'partnershow'
        display: 'Foo Exhibition'
        start_at: new Date('10-5-2015 12:00:00').toISOString()
        end_at: new Date('10-10-2015 12:00:00').toISOString()
        venue: 'Foo Fair'
        fair_id: 'foo-fair'
        city: 'New York')
      result = new SearchResult(show)
      result.about().should.equal 'Past fair booth at Foo Fair New York Oct. 5th – 10th 2015'

  describe '#about', ->
    it 'uses a profile description', ->
      profile = fabricate('profile',
        model: 'profile',
        id: 'foo-gallery',
        display: 'Foo Gallery',
        description: 'A description of foo gallery'
      )

      result = new SearchResult(profile)
      result.about().should.equal 'A description of foo gallery'

  describe '#formatCityAbout', ->
    it 'uses a standard template', ->
      result = new SearchResult({ model: 'city', display: 'Gotham', id: 'gotham' })
      result.about().should.equal 'Browse current exhibitions in Gotham'

  describe '#status', ->
    it 'correctly detects closed event status', ->
      show = fabricate('show',
        model: 'partnershow'
        start_at: new Date('10-5-2015').toISOString()
        end_at: new Date('10-10-2015').toISOString()
      )

      result = new SearchResult(show)
      result.status().should.equal 'closed'

    it 'correctly detects upcoming event status', ->
      show = fabricate('show',
        model: 'partnershow'
        start_at: moment().add(2, 'days').format()
        end_at: moment().add(8, 'days').format()
      )

      result = new SearchResult(show)
      result.status().should.equal 'upcoming'

    it 'correctly detects running event status', ->
      show = fabricate('show',
        model: 'partnershow'
        start_at: moment().subtract(2, 'days').format()
        end_at: moment().add(2, 'days').format()
      )

      result = new SearchResult(show)
      result.status().should.equal 'running'
