{ track } = require '../../../lib/analytics.coffee'

track.impression '"Works For You" page'

$document = $(document)

$document.on 'click', '#for-sale', ->
  track.click 'Toggled "For Sale" on "Works For You" page'

$document.on 'click', '#notifications-manage-follow', ->
  track.click 'Clicked "Manage who you follow" on "Works For You" page'

$document.on 'click', '.notifications-see-more', ->
  track.click 'Clicked "See More" in artwork group on "Works For You" page'
