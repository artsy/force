import _metaphysics from 'lib/metaphysics.coffee'
import query from './mutation'

// FIXME: Rewire
let metaphysics = _metaphysics

interface CreateOrderInput {
  user: any
  partnerId: string
  currencyCode: string
  artworkId: string
  priceCents: number
  quantity: number
}

export const createOrder = (input: CreateOrderInput) => {
  const {
    user,
    partnerId,
    currencyCode,
    artworkId,
    priceCents,
    quantity,
  } = input
  if (user == null) {
    return
  }
  const send = {
    query,
    variables: { partnerId, currencyCode, artworkId, priceCents, quantity },
    req: { user },
  }

  metaphysics(send)
    .then(({ createOrder: { result: { order } } }) => {
      alert(`created order with id: ${order.id}`)
      location.assign(`/order2/${order.id}/shipping`)
    })
    .catch(console.error.bind(console))
}
