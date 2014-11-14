_ = require 'underscore'
moment = require 'moment'
template = _.template """
  <div class='last-modified-section'>
    <span>Page Last Modified:</span>
    <time class='last-modified' datetime='<%= metaDate %>' itemprop='datePublished'><%= displayDate %></time>
  </div>
"""
jsonLdTemplate = -> require('../../../../components/main_layout/templates/json_ld.jade') arguments...

updateJsonLd = ({ artist, metaDate }) ->
  return unless metaDate?
  artist.set lastModified: metaDate
  $('#json-ld').remove()
  $('body').append jsonLdTemplate(jsonLD: JSON.stringify(artist.toJSONLD()))

render = (templateData) ->
  $('#artist-related-last-modified').html template(templateData)
  updateJsonLd(templateData)

module.exports = (artist, artworks) ->
  grabDates = ([xs, attr]) -> _.map xs.pluck(attr), Date.parse

  date = moment(_.max _.compact _.flatten _.map [
    [artist.related().posts, 'last_promoted_at']
    [artist.related().shows, 'updated_at']
    [artworks, 'published_at']
  ], grabDates)

  render
    artist: artist
    metaDate: date.format('YYYY-MM-DD') if date.isValid()
    displayDate: if date.isValid() then date.format('MMMM Do, YYYY') else 'N/A'
