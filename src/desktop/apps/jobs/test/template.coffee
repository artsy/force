_ = require 'underscore'
fs = require 'fs'
template = require('jade').compileFile(require.resolve '../templates/index.jade')
fixture = require './fixture'
fixture.categories = _.groupBy fixture.jobs, 'category'
resizer = require '../../../components/resizer'
data = _.extend {}, asset: (->), sd: {}, fixture, resizer, markdown: (->)

describe '/jobs', ->
  describe 'index', ->
    it 'renders correctly', ->
      template(data)
        .should.containEql '<h1 class="jobs-header-headline bisected-header-cell">Join Our Team</h1>'

