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

  it('generates jsonLD matching the Product schema for artwork from a gallery partner', () => {
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
        availability: 'for sale',
        seller: 'Artstar',
      },
    }

    helper.convertArtworkToJSONLD(data.artwork).should.eql(jsonLD)
  })

  it('generates jsonLD matching the Creative Work schema for artworks from an institution partner', () => {
    data.artwork.partner.type = 'Institution'

    const jsonLD = {
      '@context': 'http://schema.org',
      '@type': 'CreativeWork',
      image: '/images/pic.jpg',
      description: 'Some contemporary artwork!',
      url: 'undefined/artwork/yee-wong-exploding-powder-movement-blue-and-pink',
    }

    helper.convertArtworkToJSONLD(data.artwork).should.eql(jsonLD)
  })
})
