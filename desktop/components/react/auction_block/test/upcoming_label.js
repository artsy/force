import moment from 'moment'
import upcomingLabel from '../utils/upcoming_label'

describe('#upcomingLabel', () => {
  it('returns the correct label for an online-only auction that has yet to open', () => {
    upcomingLabel(
      '2017-03-15T10:00:00+00:00',
      '2017-05-15T10:00:00+00:00',
      null,
      false,
      false,
      true
    ).should.eql('Auction opens Mar 15, 6:00 AM EDT')
  })

  it('returns the correct label for a live auction that has yet to open', () => {
    upcomingLabel(
      '2017-03-15T10:00:00+00:00',
      null,
      '2017-05-15T10:00:00+00:00',
      false,
      false,
      true
    ).should.eql('Auction opens Mar 15, 6:00 AM EDT')
  })

  it('returns the correct label for an auction that has yet to open for live bidding', () => {
    upcomingLabel(
      '2017-03-15T10:00:00+00:00',
      null,
      '2017-05-15T10:00:00+00:00',
      false,
      false,
      false
    ).should.eql('Auction opens for live bidding May 15, 6:00 AM EDT')
  })

  it('returns the correct label for an auction that is open for live bidding', () => {
    upcomingLabel(
      '2017-03-13T10:00:00+00:00',
      null,
      '2017-03-15T10:00:00+00:00',
      false,
      true,
      false
    ).should.eql('Auction open for live bidding')
  })

  it('returns the correct label for an auction that is closed', () => {
    upcomingLabel(
      '2017-03-15T10:00:00+00:00',
      null,
      '2017-05-15T10:00:00+00:00',
      true,
      false,
      false
    ).should.eql('Auction closed')
  })

  it('returns the correct label for an online-only auction that has yet to close', () => {
    upcomingLabel(
      '2017-03-15T10:00:00+00:00',
      '2017-05-15T10:00:00+00:00',
      null,
      false,
      false,
      false
    ).should.eql('Auction closes May 15, 6:00 AM EDT')
  })
})
