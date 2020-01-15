_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
Partner = require '../../../../models/partner.coffee'
Profile = require '../../../../models/profile.coffee'
Contact = require '../../client/contact.coffee'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

describe 'Contact page', ->

  beforeEach (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        profile: new Profile fabricate 'partner_profile'
        sd: { PROFILE: fabricate 'partner_profile' }
        asset: (->)
        params: {}
      }, ->
        done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  describe '#renderAdditionalInfo', ->

    it 'renders additional info', ->
      view = new Contact
        profile: new Profile fabricate 'partner_profile'
        partner: new Partner fabricate 'partner', vat_number: "ABC123"
        el: $('body')
      view.renderAdditionalInfo()
      $(view.el).html().should.containEql '<div class="partner-vat-info">VAT ID #: ABC123</div>'
