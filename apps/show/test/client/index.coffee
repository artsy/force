_               = require 'underscore'
benv            = require 'benv'
sinon           = require 'sinon'
rewire          = require 'rewire'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'
AdditionalImage = require '../../../../models/additional_image.coffee'
Artwork         = require '../../../../models/artwork.coffee'
Artworks        = require '../../../../collections/artworks.coffee'
Backbone        = require 'backbone'
CurrentUser     = require '../../../../models/current_user.coffee'
SaveControls    = require '../../../../components/fillwidth_row/save_controls.coffee'
PartnerShow     = require '../../../../models/partner_show.coffee'
Profile         = require '../../../../models/profile.coffee'
ShareView       = require '../../../../components/share/view.coffee'
artworkColumns  = -> require('../../../../components/artwork_columns/template.jade') arguments...

describe 'Partner Show View', ->

  before (done) ->
    sinon.stub _, 'defer'
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      done()

  after ->
    _.defer.restore()
    benv.teardown()

  beforeEach (done) ->
    @show = new PartnerShow fabricate 'show', { images_count: 6, eligible_artworks_count: 6 }
    @profile = new Profile fabricate 'partner_profile'
    @installShots = new Backbone.Collection [
      new AdditionalImage fabricate 'artwork_image', { default: true }
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
    ]
    @artworks = new Artworks [
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
    ]
    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../template.jade'), {
      fair    : @show.fair()
      location: @show.location()
      partner : @show.partner()
      sd      : { ASSET_PATH: '' }
      show    : @show
      profile : @profile
    }, =>
      { PartnerShowView } = mod = rewire '../../client/index'
      @view = new PartnerShowView
        el   : $ '#show'
        model: @show.toJSON
      done()

  afterEach ->
    Backbone.sync.restore()

  xdescribe '#initialize', ->

    it 'has a show model', ->
      @view.model.should.equal @show
