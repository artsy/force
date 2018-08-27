import { toJSONLD } from 'desktop/apps/artist2/components/Meta.js'

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
      })
    })

    it('Omits empty keys', () => {
      const jsonLD = toJSONLD(artist, 'https://artsy.net')
      expect(Object.keys(jsonLD).includes('deathday')).toBe(false)
    })
  })
})
