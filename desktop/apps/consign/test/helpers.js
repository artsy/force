import { formattedLocation } from '../helpers'

describe('helpers', () => {
  describe('formattedLocation', () => {
    it('returns the correct string when all fields exist', () => {
      formattedLocation('Maine', 'New York', 'USA').should.eql('Maine, New York, USA')
    })
    it('returns the correct string when some fields exist', () => {
      formattedLocation('Maine', 'USA').should.eql('Maine, USA')
    })
    it('returns the correct string when no fields exist', () => {
      formattedLocation(null, null, null).should.eql('')
    })
  })
})
