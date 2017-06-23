import AuctionReminders from 'desktop/components/auction_reminders/fetch.coffee'
import Index from './templates/index.jsx'
import renderReactLayout from 'desktop/components/react/utils/render_react_layout'

export function index (req, res, next) {
  const layout = renderReactLayout({
    basePath: res.app.get('views'),
    blocks: {
      head: 'meta.jade',
      body: Index
    },
    locals: res.locals
  })

  res.send(layout)
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
