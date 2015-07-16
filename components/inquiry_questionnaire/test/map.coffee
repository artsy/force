CurrentUser = require '../../../models/current_user'
State = require '../../branching_state'
map = require '../map'

xdescribe 'map', ->
  beforeEach ->
    @state = new State map
    @user = new CurrentUser # logged in user
    @state.inject user: @user, state: @state

  describe 'without prequalification or already prequalified', ->
    it 'follows the path to the end', ->
      @user.set prequalified: true, collector_level: 1
      @state.current().should.equal 'commercial_interest'
      @user.set collector_level: 3 # is_collector => true
      @state.next().should.equal 'basic_info'
      @state.next().should.equal 'artists_in_collection'
      @state.next().should.equal 'done'
      @state.isEnd().should.be.true()
