benv = require 'benv'
rewire = require 'rewire'
activatePulldowns = rewire '../index'

describe 'activatePulldowns', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
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
      activatePulldowns.__set__ 'isTouchDevice', -> false
      activatePulldowns()

    it 'sets the data-mode of the elements', ->
      $('.hover-pulldown').attr('data-mode').should.equal 'hover'
