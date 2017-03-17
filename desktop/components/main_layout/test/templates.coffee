jade = require 'jade'
fs = require 'fs'
Profile = require '../../../models/profile'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

render = (template) ->
  filename = resolve __dirname, template
  jade.compile fs.readFileSync(filename), filename: filename

describe 'Main layout template', ->
  it 'includes the sharify script', ->
    render('../templates/index.jade')(
      sd: { BROWSER: {}, CURRENT_PATH: '/' }, sharify: { script: -> 'foobar' }, asset: ((p) -> p)
    ).should.containEql '/assets/analytics.js'

  it 'excludes analytics for phantom', ->
    render('../templates/index.jade')(
      sd: { BROWSER: { family: 'PhantomJS' }, CURRENT_PATH: '/' }
      sharify: { script: -> 'foobar' }
      asset: ((p) -> p)
    ).should.not.containEql '/assets/analytics.js'

  it 'can render the page when CURRENT_USER is missing', ->
    console.log render('../templates/index.jade')(
      sd: CURRENT_USER: {}
      asset: ((p) -> p)
    )

describe 'Head template', ->
  describe 'IS_RESPONSIVE', ->
    it 'renders whether or not there is a user agent', ->
      render('../templates/head.jade')(sd: { IS_RESPONSIVE: true }, asset: (->))
