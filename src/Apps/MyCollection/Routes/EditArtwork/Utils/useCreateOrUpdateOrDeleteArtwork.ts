import { MyCollectionCreateArtworkInput } from "__generated__/useCreateArtworkMutation.graphql"
import { MyCollectionUpdateArtworkInput } from "__generated__/useUpdateArtworkMutation.graphql"
import { MyCollectionDeleteArtworkInput } from "__generated__/useDeleteArtworkMutation.graphql"
import { useCreateArtwork } from "../Mutations/useCreateArtwork"
import { useUpdateArtwork } from "../Mutations/useUpdateArtwork"
import { useDeleteArtwork } from "../Mutations/useDeleteArtwork"

export type ArtworkInput =
  | MyCollectionCreateArtworkInput
  | MyCollectionUpdateArtworkInput

export const useCreateOrUpdateOrDeleteArtwork = () => {
  const { submitMutation: createArtwork } = useCreateArtwork()
  const { submitMutation: updateArtwork } = useUpdateArtwork()
  const { submitMutation: deleteArtwork } = useDeleteArtwork()

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

  const deleteArtworkInside = async (
    artwork: MyCollectionDeleteArtworkInput
  ) => {
    await deleteArtwork({
      variables: {
        input: artwork as MyCollectionDeleteArtworkInput,
      },
      rejectIf: res => {
        return res.myCollectionDeleteArtwork?.artworkOrError?.mutationError
      },
    })
  }

  return { createOrUpdateArtwork, deleteArtworkInside }
}
