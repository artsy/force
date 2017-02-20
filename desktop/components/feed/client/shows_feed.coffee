_ = require 'underscore'
FeedView = require('./feed.coffee')
PartnerShowButtons = require '../../partner_buttons/show_buttons.coffee'
feedItemsContainerTemplate = -> require('../templates/feed_items_container.jade') arguments...

module.exports = class ShowsFeed extends FeedView

  handleDoneFetching: ->
    shows = @latestItems.map (item) -> item.childModel
    @$('.unrendered-feed-item').each (index, item) =>
      $feedItem = $(item).removeClass 'unrendered-feed-item'
      model = shows[index]
      new PartnerShowButtons
        el: $feedItem.find(".feed-item-top-section")
        model: model
        followProfiles: @followProfiles

    profileIds = shows.map (s) -> s.get('partner')?.default_profile_id
    @followProfiles?.syncFollows profileIds

  render: (items) =>
    @latestItems = items

    @imageWidth = @getImageWidth()

    @$el.html feedItemsContainerTemplate(
      headingText: @headingText
      headingSortOrder: @headingSortOrder
      imageWidth: @imageWidth
      feedItemClass: @feedItemClass
      hideSeeMoreButtons: @hideSeeMoreButtons
      displayPurchase: @displayPurchase
      sd: sd
    )

    @$feedItems = @$('section.feed-items')

    @handleFetchedItems items
    @afterLoadCont() if @afterLoadCont

    @lastItem = @$('.feed-item:last')
    @rendered = true
