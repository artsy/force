_ = require 'underscore'
_s = require 'underscore.string'
jade = require 'jade'
markdown = require '../../../components/util/markdown'

render = (data) ->
  template = jade.compileFile(require.resolve '../templates/hero_unit.jade')
  template _.extend {}, {
    _s: _s
    markdown: markdown
  }, data

describe 'Hero unit template', ->
  it 'renders markdown subtitles', ->
    render heroUnit: subtitle: 'This is a *subtitle*'
      .should.containEql '<em>subtitle</em>'
