benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'

describe 'activatePulldowns', ->
  describe '#activatePulldown', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        $('body').html """
          <span class="hover-pulldown">
            More
            <div class="hover-pulldown-menu">
              <a href="#">About Artsy</a>
            </div>
          </span>
        """
        done()

    after ->
      benv.teardown()

    describe 'touch devices', ->
      before ->
        activatePulldowns = rewire '../index'
        activatePulldowns.__set__ 'isTouchDevice', -> true
        activatePulldowns()

      it 'sets the data-mode of the elements', ->
        $('.hover-pulldown').attr('data-mode').should.equal 'touch'

      it 'inserts a backdrop and activates the element when tapped', ->
        $('.hover-pulldown-backdrop').should.have.lengthOf 0

        $('.hover-pulldown').click()
        $('.hover-pulldown-backdrop').should.have.lengthOf 1

        $('.hover-pulldown').data('state').should.equal 'active'

      it 'removes the backdrop and deactivates the element when tapped off', ->
        $('.hover-pulldown').click()
        $('.hover-pulldown').attr('data-state').should.equal 'active'
        $('.hover-pulldown-backdrop').click()
        $('.hover-pulldown').attr('data-state').should.equal 'inactive'
        $('.hover-pulldown-backdrop').should.have.lengthOf 0

      it 'only adds one backdrop despite being tapped multiple times', ->
        $('.hover-pulldown').click()
        $('.hover-pulldown').click()
        $('.hover-pulldown').click()
        $('.hover-pulldown-backdrop').should.have.lengthOf 1

    describe 'non-touch devices', ->
      before ->
        activatePulldowns = rewire '../index'
        activatePulldowns.__set__ 'isTouchDevice', -> false
        activatePulldowns()

      it 'sets the data-mode of the elements', ->
        $('.hover-pulldown').attr('data-mode').should.equal 'hover'

  describe '#dismissStatic', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        $('body').html """
          <span class="hover-pulldown" data-state='static' data-cookie='monster'>
            More

            <div class="hover-pulldown-static">
              A description of the contents of 'More'
            </div>

            <div class="hover-pulldown-menu">
              <a href="#">About Artsy</a>
            </div>
          </span>
        """
        done()

    after ->
      benv.teardown()

    beforeEach ->
      activatePulldowns = rewire '../index'
      activatePulldowns.__set__ 'Cookies', @Cookies = set: sinon.stub(), get: sinon.stub()
      activatePulldowns()

    afterEach ->
      $('.hover-pulldown').off()

    it 'checks on and ticks the dismissal', ->
      @Cookies.get.args[0][0].should.equal 'monster'
      @Cookies.set.args[0].should.eql ['monster', 1, expires: 31536000]

    it 'sets the dismissal limit on mouseenter', ->
      $('.hover-pulldown').trigger 'mouseenter'
      @Cookies.set.args[1].should.eql ['monster', 15, expires: 31536000]
