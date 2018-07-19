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

export const createOrder = async (input: CreateOrderInput) => {
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

  return metaphysics(send).catch(console.error.bind(console))
}
