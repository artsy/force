import { graphql, useFragment } from "react-relay"
import { PrivateArtworkMetadata_artwork$key } from "__generated__/PrivateArtworkMetadata_artwork.graphql"
import {
  Box,
  Column,
  GridColumns,
  HTML,
  ReadMore,
  Spacer,
  Text,
} from "@artsy/palette"

interface PrivateArtworkMetadataProps {
  artwork: PrivateArtworkMetadata_artwork$key
}

export const PrivateArtworkMetadata: React.FC<PrivateArtworkMetadataProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkMetadata_artwork on Artwork {
        conditionDescription {
          details
        }
        provenance
        exhibitionHistory
      }
    `,
    artwork
  )

  // TODO: remove (typechecker)
  console.log(data)

  return (
    <GridColumns>
      <Column span={4}>
        {data.conditionHistory?.details && (
          <MetadataDetailItem title="Condition">
            <HTML variant="sm">{data.conditionHistory?.details}</HTML>
          </MetadataDetailItem>
        )}
      </Column>

      <Column span={4}>
        {data.provenance && (
          <MetadataDetailItem title="Provenance">
            <HTML variant="sm">
              <ReadMore
                inlineReadMoreLink={false}
                content={`${data.provenance}`}
                maxChars={200}
              />
            </HTML>
          </MetadataDetailItem>
        )}
      </Column>

      <Column span={4}>
        {data.exhibitionHistory && (
          <MetadataDetailItem title="Exhibition History">
            <HTML variant="sm">
              <ReadMore
                inlineReadMoreLink={false}
                content={`${data.exhibitionHistory}`}
                maxChars={200}
              />
            </HTML>
          </MetadataDetailItem>
        )}
      </Column>
    </GridColumns>
  )
}

interface MetadataDetailItemProps {
  title: string
  children: React.ReactNode
}

const MetadataDetailItem: React.FC<MetadataDetailItemProps> = ({
  title,
  children,
}) => {
  return (
    <Box>
      <Text variant="sm" fontWeight="bold">
        {title}
      </Text>

      <Spacer y={2} />

      {children}
    </Box>
  )
}
