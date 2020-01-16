benv = require 'benv'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
{ resolve }  = require 'path'
Feature = require '../../../../models/feature'

describe 'Feature template', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      @sd = API_URL: 'http://localhost:5000'
      @feature = new Feature fabricate('feature', image_versions: ['wide'])
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        sd: @sd
        asset: (->)
        feature: @feature
      }, -> done()

  after ->
    benv.teardown()

  describe 'template', ->
    it 'renders a feature image', ->
      $('.feature-image').should.have.lengthOf 1
      $('.feature-image').attr('style').should.containEql @feature.imageUrl('wide')

    it 'renders the feature title', ->
      $('.feature-title').should.have.lengthOf 1
      $('.feature-title').text().should.equal @feature.get 'name'

    it 'renders the feature description', ->
      $('.feature-description').should.have.lengthOf 1
      $('.feature-description').text().should.equal @feature.mdToHtmlToText 'description'
