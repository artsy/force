import { titleAndYear } from '../utils/artwork'

describe('titleAndYear', () => {
  it('returns empty string without title or year', () => {
    titleAndYear(null, null).should.equal('')
    titleAndYear('', '').should.equal('')
    titleAndYear(null, '').should.equal('')
    titleAndYear('', null).should.equal('')
  })

  it('renders correctly with just a date', () => {
    titleAndYear(null, '1905').should.equal('1905')
    titleAndYear('', '1905').should.equal('1905')
  })

  it('renders correctly with just a title', () => {
    titleAndYear('My Artwork', null).should.equal('<em>My Artwork</em>')
    titleAndYear('My Artwork', '').should.equal('<em>My Artwork</em>')
  })

  it('renders correctly with both title and date', () => {
    titleAndYear('My Artwork', '1905').should.equal('<em>My Artwork</em>, 1905')
  })
})
