import { Box, Button, Clickable, Spacer, Text } from "@artsy/palette"
import { useMyCollectionArtworkFormContext } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormContext"
import { ArtworkModel } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkModel"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { Masonry } from "Components/Masonry"
import { useFormikContext } from "formik"
import { Fragment } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { MyCollectionArworkSearchQuery } from "__generated__/MyCollectionArworkSearchQuery.graphql"

interface MyCollectionArworkSearchProps {
  artistId: string
  onClick: (artwork: any) => void
  query?: string | null
}

export const MyCollectionArworkSearch: React.FC<MyCollectionArworkSearchProps> = ({
  artistId,
  onClick,
  query,
}) => {
  const { onSkip } = useMyCollectionArtworkFormContext()
  const { setFieldValue } = useFormikContext<ArtworkModel>()

  const trimmedQuery = query?.trimStart()

  const handleSkip = () => {
    setFieldValue("title", trimmedQuery)

    onSkip?.()
  }

  const input = trimmedQuery ? { keyword: trimmedQuery } : null

  const data = useLazyLoadQuery<MyCollectionArworkSearchQuery>(
    graphql`
      query MyCollectionArworkSearchQuery(
        $artistID: String!
        $input: FilterArtworksInput
      ) {
        artist(id: $artistID) {
          filterArtworksConnection(first: 30, input: $input) {
            edges {
              node {
                medium
                date
                depth
                editionSize
                editionNumber
                height
                images {
                  height
                  isDefault
                  imageURL
                  width
                }
                id
                internalID
                isEdition
                category
                metric
                title
                width
                ...GridItem_artwork
              }
            }
          }
        }
      }
    `,
    { artistID: artistId, input }
  )

  const artworks = extractNodes(data.artist?.filterArtworksConnection)

  if (artworks.length === 0) {
    return <NoResults handleSkip={handleSkip} query={trimmedQuery} />
  }

  return (
    <>
      <Text variant={["xs", "sm-display"]}>
        Or skip ahead to{" "}
        <Clickable onClick={handleSkip} textDecoration="underline">
          <Text>add artwork details.</Text>
        </Clickable>
      </Text>

      <Spacer y={4} />

      <Masonry columnCount={[2, 3, 4]} style={{ opacity: 1 }}>
        {artworks.map(artwork => {
          return (
            <Fragment key={artwork.internalID}>
              <ArtworkGridItemFragmentContainer
                artwork={artwork}
                hideSaleInfo
                showSaveButton={false}
                showHoverDetails={false}
                disableRouterLinking
                onClick={() => onClick(artwork)}
              />

              <Spacer y={4} />
            </Fragment>
          )
        })}
      </Masonry>
    </>
  )
}

const NoResults: React.FC<{
  handleSkip: () => void
  query?: string | null
}> = ({ handleSkip, query }) => {
  return (
    <Box my={4}>
      <Text variant={["xs", "sm-display"]} flexWrap="wrap">
        We couldn’t find a work named “
        <Text display="inline-block" color="blue100">
          {query}
        </Text>
        “
      </Text>

      <Spacer y={4} />

      <Button width={300} variant="secondaryNeutral" onClick={handleSkip}>
        Go to Add Artwork Details
      </Button>
    </Box>
  )
}
