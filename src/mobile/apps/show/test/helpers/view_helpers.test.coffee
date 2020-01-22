sinon = require 'sinon'
Show = require '../../../../models/show'
{ fabricate } = require '@artsy/antigravity'
ViewHelper = require '../../helpers/view_helpers.coffee'

describe 'toJSONLD', ->
  context 'when show has location', ->
    beforeEach ->
      show = new Show fabricate 'show'
      @jsonLD = ViewHelper.toJSONLD(show)

    it 'jsonld has the show name', ->
      @jsonLD.name.should.containEql('Inez & Vinoodh')

    it 'jsonld has the show url', ->
      @jsonLD.url.should.containEql('/show/gagosian-gallery-inez-and-vinoo')

    it 'jsonld has the image', ->
      @jsonLD.image.should.containEql('/local/partner_show_images/51f6a51d275b24a787000c36/1/:version.jpg')

    it 'jsonld has the show dates', ->
      @jsonLD.startDate.should.containEql('2013-07-12')
      @jsonLD.endDate.should.containEql('2013-08-23')

    it 'jsonld has the address', ->
      @jsonLD.location['@type'].should.eql('Place')
      @jsonLD.location.address['@type'].should.eql('PostalAddress')
      @jsonLD.location.address.streetAddress.should.eql('529 W 20th St.2nd Floor')
      @jsonLD.location.address.addressLocality.should.eql('New York')
      @jsonLD.location.address.addressRegion.should.eql('NY')
      @jsonLD.location.address.postalCode.should.eql('10011')

  context 'when show does not have location', ->
    beforeEach ->
      show = new Show fabricate('show', location: null)
      @jsonLD = ViewHelper.toJSONLD(show)
    it 'set jsonLD to null', ->
      (@jsonLD == undefined).should.equal(true)
      
    

