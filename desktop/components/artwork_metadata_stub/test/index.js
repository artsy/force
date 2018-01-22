import cheerio from 'cheerio'
import fs from 'fs'
import jade from 'jade'
import path from 'path'

function render (locals) {
  const filename = path.resolve(__dirname, '../index.jade')
  return jade.compile(
    fs.readFileSync(filename),
    { filename }
  )(locals)
}

describe('metadata template', () => {
  describe('without a partner', () => {
    let partnerlessArtwork
    beforeEach(() => {
      partnerlessArtwork = {
        date: '2018',
        title: 'A Cat Has No Name',
        partner: null
      }
    })

    it('renders auction closed if the auction is closed', () => {
      const $ = cheerio.load(render({ artwork: partnerlessArtwork }))
      $.text().should.containEql('A Cat Has No Name, 2018')
      $('.artwork-metadata-stub__partner').length.should.eql(0)
    })
  })
  describe('auction artwork', () => {
    let auctionArtwork
    beforeEach(() => {
      auctionArtwork = {
        date: '2007',
        title: 'My Artwork',
        partner: {
          type: 'Auction House',
          href: '/partner/auction-partner'
        },
        sale: {
          is_auction: true,
          is_closed: true,
          is_live_open: false,
          is_open: false,
          is_preview: false
        },
        sale_artwork: {
          opening_bid: {
            display: '$100'
          },
          counts: {
            bidder_positions: 0
          }
        }
      }
    })

    it('renders auction closed if the auction is closed', () => {
      const $ = cheerio.load(render({ artwork: auctionArtwork }))
      $.text().should.containEql('My Artwork, 2007')
      $('.artwork-metadata-stub__bid-now').text().should.containEql('Auction closed')
      $('.artwork-metadata-stub__sale-message').length.should.eql(0)
    })

    it('renders enter live auction if the auction is live', () => {
      auctionArtwork.sale.is_closed = false
      auctionArtwork.sale.is_live_open = true
      const $ = cheerio.load(render({ artwork: auctionArtwork }))
      $.text().should.containEql('My Artwork, 2007')
      $('.artwork-metadata-stub__bid-now').text().should.containEql('Enter Live Auction')
      $('.artwork-metadata-stub__sale-message').length.should.eql(0)
    })

    it('renders the opening bid if the auction is in preview', () => {
      auctionArtwork.sale.is_closed = false
      auctionArtwork.sale.is_preview = true
      const $ = cheerio.load(render({ artwork: auctionArtwork }))
      $.text().should.containEql('My Artwork, 2007')
      $('.artwork-metadata-stub__bid-now').text().should.containEql('$100')
      $('.artwork-metadata-stub__sale-message').length.should.eql(0)
    })

    it('renders "Sold" if artwork is sold', () => {
      auctionArtwork.is_sold = true
      const $ = cheerio.load(render({ artwork: auctionArtwork }))
      $.text().should.containEql('My Artwork, 2007')
      $('.artwork-metadata-stub__contact.artwork-metadata-stub__line').text().should.containEql('Sold')
      $('.artwork-metadata-stub__bid-now').length.should.eql(0)
    })

    describe('auction is open', () => {
      beforeEach(() => {
        auctionArtwork.sale.is_closed = false
        auctionArtwork.sale.is_open = true
      })

      it('renders the opening bid if the auction is open and has no bids', () => {
        const $ = cheerio.load(render({ artwork: auctionArtwork }))
        $.text().should.containEql('My Artwork, 2007')
        $('.artwork-metadata-stub__bid-now').text().should.containEql('$100')
        $('.artwork-metadata-stub__sale-message').length.should.eql(0)
      })

      it('renders the number of bids if the auction is open and has bids', () => {
        auctionArtwork.sale_artwork.counts = { bidder_positions: 3 }
        auctionArtwork.sale_artwork.highest_bid = { display: '$200' }
        const $ = cheerio.load(render({ artwork: auctionArtwork }))
        $.text().should.containEql('My Artwork, 2007')
        $('.artwork-metadata-stub__bid-now').text().should.containEql('$200')
        $('.artwork-metadata-stub__bid-now').text().should.containEql('(3 bids)')
        $('.artwork-metadata-stub__sale-message').length.should.eql(0)
      })
    })
  })
})
