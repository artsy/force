import { Box, Stack } from "@artsy/palette"
import { TopContextBar } from "Components/TopContextBar"
import type { ArtworkTopContextBarFairQuery } from "__generated__/ArtworkTopContextBarFairQuery.graphql"
import type * as React from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

interface ArtworkTopContextBarFairProps {
  id: string
}

export const ArtworkTopContextBarFair: React.FC<
  ArtworkTopContextBarFairProps
> = ({ id }) => {
  const data = useLazyLoadQuery<ArtworkTopContextBarFairQuery>(
    graphql`
      query ArtworkTopContextBarFairQuery($id: String!) {
        fair(id: $id) {
          name
          href
          profile {
            icon {
              url
            }
          }
        }
      }
    `,
    { id },
    { fetchPolicy: "store-or-network" },
  )

  if (!data.fair) return null

  const { fair } = data

  return (
    <TopContextBar
      href={fair.href}
      src={fair.profile?.icon?.url}
      displayBackArrow
      preferHistoryBack
    >
      <Stack gap={1} flexDirection="row">
        {fair.name}
        <Box as="span" color="mono60">
          At fair
        </Box>
      </Stack>
    </TopContextBar>
  )
}
