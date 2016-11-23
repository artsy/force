import metaphysics from '../../lib/metaphysics'
import Auction from '../../models/auction.coffee'

export const index = async (req, res) => {
  const {me} = await metaphysics({
    query: `{
      me {
        id
        bidders(sale_id: "${req.params.id}") {
          qualified_for_bidding
        }
      }
    }`,
    req: req
  })

  const {sale} = await metaphysics({
    query: `{
    sale(id: "${req.params.id}") {
      id
      name
      start_at
      end_at
      live_start_at
      status
      start_at
      description
      cover_image {
        cropped(width: 1800 height: 600 version: "wide") {
          url
        }
      }
    }
    }`})
  res.locals.sd.AUCTION = sale
  const newAuction = new Auction(sale)
  res.render('index', {auction: newAuction, me: me})
}

