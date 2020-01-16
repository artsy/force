{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
routes = require '../routes'
Backbone = require 'backbone'

describe 'favorites_following', ->
  beforeEach ->
    @res = render: @renderStub = sinon.stub(), redirect: @redirectStub = sinon.stub(), locals: sd: {}

  describe '#favorites', ->
    it 'renders the placeholder', ->
      routes.favorites { params: {} }, @res
      @renderStub.args[0][0].should.equal 'placeholder'

  describe '#following', ->
    describe 'logged out', ->
      describe 'implemented', ->
        it 'redirects with a redirect_uri param attached', ->
          routes.following { url: '/following/galleries',  params: type: 'galleries' }, @res
          @renderStub.called.should.be.false()
          @redirectStub.args[0][0].should.equal '/log_in?redirect-to=%2Ffollowing%2Fgalleries'

      describe 'not implemented', ->
        it 'renders the placeholder', ->
          routes.following { params: type: 'genes' }, @res
          routes.following { params: type: 'artists' }, @res
          @renderStub.args[0][0].should.equal 'placeholder'
          @renderStub.args[1][0].should.equal 'placeholder'

    describe 'logged in', ->
      describe 'implemented', ->
        it 'renders the index template for galleries, institutions, profiles', ->
          routes.following { user: 'existy', params: type: 'galleries' }, @res
          routes.following { user: 'existy', params: type: 'institutions' }, @res
          routes.following { user: 'existy', params: type: 'profiles' }, @res
          @renderStub.args[0][0].should.equal 'index'
          @renderStub.args[1][0].should.equal 'index'
          @renderStub.args[2][0].should.equal 'index'

      describe 'not implemented', ->
        it 'renders the placeholder template for genes, artists', ->
          routes.following { user: 'existy', params: type: 'genes' }, @res
          routes.following { user: 'existy', params: type: 'artists' }, @res
          @renderStub.args[0][0].should.equal 'placeholder'
          @renderStub.args[1][0].should.equal 'placeholder'
