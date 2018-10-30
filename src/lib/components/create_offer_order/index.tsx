// @ts-ignore
import _metaphysics from "lib/metaphysics.coffee"

import query from "./mutation"

// FIXME: Rewire
let metaphysics = _metaphysics

interface CreateOfferOrderInput {
  artworkId: string
  editionSetId: string
  quantity: number
  user: object
}

export const createOfferOrder = async (input: CreateOfferOrderInput) => {
  const { artworkId, editionSetId, quantity, user } = input

  if (user == null) {
    return
  }
  const send = {
    query,
    variables: { artworkId, editionSetId, quantity },
    req: { user },
  }

  return metaphysics(send).catch(console.error.bind(console))
}
