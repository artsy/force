import { Box, Stack } from "@artsy/palette"
import { TopContextBar } from "Components/TopContextBar"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArtworkTopContextBarShowQuery } from "__generated__/ArtworkTopContextBarShowQuery.graphql"
import type { ArtworkTopContextBarShow_show$data } from "__generated__/ArtworkTopContextBarShow_show.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtworkTopContextBarShowProps {
  show: ArtworkTopContextBarShow_show$data
}

export const ArtworkTopContextBarShow: React.FC<
  ArtworkTopContextBarShowProps
> = ({ show }) => {
  return (
    <TopContextBar
      href={show.href}
      src={show.thumbnail?.url}
      displayBackArrow
      preferHistoryBack
    >
      <Stack gap={1} flexDirection="row">
        {show.name} {show.partner && `- ${show.partner.name}`}
        <Box as="span" color="black60">
          {show.status === "upcoming"
            ? "In upcoming show"
            : show.status === "closed"
              ? "In past show"
              : "In current show"}
        </Box>
      </Stack>
    </TopContextBar>
  )
}

export const ArtworkTopContextBarShowFragmentContainer =
  createFragmentContainer(ArtworkTopContextBarShow, {
    show: graphql`
      fragment ArtworkTopContextBarShow_show on Show {
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
    `,
  })

interface ArtworkTopContextBarShowQueryRendererProps {
  id: string
  children: React.ReactNode
}

export const ArtworkTopContextBarShowQueryRenderer: React.FC<
  ArtworkTopContextBarShowQueryRendererProps
> = ({ id, children }) => {
  return (
    <SystemQueryRenderer<ArtworkTopContextBarShowQuery>
      query={graphql`
        query ArtworkTopContextBarShowQuery($id: String!) {
          show(id: $id) {
            ...ArtworkTopContextBarShow_show
          }
        }
      `}
      variables={{ id }}
      placeholder={<>{children}</>}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return <>{children}</>
        }

        if (!props?.show) {
          return <>{children}</>
        }

        return <ArtworkTopContextBarShowFragmentContainer show={props.show} />
      }}
    />
  )
}
