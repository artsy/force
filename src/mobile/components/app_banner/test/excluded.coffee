sinon = require 'sinon'
excluded = require '../excluded'

describe 'excluded', ->
  it 'returns true or false depending on the current path', ->
    sinon.stub(excluded, 'path').returns '/personalize'
    excluded.check().should.be.true()
    excluded.path.restore()

    sinon.stub(excluded, 'path').returns '/personalize/'
    excluded.check().should.be.true()
    excluded.path.restore()

    sinon.stub(excluded, 'path').returns '/personalize/categories'
    excluded.check().should.be.true()
    excluded.path.restore()

    sinon.stub(excluded, 'path').returns '/'
    excluded.check().should.be.false()
    excluded.path.restore()

    sinon.stub(excluded, 'path').returns '/about'
    excluded.check().should.be.false()
    excluded.path.restore()

    sinon.stub(excluded, 'path').returns '/article/cool-article'
    excluded.check().should.be.false()
    excluded.path.restore()
