module.exports = [
  slug: ''
  href: 'artist_2/:id'
  name: 'Overview'
  predicate: -> true
,
  slug: 'works'
  href: 'artist_2/:id/works'
  name: 'Works'
  predicate: ({ statuses }) -> statuses.artworks
,
  slug: 'cv'
  href: 'artist_2/:id/cv'
  name: 'CV'
  predicate: ({ statuses, partner_shows }) -> statuses.shows && partner_shows.length > 15
,
  slug: 'articles'
  href: 'artist_2/:id/articles'
  name: 'Articles'
  predicate: ({ statuses }) -> statuses.articles
,
  slug: 'biography'
  href: 'artist_2/:id/biography'
  name: 'Biography'
  predicate: ({ statuses }) -> statuses.biography
,
  slug: 'shows'
  href: 'artist_2/:id/shows'
  name: 'Shows'
  predicate: ({ statuses }) -> statuses.shows
,
  slug: 'related-artists'
  href: 'artist_2/:id/related-artists'
  name: 'Related Artists'
  predicate: ({ statuses }) -> statuses.artists or statuses.contemporary
]