{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
Partner = require '../../../models/partner'
Fair = require '../../../models/fair'
PartnerShow = require '../../../models/partner_show'
Profile = require '../../../models/profile'

describe 'Location route', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = {}
    @res = { render: sinon.stub(), locals: { sd: { APP_URL: 'http://localhost:5000', CURRENT_PATH: '/tokyo'} } }

  afterEach ->
    Backbone.sync.restore()

  it 'renders show template', (done) ->
    routes.show @req, @res, {name: 'Tokyo', coords: [35.66758, 139.78425]}

    # requests will be made for partners, fairs, shows, then partner profiles
    @partner = new Partner fabricate 'partner'
    @fair = new Fair fabricate 'fair'
    @show = new PartnerShow fabricate 'show'
    @profile = new Profile fabricate 'partner_profile'

    Backbone.sync.args[0][2].success([@partner])
    Backbone.sync.args[1][2].success([@fair])
    Backbone.sync.args[2][2].success([@show])
    Backbone.sync.args[3][2].success([@profile])

    _.defer =>
      @res.render.args[0][0].should.equal 'show'
      @res.render.args[0][1].title.should.equal "Galleries and Art Shows Near Tokyo"
      @res.render.args[0][1].name.should.equal "Tokyo"
      done()
