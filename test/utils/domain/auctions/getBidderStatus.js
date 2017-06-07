import { getBidderStatus } from '../../../../utils/domain/auctions/getBidderStatus'

describe('getBidderStatus', () => {
  it('returns qualified if you are qualfied', () => {
    const me = {
      bidders: [
        {
          qualified_for_bidding: true
        }
      ]
    }

    const auction = {
      is_registration_closed: false
    }
    getBidderStatus(me, auction).should.equal('qualified-to-bid')
  })

  it('it returns qualified if you are qualified and registration is closed', () => {
    const me = {
      bidders: [
        {
          qualified_for_bidding: true
        }
      ]
    }

    const auction = {
      is_registration_closed: true
    }

    getBidderStatus(me, auction).should.equal('qualified-to-bid')
  })

  it('it returns registration-pending if you have registered and registration is closed', () => {
    const me = {
      bidders: [
        {
          qualified_for_bidding: false
        }
      ]
    }

    const auction = {
      is_registration_closed: true
    }

    getBidderStatus(me, auction).should.equal('registration-pending')
  })

  it('it returns registration-pending if registration is not closed but you are awaiting approval', () => {
    const me = {
      bidders: [
        {
          qualified_for_bidding: false
        }
      ]
    }

    const auction = {
      is_registration_closed: false
    }

    getBidderStatus(me, auction).should.equal('registration-pending')
  })

  it('returns registration closed if registration is closed and you have no bidders', () => {
    const me = {
      bidders: []
    }

    const auction = {
      is_registration_closed: true
    }

    getBidderStatus(me, auction).should.equal('registration-closed')
  })

  it('returns logged-out if you are logged out and registration is not closed', () => {
    const auction = {
      is_registration_closed: false
    }

    getBidderStatus(null, auction).should.equal('logged-out')
  })

  it('returns logged-in if you have a me object and registration is not closed', () => {
    const auction = {
      is_registration_closed: false
    }

    getBidderStatus({}, auction).should.equal('logged-in')
  })

  it('returns approval-required if approval is required and you are logged in', () => {
    const auction = {
      is_registration_closed: false,
      require_bidder_approval: true
    }

    getBidderStatus({}, auction).should.equal('approval-required')
  })

  it('returns approval-required if approval is required and you are logged out', () => {
    const auction = {
      is_registration_closed: false,
      require_bidder_approval: true
    }

    getBidderStatus(null, auction).should.equal('approval-required')
  })
})
