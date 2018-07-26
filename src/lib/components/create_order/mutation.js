module.exports = `
  mutation createOrder($partnerId: String!, $currencyCode: String!, $artworkId: String!, $priceCents: Int!, $quantity: Int!){
    createOrder(
      input: {
        partnerId: $partnerId,
        currencyCode: $currencyCode,
        lineItems: [{
          artworkId: $artworkId,
          priceCents: $priceCents,
          quantity: $quantity
        }]
      }
    ) {
      result {
        order {
          id
        }
      }
    }
}
`
