// const sinon = require('sinon')
const helper = require('../helper')
const { data } = require('./fixtures/artwork.json')

describe('Artwork helpers', () => {
  it('#compactObject', () => {
    const artworkObj = {
      name: 'Untitled',
      image: 'images/pic.jpg',
      url: '',
      depth: undefined,
    }

    const actualObj = {
      name: 'Untitled',
      image: 'images/pic.jpg',
    }
    helper.compactObject(artworkObj).should.eql(actualObj)
  })

  it('generates jsonLD matching the Product schema for artwork from an gallery', () => {
    const jsonLD = {
      '@context': 'http://schema.org',
      '@type': 'Product',
      image: '/images/pic.jpg',
      description: 'Some contemporary artwork!',
      url: 'undefined/artwork/yee-wong-exploding-powder-movement-blue-and-pink',
      productionDate: '1999',
      offers: {
        '@type': 'Offer',
        price: '$150',
        priceCurrency: undefined,
        availability: 'for sale',
        seller: 'Artstar',
      },
    }

    helper.convertArtworkToJSONLD(data.artwork).should.eql(jsonLD)
  })
})
