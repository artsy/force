import { formatCategoryValueForSubmission } from "Apps/Consign/Routes/SubmissionFlow/Utils/acceptableCategoriesForSubmission"
import { useCreateSubmission } from "Apps/Sell/Mutations/useCreateSubmission"
import { useSystemContext } from "System/SystemContext"
import { getENV } from "Utils/getENV"
import { ConsignmentAttributionClass } from "__generated__/CreateConsignSubmissionMutation.graphql"
import { useCreateSubmissionFromArtworkQuery } from "__generated__/useCreateSubmissionFromArtworkQuery.graphql"
import { fetchQuery, graphql } from "react-relay"

// This function is used to create a submission from an artwork
// It fetches the artwork data and then creates a submission
// If the submission already exists, it returns the submission ID
export const useCreateSubmissionFromArtwork = () => {
  const {
    submitMutation: submitCreateSubmissionMutation,
  } = useCreateSubmission()
  const { relayEnvironment } = useSystemContext()

  const createSubmissionFromArtwork = async (artworkID: string) => {
    // fetch artwork data

    const artworkResponse = await fetchQuery<
      useCreateSubmissionFromArtworkQuery
    >(
      relayEnvironment,
      graphql`
        query useCreateSubmissionFromArtworkQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            artist {
              internalID
              name
            }
            consignmentSubmission {
              internalID
            }
            mediumType {
              name
            }
            date
            title
            medium
            attributionClass {
              name
            }
            editionNumber
            editionSize
            height
            width
            depth
            metric
            provenance
            collectorLocation {
              city
              state
              country
              countryCode
              postalCode
            }
          }
        }
      `,
      { artworkID }
    ).toPromise()

    const artwork = artworkResponse?.artwork

    if (!artwork) {
      return null
    }

    // check if submission already exists
    if (artwork.consignmentSubmission?.internalID) {
      return artwork.consignmentSubmission.internalID
    }

    // create submission

    const submission = await submitCreateSubmissionMutation({
      variables: {
        input: {
          artistID: artwork.artist?.internalID ?? "",
          title: artwork.title ?? "",
          medium: artwork.medium ?? "",
          category: artwork.mediumType?.name
            ? formatCategoryValueForSubmission(artwork.mediumType.name)
            : null,
          year: artwork.date ?? "",
          attributionClass:
            (artwork.attributionClass?.name
              ?.replace("_", " ")
              .toLowerCase() as ConsignmentAttributionClass) ?? "",
          editionNumber: artwork.editionNumber ?? "",
          editionSize: artwork?.editionSize ? +artwork?.editionSize : undefined,
          height: artwork.height ?? "",
          width: artwork.width ?? "",
          depth: artwork.depth ?? "",
          dimensionsMetric: artwork.metric ?? "in",
          provenance: artwork.provenance ?? "",
          locationCity: artwork.collectorLocation?.city,
          locationCountry: artwork.collectorLocation?.country,
          locationState: artwork.collectorLocation?.state,
          locationCountryCode: artwork.collectorLocation?.countryCode,
          locationPostalCode: artwork.collectorLocation?.postalCode,

          sessionID: getENV("SESSION_ID"),
          state: "DRAFT",

          myCollectionArtworkID: artworkID,

          // TODO: Chack if we need to pass these values
          // utmMedium: utmParams?.utmMedium,
          // utmSource: utmParams?.utmSource,
          // utmTerm: utmParams?.utmTerm,
        },
      },
    })

    return submission?.createConsignmentSubmission?.consignmentSubmission
      ?.externalId
  }

  return { createSubmissionFromArtwork }
}
