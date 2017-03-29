sinon = require 'sinon'
loggerFormat = require '../../lib/logger_format'

describe 'logger format', ->

  it 'logs 200 messages green', ->
    tokens =
      status: -> 200
      method: -> 'GET'
      url: -> 'https://artsy.net'
      'response-time': -> 1000
      'remote-addr': -> '0.0.0.0'
      'user-agent': -> 'Mozilla'
    loggerFormat(tokens, {}, {}).should.equal '\u001b[34mGET\u001b[39m \u001b[32mhttps://artsy.net 200\u001b[39m \u001b[36m1000ms\u001b[39m \u001b[37m0.0.0.0\u001b[39m "\u001b[37mMozilla\u001b[39m"'

  it 'logs 300 messages in cyan', ->
    tokens =
      status: -> 300
      method: -> 'GET'
      url: -> 'https://artsy.net'
      'response-time': -> 1000
      'remote-addr': -> '0.0.0.0'
      'user-agent': -> 'Mozilla'
    loggerFormat(tokens, {}, {}).should.equal '\u001b[34mGET\u001b[39m \u001b[36mhttps://artsy.net 300\u001b[39m \u001b[36m1000ms\u001b[39m \u001b[37m0.0.0.0\u001b[39m "\u001b[37mMozilla\u001b[39m"'

  it 'logs 400 messages in yellow', ->
    tokens =
      status: -> 400
      method: -> 'GET'
      url: -> 'https://artsy.net'
      'response-time': -> 1000
      'remote-addr': -> '0.0.0.0'
      'user-agent': -> 'Mozilla'
    loggerFormat(tokens, {}, {}).should.equal '\u001b[34mGET\u001b[39m \u001b[33mhttps://artsy.net 400\u001b[39m \u001b[36m1000ms\u001b[39m \u001b[37m0.0.0.0\u001b[39m "\u001b[37mMozilla\u001b[39m"'

  it 'logs 500 messages in red', ->
    tokens =
      status: -> 500
      method: -> 'GET'
      url: -> 'https://artsy.net'
      'response-time': -> 1000
      'remote-addr': -> '0.0.0.0'
      'user-agent': -> 'Mozilla'
    loggerFormat(tokens, {}, {}).should.equal '\u001b[34mGET\u001b[39m \u001b[31mhttps://artsy.net 500\u001b[39m \u001b[36m1000ms\u001b[39m \u001b[37m0.0.0.0\u001b[39m "\u001b[37mMozilla\u001b[39m"'

  it 'defaults no status in white', ->
    tokens =
      status: -> null
      method: -> 'GET'
      url: -> 'https://artsy.net'
      'response-time': -> 1000
      'remote-addr': -> '0.0.0.0'
      'user-agent': -> 'Mozilla'
    loggerFormat(tokens, {}, {}).should.equal '\u001b[34mGET\u001b[39m \u001b[37mhttps://artsy.net null\u001b[39m \u001b[36m1000ms\u001b[39m \u001b[37m0.0.0.0\u001b[39m "\u001b[37mMozilla\u001b[39m"'
