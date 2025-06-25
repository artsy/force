import { Box, Stack } from "@artsy/palette"
import { TopContextBar } from "Components/TopContextBar"
import type { ArtworkTopContextBarShowQuery } from "__generated__/ArtworkTopContextBarShowQuery.graphql"
import type * as React from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

interface ArtworkTopContextBarShowProps {
  id: string
}

export const ArtworkTopContextBarShow: React.FC<
  ArtworkTopContextBarShowProps
> = ({ id }) => {
  const data = useLazyLoadQuery<ArtworkTopContextBarShowQuery>(
    graphql`
      query ArtworkTopContextBarShowQuery($id: String!) {
        show(id: $id) {
          name
          href
          status
          thumbnail: coverImage {
            url
          }
          partner {
            ... on Partner {
              name
            }
            ... on ExternalPartner {
              name
            }
          }
        }
      }
    `,
    { id },
    { fetchPolicy: "store-or-network" },
  )

  const { show } = data

  if (!show?.status) return null

  const statusMessage = {
    running: "Current show",
    closed: "Past show",
    upcoming: "Upcoming show",
  }[show.status]

  return (
    <TopContextBar
      href={show.href}
      src={show.thumbnail?.url}
      displayBackArrow
      preferHistoryBack
    >
      <Stack gap={1} flexDirection="row">
        {show.name}
        <Box as="span" color="mono60">
          {statusMessage}
          {show.partner?.name ? ` at ${show.partner.name}` : null}
        </Box>
      </Stack>
    </TopContextBar>
  )
}
