_ = require 'underscore'
PageableCollection = require '../../components/pageable_collection/index.coffee'
PartnerShows = require '../../collections/partner_shows.coffee'

module.exports = class PageablePartnerShows extends PageableCollection
  _.extend @prototype, PartnerShows::

  fetchUntilEnd: PageableCollection::fetchUntilEnd
