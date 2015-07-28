benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
isEigen = rewire '../eigen'

describe 'isEigen', ->
  before (done) ->
    benv.setup ->
      done()

  after ->
    benv.teardown()

  describe '#checkWtih', ->
    beforeEach ->
      sinon.stub isEigen, 'redirect'

    afterEach ->
      isEigen.redirect.restore()

    describe 'EIGEN is true', ->
      before ->
        isEigen.__set__ 'EIGEN', true

      it 'checks to see if we are within EIGEN, redirects to the correct path and returns true', ->
        isEigen.checkWith(mode: 'register').should.be.true()
        isEigen.redirect.args[0][0].should.equal '/sign_up'
        isEigen.checkWith(mode: 'login').should.be.true()
        isEigen.redirect.args[1][0].should.equal '/log_in'

    describe 'EIGEN is false', ->
      before ->
        isEigen.__set__ 'EIGEN', false

      it 'checks to see if we are within EIGEN, returns false, does not redirect', ->
        isEigen.checkWith(mode: 'register').should.be.false()
        isEigen.redirect.called.should.be.false()

    describe 'already on the requested mode/path combination', ->
      before ->
        isEigen.__set__ 'EIGEN', true
        sinon.stub(isEigen, 'path').returns '/sign_up'

      after ->
        isEigen.path.restore()

      it 'does not redirect infinitely', ->
        isEigen.checkWith(mode: 'register').should.be.false()
        isEigen.redirect.called.should.be.false()
        isEigen.checkWith(mode: 'login').should.be.true()
        isEigen.redirect.called.should.be.true()
