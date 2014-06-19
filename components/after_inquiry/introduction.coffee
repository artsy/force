_ = require 'underscore'
moment = require 'moment'
human = require 'humanparser'

module.exports = class Introduction
  constructor: (user, bookmarks) ->
    @user = user
    @bookmarks = bookmarks

  blurb: ->
    blurb = []
    # Sentence:
    blurb.push @user.get 'name'
    if @user.isCollector()
      blurb.push 'is a collector'
      blurb.push 'and' if @user.id and !@user.hasLocation()
    else
      blurb.push 'is' if @user.hasLocation()
    blurb.push "based in #{@location()}" if @user.hasLocation()
    if @user.id # Logged in:
      blurb.push 'and' if @user.hasLocation()
      blurb.push "has been an Artsy member since #{moment(@user.get('created_at')).format('MMMM YYYY')}."
    else # Logged out:
      if @user.hasLocation() or @user.isCollector()
        blurb.push '.'
      else # Kill this sentence
        blurb = []
    # Sentence:
    blurb.push "#{@firstName()}’s profession is noted as “#{@user.get('profession')}.”" if @user.has 'profession'
    # Sentence:
    blurb.push "#{@firstName()}’s collection includes #{@collectionSentence()}." if @collection()?.length
    blurb = blurb.join(' ').replace ' .', '.'
    return blurb unless _.isEmpty(blurb)

  firstName: ->
    @__firstName__ ?= human.parseName(@user.get('name')).firstName

  location: ->
    @__location__ ?=
      if (location = @user.location())
        _.compact([
          location.get 'city'
          location.get 'country'
        ]).join ', '

  collection: ->
    return unless @bookmarks?
    @__collection__ ?= _.pluck @bookmarks.pluck('artist'), 'name'

  collectionSentence: (limit = 3) ->
    artists = _.first(@collection(), limit)
    if @collection().length > limit
      artists.push "#{(remaining = @collection().length - limit)} other artist#{if remaining > 1 then 's' else ''}"
    artists.join(', ').replace /,\s([^,]+)$/, ' and $1'
