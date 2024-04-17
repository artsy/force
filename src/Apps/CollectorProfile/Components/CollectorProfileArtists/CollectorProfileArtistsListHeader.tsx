import InfoIcon from "@artsy/icons/InfoIcon"
import { Box, Column, GridColumns, Text, Tooltip } from "@artsy/palette"
import { FC } from "react"
import { Media } from "Utils/Responsive"

interface CollectorProfileArtistsListHeaderProps {}

export const CollectorProfileArtistsListHeader: FC<CollectorProfileArtistsListHeaderProps> = () => {
  return (
    <Media greaterThan="xs">
      <GridColumns
        color="black60"
        borderBottom="1px solid"
        borderColor="black10"
        pb={2}
        gridColumnGap={1}
      >
        <Column span={3}>
          <Text size="sm-display" overflowEllipsis>
            Artist
          </Text>
        </Column>

        <Column span={2}>
          <Text size="sm-display" overflowEllipsis>
            Artworks uploaded
          </Text>
        </Column>

        <Column span={4} display="flex" gap={0.5} alignItems="center">
          <Text size="sm-display" overflowEllipsis>
            Share with the galleries during inquiries
          </Text>

          <Tooltip content="Galleries are more likely to respond if they can see the artists you collect.">
            <Box as="span" style={{ lineHeight: 0 }}>
              <InfoIcon />
            </Box>
          </Tooltip>
        </Column>

        <Column span={2}>
          <Text size="sm-display" overflowEllipsis>
            Follow artist
          </Text>
        </Column>

        <Column span={1} display="flex" justifyContent="flex-end">
          <Text size="sm-display" overflowEllipsis textAlign="right">
            More
          </Text>
        </Column>
      </GridColumns>
    </Media>
  )
}
