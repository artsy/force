import _ from 'underscore'

// Logic borrowed from the artwork Backbone model
export function titleAndYear(artwork) {
  return _.compact([
    artwork.title && artwork.title.length > 0 ? `<em>${artwork.title}</em>` : '',
    artwork.date
  ]).join(', ')
}
