import { graphql, useFragment } from "react-relay"
import { PrivateArtworkMetadata_artwork$key } from "__generated__/PrivateArtworkMetadata_artwork.graphql"
import {
  Box,
  Clickable,
  Flex,
  HTML,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { useState } from "react"
import ChevronDownIcon from "@artsy/icons/ChevronDownIcon"
import ChevronUpIcon from "@artsy/icons/ChevronUpIcon"
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
        provenance(format: HTML)
        exhibitionHistory(format: HTML)
      }
    `,
    artwork
  )

  const isFirstItemExpanded = Boolean(
    data.conditionDescription?.details &&
      data.provenance &&
      data.exhibitionHistory
  )

  const isSecondItemExpanded = Boolean(
    !data.conditionDescription?.details &&
      data.provenance &&
      data.exhibitionHistory
  )

  const isThirdItemExpanded = Boolean(
    !data.conditionDescription?.details &&
      !data.provenance &&
      data.exhibitionHistory
  )

  return (
    <>
      {data.conditionDescription?.details && (
        <>
          <MetadataDetailItem title="Condition" expanded={isFirstItemExpanded}>
            <HTML variant="sm">{data.conditionDescription?.details}</HTML>
          </MetadataDetailItem>

          <Separator my={2} />
        </>
      )}

      {data.provenance && (
        <>
          <MetadataDetailItem
            title="Provenance"
            expanded={isSecondItemExpanded}
          >
            <HTML variant="sm" html={data.provenance} />
          </MetadataDetailItem>

          <Separator my={2} />
        </>
      )}

      {data.exhibitionHistory && (
        <MetadataDetailItem
          title="Exhibition History"
          expanded={isThirdItemExpanded}
        >
          <HTML variant="sm" html={data.exhibitionHistory} />
        </MetadataDetailItem>
      )}
    </>
  )
}

interface MetadataDetailItemProps {
  title: string
  children: React.ReactNode
  expanded?: boolean
}

const MetadataDetailItem: React.FC<MetadataDetailItemProps> = ({
  title,
  children,
  expanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded)

  return (
    <Box>
      <Clickable onClick={() => setIsExpanded(!isExpanded)} width="100%">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Text variant="md">{title}</Text>
          {isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </Flex>
      </Clickable>

      {isExpanded && (
        <>
          <Spacer y={2} />

          {children}
        </>
      )}
    </Box>
  )
}
