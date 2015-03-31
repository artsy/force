_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
OrderedSets = require '../../../collections/ordered_sets.coffee'
Profiles = require '../../../collections/profiles'
Partner = require '../../../models/partner'

describe 'Galleries / Institutions', ->
  before ->
    @profiles = new Profiles [
      fabricate 'featured_partners_profiles',
        id: '43-salon-inter-nacional-de-artistas'
        owner: fabricate 'partner', type: 'Museum', name: '43 Salon (Inter) Nacional de Artistas'
      fabricate 'featured_partners_profiles',
        id: 'getty'
        owner: fabricate 'partner', type: 'Museum', name: 'J. Paul Getty Museum', sortable_id: 'getty'
      fabricate 'featured_partners_profiles',
        id: 'lacma'
        owner: fabricate 'partner', type: 'Museum', name: 'LACMA'
    ]
    @aToZGroup = @profiles.groupByAlphaWithColumns 3

  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: CURRENT_PATH: '/institutions'
        asset: (->)
        aToZGroup: @aToZGroup
        partnerCount: @profiles.length
        copy: header: 'Institutions, Museums, and Nonprofits', adjective: 'Institutional'
      }, done

  afterEach ->
    benv.teardown()

  describe 'template', ->
    it 'renders an A to Z list of institutional partners with links to the partner', ->
      @profiles.each (profile) ->
        markup = $('.galleries-institutions-list').html()
        markup.should.containEql profile.get('owner').name
        markup.should.containEql "/#{profile.id}"
      $('.a-to-z-row-letter').eq(0).text().should.equal @aToZGroup[0].letter
      $('.a-to-z-row-letter').eq(1).text().should.equal @aToZGroup[1].letter
      $('.a-to-z-row-letter').eq(2).text().should.equal @aToZGroup[2].letter

    it 'includes a page title', ->
      $('.galleries-institutions-title').text().should.equal 'Institutions, Museums, and Nonprofits'

    it 'includes a count of the featured institutions', ->
      $('.galleries-institutions-count-value').text().should.equal "#{@profiles.length}"
      $('.galleries-institutions-count-label').text().should.equal 'Selected Institutional Partners'
