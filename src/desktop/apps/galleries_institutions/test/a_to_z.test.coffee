benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
Profiles = require '../../../collections/profiles'

describe 'Galleries / Institutions', ->
  before ->
    @profiles = new Profiles [
      fabricate 'featured_partners_profiles',
        id: '43-salon-inter-nacional-de-artistas'
        owner_type: 'PartnerInstitution'
        owner: fabricate 'partner', type: 'Institution', name: '43 Salon (Inter) Nacional de Artistas'
      fabricate 'featured_partners_profiles',
        id: 'getty'
        owner_type: 'PartnerInstitution'
        owner: fabricate 'partner', type: 'Institution', name: 'J. Paul Getty Museum', sortable_id: 'getty'
      fabricate 'featured_partners_profiles',
        id: 'lacma'
        owner_type: 'PartnerInstitution'
        owner: fabricate 'partner', type: 'Institution', name: 'LACMA'
    ]
    @aToZGroup = @profiles.groupByAlphaWithColumns 3

  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      benv.render resolve(__dirname, '../templates/a_z.jade'), {
        sd: CURRENT_PATH: '/institution-a-z'
        asset: (->)
        aToZGroup: @aToZGroup
        type: 'institution'
        showAZLink: false

      }, done

  afterEach ->
    benv.teardown()

  describe 'template', ->
    it 'renders an A to Z list of partners with links to the partner', ->
      markup = $('.galleries-institutions-page').html()
      markup.should.containEql ('Browse Institutions')
      @profiles.each (profile) ->
        markup.should.containEql profile.related().owner.get('name')
        markup.should.containEql "/#{profile.id}"
      $('.a-to-z-row-letter').eq(0).text().should.equal @aToZGroup[0].letter
      $('.a-to-z-row-letter').eq(1).text().should.equal @aToZGroup[1].letter
      $('.a-to-z-row-letter').eq(2).text().should.equal @aToZGroup[2].letter
