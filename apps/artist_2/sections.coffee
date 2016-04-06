module.exports = [
  slug: ''
  href: 'artist_2/:id'
  name: 'Overview'
  predicate: -> true
,
  slug: 'cv'
  href: 'artist_2/:id/cv'
  name: 'CV'
  predicate: ({ articles, shows }) -> false
,
  slug: 'works'
  href: 'artist_2/:id/works'
  name: 'Works'
  predicate: ({ artworks }) -> artworks
,
  slug: 'articles'
  href: 'artist_2/:id/articles'
  name: 'Articles'
  predicate: ({ articles }) -> articles
,
  slug: 'biography'
  href: 'artist_2/:id/biography'
  name: 'Biography'
  predicate: ({ biography }) -> biography
,
  slug: 'shows'
  href: 'artist_2/:id/shows'
  name: 'Shows'
  predicate: ({ shows }) -> shows
,
  slug: 'related-artists'
  href: 'artist_2/:id/related-artists'
  name: 'Related Artists'
  predicate: ({ artists, contemporary }) -> artists or contemporary
]