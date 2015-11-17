$ = require 'cheerio'
_ = require 'underscore'
{ fabricate } = require 'antigravity'
Profile = require '../../../../models/profile'
Fair = require '../../../../models/fair'
template = require('jade').compileFile(require.resolve '../../templates/visitors.jade')
data = _.extend {}, asset: (->), sd: {}, markdown: (->)

render = (moreData) ->
  template _.extend {}, data, moreData

describe 'Visitors templates', ->
  before ->
    @profile = new Profile fabricate 'profile'

  describe 'fair with location', ->
    beforeEach ->
      @fair = new Fair fabricate 'fair', location: {summary: '401 Broadway New York, New York'}

    it 'should render address', ->

      $(render({profile: @profile, fair: @fair})).find('.fair-location').html()
        .should.containEql '401 Broadway New York, New York'

    it 'should render map', ->

      $(render({profile: @profile, fair: @fair})).find('.fair-map-link')
        .should.be.ok

  describe 'fair without location', ->

    it 'should not render map or location', ->
      @fair = new Fair fabricate 'fair', location: null

      $el = $(render({profile: @profile, fair: @fair})).find('.fair-info2-body').html()
      $el.should.not.containEql "class='fair-map-link'"
      $el.should.not.containEql "class='map'"

  describe 'fair with contact', ->
    it 'should render contact info', ->
      @fair = new Fair fabricate 'fair'

      $(render({profile: @profile, fair: @fair})).find('.fair-contact').html()
        .should.containEql 'Design Miami/ Office'

  describe 'fair with links', ->
    it 'should render contact info', ->
      @fair = new Fair fabricate 'fair'

      $(render({profile: @profile, fair: @fair})).find('.fair-links').html()
        .should.containEql 'href="http://google.com'

  describe 'fair with tickets link', ->
    it 'should render ticket info', ->
      @fair = new Fair fabricate 'fair', tickets_link: 'www.gettickets.com'

      $(render({profile: @profile, fair: @fair})).find('.fair-tickets').html()
        .should.containEql 'Tickets'
