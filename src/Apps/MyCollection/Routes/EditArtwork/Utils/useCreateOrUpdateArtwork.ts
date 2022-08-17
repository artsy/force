import { MyCollectionCreateArtworkInput } from "__generated__/useCreateArtworkMutation.graphql"
import { MyCollectionUpdateArtworkInput } from "__generated__/useUpdateArtworkMutation.graphql"
import { useCreateArtwork } from "../Mutations/useCreateArtwork"
import { useUpdateArtwork } from "../Mutations/useUpdateArtwork"

export type ArtworkInput =
  | MyCollectionCreateArtworkInput
  | MyCollectionUpdateArtworkInput

export const useCreateOrUpdateArtwork = () => {
  const { submitMutation: createArtwork } = useCreateArtwork()
  const { submitMutation: updateArtwork } = useUpdateArtwork()

  const createOrUpdateArtwork = async (artwork: ArtworkInput) => {
    let artworkId: string | undefined

    if ((artwork as MyCollectionUpdateArtworkInput).artworkId) {
      const res = await updateArtwork({
        variables: {
          input: artwork as MyCollectionUpdateArtworkInput,
        },
        rejectIf: res => {
          return res.myCollectionUpdateArtwork?.artworkOrError?.mutationError
        },
      })

      artworkId =
        res.myCollectionUpdateArtwork?.artworkOrError?.artwork?.internalID
    } else {
      const res = await createArtwork({
        variables: {
          input: artwork as MyCollectionCreateArtworkInput,
        },
      })

      artworkId =
        res.myCollectionCreateArtwork?.artworkOrError?.artworkEdge?.node
          ?.internalID
    }

    return artworkId
  }

  return { createOrUpdateArtwork }
}
