import _ from 'underscore'

// Logic borrowed from the artwork Backbone model
export function titleAndYear(title, date) {
  return _.compact([
    title && title.length > 0 ? `<em>${title}</em>` : '',
    date
  ]).join(', ')
}
