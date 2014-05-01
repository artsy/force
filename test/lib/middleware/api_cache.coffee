rewire = require 'rewire'
sinon = require 'sinon'
ensureSSL = rewire '../../../lib/middleware/ensure_ssl'

describe 'API cache middleware', ->

  it 'overrides the ARTSY_URL to use the locals'