_ = require 'underscore'
rewire = require 'rewire'
sinon = require 'sinon'
robots = rewire '../../../lib/middleware/robots'

describe 'flashMiddleware', ->

  beforeEach ->
    robots.__set__ 'APP_URL', 'https://www.artsy.net'
    @req = {}
    @res = send: sinon.stub()
    @next = sinon.stub()

  it 'dynamically renders a robots.txt', ->
    robots @req, @res, @next
    @res.send.args[0][0].should.containEql 'Sitemap: https://www.artsy.net/sitemap.xml'