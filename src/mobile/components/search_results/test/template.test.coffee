fs = require 'fs'
jade = require 'jade'
path = require 'path'
fixtures = require '../../../test/helpers/fixtures'
SearchResult = require '../../../models/search_result'

describe 'result.jade', ->

  before ->
    @fixture = {
      model: 'article',
      display: 'The Friendship and Flight of Andy Warhol, Philip Pearlstein, and ...',
      image_url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSlZL9Q-fcFKGOvBsHCfxI6JpcJr5-hUMACOlhD-1j2l-rOahjx-ZUKmAg',
      display_model: 'article',
      location: '/article/artsy-editorial-from-pittsburgh-to-promise-the-friendship-and-flight',
      about: 'Jun 17, 2015 ... In 1949, two young, aspiring artists, Philip Pearlstein and Andy Warhol, bought \nbus tickets out of Pittsburgh. They arrived in New York with a few ...'
    }
    filename = path.resolve __dirname, "../result.jade"
    @render = jade.compile(fs.readFileSync(filename), { filename: filename })

  it 'doesnt allow unsafe xss-ey html', ->
    @fixture.about = '<script>alert(1)</script>'
    html = @render(result: new SearchResult @fixture)
    html.should.not.containEql '<script>'
