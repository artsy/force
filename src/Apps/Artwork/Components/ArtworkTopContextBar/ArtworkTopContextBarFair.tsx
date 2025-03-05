import { Box, Stack } from "@artsy/palette"
import { TopContextBar } from "Components/TopContextBar"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArtworkTopContextBarFairQuery } from "__generated__/ArtworkTopContextBarFairQuery.graphql"
import type { ArtworkTopContextBarFair_fair$data } from "__generated__/ArtworkTopContextBarFair_fair.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtworkTopContextBarFairProps {
  fair: ArtworkTopContextBarFair_fair$data
}

export const ArtworkTopContextBarFair: React.FC<
  ArtworkTopContextBarFairProps
> = ({ fair }) => {
  return (
    <TopContextBar
      href={fair.href}
      src={fair.profile?.icon?.url}
      displayBackArrow
      preferHistoryBack
    >
      <Stack gap={1} flexDirection="row">
        {fair.name}
        <Box as="span" color="black60">
          At fair
        </Box>
      </Stack>
    </TopContextBar>
  )
}

export const ArtworkTopContextBarFairFragmentContainer =
  createFragmentContainer(ArtworkTopContextBarFair, {
    fair: graphql`
      fragment ArtworkTopContextBarFair_fair on Fair {
        name
        href
        profile {
          icon {
            url
          }
        }
      }
    `,
  })

interface ArtworkTopContextBarFairQueryRendererProps {
  id: string
  children: React.ReactNode
}

export const ArtworkTopContextBarFairQueryRenderer: React.FC<
  ArtworkTopContextBarFairQueryRendererProps
> = ({ id, children }) => {
  return (
    <SystemQueryRenderer<ArtworkTopContextBarFairQuery>
      query={graphql`
        query ArtworkTopContextBarFairQuery($id: String!) {
          fair(id: $id) {
            ...ArtworkTopContextBarFair_fair
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

        if (!props?.fair) {
          return <>{children}</>
        }

        return <ArtworkTopContextBarFairFragmentContainer fair={props.fair} />
      }}
    />
  )
}
