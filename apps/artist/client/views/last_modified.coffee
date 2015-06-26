_ = require 'underscore'
moment = require 'moment'
template = _.template """
  <div class='last-modified-section'>
    <span>Page Last Modified:</span>
    <time class='last-modified' datetime='<%= lastModified %>' itemprop='dateModified'><%= displayDate %></time>
  </div>
"""
jsonLdTemplate = -> require('../../../../components/main_layout/templates/json_ld.jade') arguments...

updateJsonLd = ({ artist, lastModified, createdAt }) ->
  return unless lastModified?
  artist.set lastModified: lastModified, createdAt: createdAt
  $('#json-ld').remove()
  $('body').append jsonLdTemplate(jsonLD: JSON.stringify(artist.toJSONLD()))

render = (templateData) ->
  $('#artist-related-last-modified').html template(templateData)
  updateJsonLd(templateData)

module.exports = (artist, artworks) ->
  grabDates = ([xs, attr]) -> _.map xs.pluck(attr), Date.parse

  allDates = _.compact _.flatten _.map [
    [artist.related().shows, 'updated_at']
    [artworks, 'published_at']
  ], grabDates

  lastModified = moment(_.max allDates)
  createdAt = moment(_.min allDates)

  render
    artist: artist
    createdAt: createdAt.toISOString() if createdAt.isValid()
    lastModified: lastModified.toISOString() if lastModified.isValid()
    displayDate: if lastModified.isValid() then lastModified.format('MMMM Do, YYYY') else 'N/A'
