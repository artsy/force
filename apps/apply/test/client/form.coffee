sinon = require 'sinon'
Backbone = require 'backbone'
Form = require '../../client/models/form'

describe 'Form', ->
  before ->
    @form = new Form

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'serializes data properly for Salesforce', ->
    @form.save foo: 'bar', bar: ['baz', 'qux']
    Backbone.sync.args[0][1].attributes.should.eql {
      oid: '00DC0000000PWQJ'
      foo: 'bar'
      bar: 'baz;qux;'
    }

  it 'validates attributes', ->
    Form.validate({
      first_name: 'foo'
      last_name: 'bar'
      utm_whatever: 'baz'
      '00NC0000005RNdW': 'inline'
    }).should.eql {
      first_name: 'foo'
      last_name: 'bar'
      '00NC0000005RNdW': 'inline'
    }
