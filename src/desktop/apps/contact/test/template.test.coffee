_ = require 'underscore'
fs = require 'fs'
template = require('jade').compileFile(require.resolve '../templates/index.jade')
fixture = require './fixture'
data = _.extend {}, asset: (->), sd: {}, fixture, markdown: (->)

describe '/contact', ->
  describe 'index', ->
    it 'renders correctly', ->
      template(data)
      .should.containEql '<h1>Contact Us</h1>'
