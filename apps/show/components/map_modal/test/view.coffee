_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
PartnerShow = require '../../../../../models/partner_show.coffee'
Partner = require '../../../../../models/partner.coffee'
# gmaps = require 'gmaps'
ModalView = benv.requireWithJadeify resolve(__dirname, '../../../../../components/modal/view'), ['modalTemplate']
MapModalView = require '../view.coffee' 

describe 'MapModalView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
      benv.teardown(false)

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @relatedShow = new PartnerShow fabricate 'show', 
    @partner = new Partner fabricate 'partner'
    @view = new MapModalView model: @relatedShow
    done() 

  afterEach -> 
    Backbone.sync.restore() 

  describe '#render', -> 
      it 'something is happening', -> 
        @view.$el.html()
        

### 

First, we require the 'view.coffee' and pass it a show as a model

MapModal = require '../components/map_modal/view.coffee'

mapModal = new MapModal
  model: show

At this point it will render itself and if we set the result to say, #(at)view

i.e.

(at)view = new MapModal
  model: show

we can check to make sure it's at least creating the right element if we check

$(at)view.html()

to test if our popup is correctly working, we'll need to run the .openMapModal on our view

when we do that, it will create a map modal.

the map modal is a backbone model that is an extension of the modal component backbone view and also 
requires in gmaps - need to resolve calls to these.

open modal will attempt to create the view using our fake show and will attempt to locate the 
partner using the .related() method - you may need to research how related() works and fabricate show
with a fake related partner?

openMapModal: (e) ->
    e.preventDefault()
    @mapModal = new MapModal
      show: @show
      partner: @show.related().partner

at this point, ideally, if we pass in the correct information we should have an accessible view 
@mapModal but we'll have to check and debug around there, we might need to build a fake body element
to attach things to so that we can query the DOM instead of the floating backbone elements



on our global window, the .google object is not set to be 'object' and window.google.maps needs to exist

if (!(typeof window.google === 'object' && window.google.maps)) {


###