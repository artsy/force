_ = require 'underscore'
benv = require 'benv'
jade = require 'jade'
path = require 'path'
fs = require 'graceful-fs'
CurrentUser = require '../../../models/current_user'
{ fabricate } = require 'antigravity'
$ = require 'cheerio'

render = (opts) ->
  filename = path.resolve __dirname, "../templates/index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )(_.extend require('./fixture/content.json'), { sd: {}, crop: -> }, opts)

describe 'About templates', ->

  it 'hides the sign up CTAs for logged out users', ->
    $(render user: new CurrentUser fabricate 'user')
      .find('#the-art-world-online').html().should.not.containEql 'Sign up to save'
