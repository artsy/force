import { Box, Join, Pill, Spacer } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { compact } from "lodash"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { HoverDetails_artwork } from "v2/__generated__/HoverDetails_artwork.graphql"

interface HoverDetailsProps {
  artwork: HoverDetails_artwork
}

const HoverDetails: FC<HoverDetailsProps> = ({ artwork }) => {
  const labels = compact([
    artwork.attributionClass?.name,
    artwork.mediumType?.filterGene?.name,
  ])
  const pills = labels.map((label, index) => ({
    id: `${artwork.internalID}-pill-${index}`,
    label,
  }))

  if (pills.length === 0) {
    return null
  }

  return (
    <HoverContainer>
      <Join separator={<Spacer mr={0.5} />}>
        {pills.map((pill, index) => {
          // Truncate text for last pill
          if (index === pills.length - 1) {
            return (
              <TruncatedTextPill key={pill.id} variant="filter" disabled>
                {pill.label}
              </TruncatedTextPill>
            )
          }

          return (
            <Pill key={pill.id} variant="filter" disabled>
              {pill.label}
            </Pill>
          )
        })}
      </Join>
    </HoverContainer>
  )
}

const HoverContainer = styled(Box)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: ${themeGet("colors.white100")};
`

const TruncatedTextPill = styled(Pill)`
  overflow: hidden;
  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const HoverDetailsFragmentContainer = createFragmentContainer(
  HoverDetails,
  {
    artwork: graphql`
      fragment HoverDetails_artwork on Artwork {
        internalID
        attributionClass {
          name
        }
        mediumType {
          filterGene {
            name
          }
        }
      }
    `,
  }
)
