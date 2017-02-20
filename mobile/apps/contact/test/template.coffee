_ = require 'underscore'
fs = require 'fs'
template = require('jade').compileFile(require.resolve '../templates/template.jade')
fixture = require '../fixtures/contact.json'
data = _.extend {}, asset: (->), sd: {}, data: fixture, markdown: (->)

describe '/contact', ->
  describe 'index', ->
    it 'renders correctly', ->
      template(data)
      .should.containEql '<h4 class="contact-section-headers">Contact Us</h4>'
