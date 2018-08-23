module.exports = `
  mutation createOrder(
    $artworkId: String!
    $editionSetId: String
    $quantity: Int
  ) {
    createOrderWithArtwork(
      input: {
        artworkId: $artworkId
        editionSetId: $editionSetId
        quantity: $quantity
      }
    ) {
      orderOrError {
        ... on OrderWithMutationSuccess {
          order {
            id
          }
        }
        ... on OrderWithMutationFailure {
          error {
            description
          }
        }
      }
    }
  }
`
