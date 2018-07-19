import _metaphysics from '../../../lib/metaphysics.coffee'
import query from './mutation'

// FIXME: Rewire
let metaphysics = _metaphysics

export const createOrder = (
  user,
  partnerId,
  currencyCode,
  artworkId,
  priceCents,
  quantity
) => {
  if (user === null) {
    return
  }
  const send = {
    query,
    variables: {
      partnerId,
      currencyCode,
      artworkId,
      priceCents,
      quantity,
    },
    req: { user },
  }

  metaphysics(send)
    .then(({ createOrder: { result: { order } } }) => {
      alert(`created order with id: ${order.id}`)
      location.assign(`/order2/${order.id}/shipping`)
    })
    .catch(console.error.bind(console))
}
