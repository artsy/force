Backbone = require 'backbone'
sharify = require 'sharify'
{ HEAPDUMP, TESTING_MEMORY_LEAK } = require "./config"

if TESTING_MEMORY_LEAK
  _sharify = sharify
  Backbone.Collection::_addReference = ->
  sharify = (req, res, next) ->
    res.once 'end', ->
      res.locals.sharify = null
      res.locals.sd = null
    _sharify req, res, next

if HEAPDUMP
  heapdump = require 'heapdump'
  i = 0
  write = ->
    heapdump.writeSnapshot "#{__dirname}/public/heapdumps/#{i+=1}.heapsnapshot"
  setInterval write, 1000 * 60
  write()
