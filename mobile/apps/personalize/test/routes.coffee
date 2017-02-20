sinon = require 'sinon'
routes = require '../routes'

describe "#index", ->
  it 'should render the index template when a user is present', ->
    routes.index { user: {} }, { render: renderStub = sinon.stub() }
    renderStub.args[0][0].should.equal 'index'

  it 'should redirect to the root if the user is not present', ->
    routes.index {}, { redirect: redirectStub = sinon.stub() }
    redirectStub.args[0][0].should.equal '/'
