import { toJSONLD } from 'desktop/apps/artist2/components/Meta'

describe('Meta', () => {
  const artist = {
    id: 'claes-oldenburg',
    name: 'Claes Oldenburg',
    nationality: 'Swedish',
    birthday: '1929',
    deathday: null,
    gender: 'male',
    href: '/artist/claes-oldenburg',
    meta: {
      description:
        'Find the latest shows, biography, and artworks for sale by Claes Oldenburg. “I am for an art that is political-erotical-mystical, that does something more th…',
    },
    image: {
      large:
        'https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA/large.jpg',
    },
    artworks_connection: {
      edges: [
        {
          node: {
            title:
              "'25 Years Studio',  1993, SIGNED by the BIG-8 Contemporary Artists, Gemini G.E.L.",
            availability: 'for sale',
            description: null,
            category: 'Drawing, Collage or other Work on Paper',
            price_currency: 'USD',
            is_price_range: false,
            href:
              '/artwork/robert-rauschenberg-25-years-studio-1993-signed-by-the-big-8-contemporary-artists-gemini-gel',
            image: {
              small:
                'https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/small.jpg',
            },
            partner: {
              name: 'VINCE fine arts/ephemera',
              href: '/vince-fine-arts-slash-ephemera',
            },
          },
        },
      ],
    },
  }

  describe('#toJSONLD', () => {
    it('Constructs a json object from data', () => {
      const jsonLD = toJSONLD(artist, 'https://artsy.net')

      expect(JSON.parse(jsonLD)).toEqual({
        '@context': 'http://schema.org',
        '@type': 'Person',
        additionalType: 'Artist',
        name: 'Claes Oldenburg',
        url: 'https://artsy.net/artist/claes-oldenburg',
        gender: 'male',
        image:
          'https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA/large.jpg',
        birthDate: '1929',
        mainEntityOfPage: 'https://artsy.net/artist/claes-oldenburg',
        description:
          'Find the latest shows, biography, and artworks for sale by Claes Oldenburg. “I am for an art that is political-erotical-mystical, that does something more th…',
        nationality: {
          '@type': 'Country',
          name: 'Swedish',
        },
        makesOffer: [
          {
            '@type': 'Offer',
            availability: 'InStock',
            itemOffered: {
              '@type': 'Product',
              additionalType: 'Drawing, Collage or other Work on Paper',
              brand: {
                '@type': 'Person',
                name: 'Claes Oldenburg',
              },
              image: {
                '@type': 'ImageObject',
                thumbnailUrl:
                  'https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/small.jpg',
              },
              name:
                "'25 Years Studio',  1993, SIGNED by the BIG-8 Contemporary Artists, Gemini G.E.L.",
              url:
                'https://artsy.net/artwork/robert-rauschenberg-25-years-studio-1993-signed-by-the-big-8-contemporary-artists-gemini-gel',
            },
            priceCurrency: 'USD',
            seller: {
              '@context': 'http://schema.org',
              '@type': 'ArtGallery',
              name: 'VINCE fine arts/ephemera',
              url: 'https://artsy.net/vince-fine-arts-slash-ephemera',
            },
          },
        ],
      })
    })

    it('Omits empty keys', () => {
      const jsonLD = toJSONLD(artist, 'https://artsy.net')
      expect(Object.keys(jsonLD).includes('deathday')).toBe(false)
    })
  })
})
