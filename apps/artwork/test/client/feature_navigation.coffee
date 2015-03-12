_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
FeatureNavigationView = benv.requireWithJadeify resolve(__dirname, '../../client/feature_navigation'), ['template']

describe 'FeatureNavigationView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    benv.teardown()

  it 'renders when there is a feature', ->
    feature = new Backbone.Model(fabricate 'feature')
    view = new FeatureNavigationView model: feature, kind: 'feature'
    html = view.$el.html()
    html.should.containEql '<a href="/feature/bitty-the-cat">Work offered by<br>A Feature all about the greatest cat'
    html.should.containEql 'Go to feature'

  it 'renders when there is a published fair', ->
    fair = new Backbone.Model(fabricate 'fair')
    fair.set 'published', true
    view = new FeatureNavigationView model: fair, kind: 'fair'
    html = view.$el.html()
    html.should.containEql '<a href="/the-armory-show">Work offered by<br>Armory Show 2013'
    html.should.containEql 'Go to fair'

  it 'does not render when there is a unpublished fair', ->
    fair = new Backbone.Model(fabricate 'fair')
    view = new FeatureNavigationView model: fair, kind: 'fair'
    _.isEmpty(view.$el.html()).should.be.true

  it 'does not fair if the entity does not have a name', ->
    feature = new Backbone.Model(fabricate 'feature')
    feature.unset 'name'
    view = new FeatureNavigationView model: feature, kind: 'feature'
    _.isEmpty(view.$el.html()).should.be.true
