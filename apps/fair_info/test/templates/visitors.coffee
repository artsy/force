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
    @fair = new Fair fabricate 'fair'

  describe 'fair with location', ->
    beforeEach ->
      @fair = new Fair fabricate 'fair', location: {summary: '401 Broadway New York, New York'}
      @html = render({profile: @profile, fair: @fair})

    it 'should render address', ->
      @html.should.containEql '401 Broadway New York, New York'

    it 'should render map', ->
      @html.should.containEql 'class="fair-map-link"'

  describe 'fair without location', ->

    it 'should not render map or location', ->
      @fair = new Fair fabricate 'fair', location: null
      $el = render({profile: @profile, fair: @fair})

      $el.should.not.containEql "class='fair-map-link'"
      $el.should.not.containEql "class='map'"

  describe 'fair with contact', ->
    it 'should render contact info', ->

      render({profile: @profile, fair: @fair}).should.containEql 'Design Miami/ Office'

  describe 'fair with links', ->
    it 'should render contact info', ->

      render({profile: @profile, fair: @fair}).should.containEql 'href="http://google.com'

  describe 'fair with tickets link', ->
    it 'should render ticket info', ->
      @fair = new Fair fabricate 'fair', tickets_link: 'www.gettickets.com'

      render({profile: @profile, fair: @fair}).should.containEql 'Tickets'
