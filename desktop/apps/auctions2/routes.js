import AuctionReminders from 'desktop/components/auction_reminders/fetch.coffee'

export function index (req, res, next) {
  res.render('index.jsx', {
    basePath: res.app.get('views'),
    locals: {
      ...res.locals,
      myActiveBids: ['a', 'b', 'c']
    },
    templates: {
      meta: 'meta.jade',
      myActiveBids: 'my_active_bids.jade'
    }
  })
}

export function redirectAuction (req, res, next) {
  res.redirect(301, req.url.replace('auction', 'auctions'))
}

export async function reminders (req, res, next) {
  const auctionReminders = new AuctionReminders()

  try {
    const response = await auctionReminders.fetch()
    res.send(response)
  } catch (error) {
    next(error)
  }
}
