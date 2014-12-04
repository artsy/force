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
  predicate: ({ posts, articles }) -> posts or articles
,
  slug: 'shows'
  href: 'artist/:id/shows'
  name: 'Shows'
  predicate: ({ shows, exhibitions }) -> shows or exhibitions
,
  slug: 'publications'
  href: 'artist/:id/publications'
  name: 'Publications'
  predicate: ({ bibliography }) -> bibliography
,
  slug: 'collections'
  href: 'artist/:id/collections'
  name: 'Collections'
  predicate: ({ collections }) -> collections
,
  slug: 'related-artists'
  href: 'artist/:id/related-artists'
  name: 'Related Artists'
  predicate: ({ artists, contemporary }) -> artists or contemporary
]
