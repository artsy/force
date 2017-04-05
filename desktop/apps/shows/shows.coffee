_ = require 'underscore'
PageableCollection = require '../../components/pageable_collection/index'
PartnerShows = require '../../collections/partner_shows'

module.exports = class PageablePartnerShows extends PageableCollection
  _.extendOwn @prototype, PartnerShows::

  fetchUntilEnd: PageableCollection::fetchUntilEnd
