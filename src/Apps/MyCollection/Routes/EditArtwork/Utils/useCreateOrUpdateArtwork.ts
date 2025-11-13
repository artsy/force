import { useCreateArtwork } from "Apps/MyCollection/Routes/EditArtwork/Mutations/useCreateArtwork"
import { useUpdateArtwork } from "Apps/MyCollection/Routes/EditArtwork/Mutations/useUpdateArtwork"
import type { ArtworkModel } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkModel"
import type { MyCollectionEditArtwork_artwork$data } from "__generated__/MyCollectionEditArtwork_artwork.graphql"
import type {
  ArtworkAttributionClassType,
  MyCollectionCreateArtworkInput,
} from "__generated__/useCreateArtworkMutation.graphql"
import type { MyCollectionUpdateArtworkInput } from "__generated__/useUpdateArtworkMutation.graphql"
import { compact } from "lodash"

export type ArtworkInput =
  | MyCollectionCreateArtworkInput
  | MyCollectionUpdateArtworkInput

export const useCreateOrUpdateArtwork = () => {
  const { submitMutation: createArtwork } = useCreateArtwork()
  const { submitMutation: updateArtwork } = useUpdateArtwork()

  const createOrUpdateArtwork = async (
    values: ArtworkModel,
    artwork?: MyCollectionEditArtwork_artwork$data
  ) => {
    const artworkInputValues = formValuesToMutationInput(values, artwork)

    if ((artworkInputValues as MyCollectionUpdateArtworkInput).artworkId) {
      const res = await updateArtwork({
        variables: {
          input: artworkInputValues as MyCollectionUpdateArtworkInput,
        },
        rejectIf: res => {
          return res.myCollectionUpdateArtwork?.artworkOrError?.mutationError
        },
      })

      return res.myCollectionUpdateArtwork?.artworkOrError?.artwork
    } else {
      const res = await createArtwork({
        variables: {
          input: artworkInputValues as MyCollectionCreateArtworkInput,
        },
      })

      return res.myCollectionCreateArtwork?.artworkOrError?.artworkEdge?.node
    }
  }

  return { createOrUpdateArtwork }
}

const formValuesToMutationInput = (
  values: ArtworkModel,
  artwork?: MyCollectionEditArtwork_artwork$data
): ArtworkInput => {
  // Set edition values for attribution class

  if (values.attributionClass !== "LIMITED_EDITION") {
    values.editionNumber = ""
    values.editionSize = ""
  }

  const externalImageUrls = compact(
    values.newPhotos.flatMap(photo => photo.url || null)
  )

  const collectorLocation = {
    city: values.collectorLocation?.city || null,
    state: values.collectorLocation?.state || null,
    country: values.collectorLocation?.country || null,
    countryCode: values.collectorLocation?.countryCode || null,
  }

  return {
    artworkId: artwork?.internalID,
    artistIds: [values.artistId],
    artists:
      !values.artistId && values.artistName
        ? [{ displayName: values.artistName }]
        : undefined,
    category: values.category,
    date: values.date,
    title: values.title,
    medium: values.medium,
    attributionClass: values.attributionClass
      ?.replace(" ", "_")
      ?.toUpperCase() as ArtworkAttributionClassType,
    editionNumber: values.editionNumber
      ? String(values.editionNumber)
      : undefined,
    editionSize: values.editionSize ? String(values.editionSize) : undefined,
    height: String(values.height),
    width: String(values.width),
    depth: String(values.depth),
    metric: values.metric,
    externalImageUrls,
    pricePaidCents:
      !values.pricePaidDollars || isNaN(Number(values.pricePaidDollars))
        ? undefined
        : Number(values.pricePaidDollars) * 100,
    pricePaidCurrency: values.pricePaidCurrency,
    provenance: values.provenance,
    collectorLocation,
    confidentialNotes: values.confidentialNotes,
  }
}
