_ = require 'underscore'
module.exports = [
  slug: ''
  href: 'artist/:id'
  name: 'Overview'
  predicate: (statuses) -> _.find _.values statuses, (v) -> v
,
  slug: 'works'
  href: 'artist/:id/works'
  name: 'Works'
  predicate: ({ artworks }) -> artworks
,
  slug: 'cv'
  href: 'artist/:id/cv'
  name: 'CV'
  predicate: ({ cv }) -> cv
,
  slug: 'articles'
  href: 'artist/:id/articles'
  name: 'Articles'
  predicate: ({ articles }) -> articles
,
  slug: 'biography'
  href: 'artist/:id/biography'
  name: 'Biography'
  predicate: ({ biography }) -> biography
,
  slug: 'shows'
  href: 'artist/:id/shows'
  name: 'Shows'
  predicate: ({ shows }) -> shows
,
  slug: 'auction-results'
  href: 'artist/:id/auction-results'
  name: 'Auction Results'
  predicate: ({ auction_lots }) -> auction_lots
,
  slug: 'related-artists'
  href: 'artist/:id/related-artists'
  name: 'Related Artists'
  predicate: ({ artists, contemporary }) -> artists or contemporary
]
