sinon = require 'sinon'
Show = require '../../../../models/show'
{ fabricate } = require 'antigravity'
ViewHelper = require '../../helpers/view_helpers.coffee'

describe 'toJSONLD', ->
  context 'when show has location', ->
    it 'creates jsonLD metedata', ->
      show = new Show fabricate 'show'
      jsonLD = ViewHelper.toJSONLD(show)
      jsonLD.should.eql({
        '@context': 'http://schema.org',
        '@type': 'Event',
        name: 'Inez & Vinoodh',
        image: '/local/partner_show_images/51f6a51d275b24a787000c36/1/:version.jpg',
        url: 'http://artsy.net/show/gagosian-gallery-inez-and-vinoodh1',
        startDate: '2013-07-12T04:00:00.000Z',
        endDate: '2013-08-23T04:00:00.000Z',
        location: Object {
          '@type': 'Place',
          address: Object {
            '@type': 'PostalAddress',
            streetAddress: '529 W 20th St.2nd Floor',
            addressLocality: 'New York',
            addressRegion: 'NY',
            postalCode: '10011'
          }
        }
      })
  context 'when show does not have location', ->
    it 'set jsonLD to null', ->
      show = new Show fabricate('show', location: null)
      jsonLD = ViewHelper.toJSONLD(show)
      (jsonLD == undefined).should.equal(true)
      
    

