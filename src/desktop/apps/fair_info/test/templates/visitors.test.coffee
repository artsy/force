$ = require 'cheerio'
_ = require 'underscore'
{ fabricate } = require '@artsy/antigravity'
Profile = require '../../../../models/profile'
Fair = require '../../../../models/fair'
template = require('jade').compileFile(require.resolve '../../templates/visitors.jade')
data = _.extend {}, asset: (->), sd: {CURRENT_PATH: '/info/visitors'}, markdown: (->)
InfoMenu = require '../../../../components/info_menu/index.coffee'

render = (moreData) ->
  template _.extend {}, data, moreData

describe 'Visitors templates', ->
  before ->
    @profile = new Profile fabricate 'profile'
    @fair = new Fair fabricate 'fair'
    @infoMenu = new InfoMenu fair: @fair
    @infoMenu.infoMenu = {
      events: true,
      programming: false,
      artsyAtTheFair: false,
      aboutTheFair: false
    }


  describe 'fair with location', ->
    beforeEach ->
      @fair = new Fair fabricate 'fair', location: {summary: '401 Broadway New York, New York'}
      @html = render({profile: @profile, fair: @fair, infoMenu: @infoMenu.infoMenu})

    it 'should render address', ->
      @html.should.containEql '401 Broadway New York, New York'

    it 'should render map', ->
      @html.should.containEql 'id="fair-info2-map"'

  describe 'fair without location', ->

    it 'should not render map or location', ->
      @fair = new Fair fabricate 'fair', location: null
      $el = render({profile: @profile, fair: @fair, infoMenu: @infoMenu.infoMenu})

      $el.should.not.containEql "id='fair-info2-map'"

  describe 'fair with contact', ->
    it 'should render contact info', ->

      render({profile: @profile, fair: @fair, infoMenu: @infoMenu.infoMenu}).should.containEql 'Design Miami/ Office'

  describe 'fair with links', ->
    it 'should render contact info', ->

      render({profile: @profile, fair: @fair, infoMenu: @infoMenu.infoMenu}, infoMenu: @infoMenu.infoMenu).should.containEql 'href="http://google.com'

  describe 'fair with tickets', ->
    it 'should render ticket info', ->
      @fair = new Fair fabricate 'fair', tickets: 'Adult Tickets: $20'

      render({profile: @profile, fair: @fair, infoMenu: @infoMenu.infoMenu}).should.containEql 'Adult Tickets: $20'
