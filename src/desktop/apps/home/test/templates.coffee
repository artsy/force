_ = require 'underscore'
_s = require 'underscore.string'
jade = require 'jade'
markdown = require '../../../components/util/markdown'

render = (data) ->
  template = jade.compileFile(require.resolve '../templates/hero_unit.jade')
  template _.extend {}, {
    _s: _s
    markdown: markdown,
    resize: (url) => "https://d234.cloudfront.net?resize_to=fit&src=#{url}"
  }, data

describe 'Hero unit template', ->
  it 'renders markdown subtitles', ->
    render heroUnit: subtitle: 'This is a *subtitle*'
      .should.containEql '<em>subtitle</em>'

  it 'resizes the image url if the hero unit comes from metaphysics', ->
    render heroUnit: subtitle: 'This is a *subtitle*', mode: 'LEFT_DARK', background_image_url: 'd3swk.cloudfront.net/large.jpg'
      .should.containEql '?resize_to=fit'

  it 'does not resize the image url if the hero unit is the welcome image', ->
    render heroUnit: subtitle: 'This is a *subtitle*', mode: 'WELCOME'
      .should.not.containEql '?resize_to=fit'
