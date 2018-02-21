sinon = require 'sinon'
{ index } = require '../routes.js'

describe "#index", ->
  it 'should render the index template when a user is present', ->
    index { user: {} }, {
      render: renderStub = sinon.stub()
      locals: sd: ONBOARDING_TEST: 'control'
    }
    renderStub.args[0][0].should.equal 'index'

  it 'should redirect to the root if the user is not present', ->
    index {}, {
      redirect: redirectStub = sinon.stub()
      locals: sd: ONBOARDING_TEST: 'control'
    }
    redirectStub.args[0][0].should.equal '/'

  it 'should next if they are on the experiment of onboarding test', ->
    index {}, {
      redirect: redirectStub = sinon.stub()
      locals: sd: ONBOARDING_TEST: 'experiment'
    }, next = sinon.stub()
    next.callCount.should.equal 1
