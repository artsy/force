module.exports = [
  slug: ''
  href: 'artist/:id'
  name: 'Overview'
  predicate: -> true
,
  slug: 'works'
  href: 'artist/:id/works'
  name: 'Works'
  predicate: ({ artworks }) -> artworks
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
  slug: 'related-artists'
  href: 'artist/:id/related-artists'
  name: 'Related Artists'
  predicate: ({ artists, contemporary }) -> artists or contemporary
]