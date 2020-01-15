sinon = require 'sinon'
Inquiry = require '../../models/inquiry'
{ fabricate } = require '@artsy/antigravity'

describe 'Inquiry', ->

  beforeEach ->
    @inquiry = new Inquiry fabricate 'artwork_inquiry_request'

  describe '#validate', ->

    it 'ensures a name and email for inquiries with a session', ->
      @inquiry.set session_id: 'foobar', name: null
      @inquiry.validate(@inquiry.toJSON()).should.containEql 'Please include a valid name'

    it 'allows valid emails and names', ->
      @inquiry.set session_id: 'foobar', name: 'Craig', email: 'craigspaeth@gmail.com'
      (@inquiry.validate(@inquiry.toJSON())?).should.not.be.ok()

    it 'doesnt complain about trailing/leading whitespace', ->
      @inquiry.set session_id: 'foobar', name: 'Craig', email: 'craigspaeth@gmail.com '
      (@inquiry.validate(@inquiry.toJSON())?).should.not.be.ok()
