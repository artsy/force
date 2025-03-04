import { Box, Stack } from "@artsy/palette"
import { ArtworkTopContextBarBreadcrumbFragmentContainer } from "Apps/Artwork/Components/ArtworkTopContextBar/ArtworkTopContextBarBreadcrumb"
import { RegistrationAuctionTimerFragmentContainer } from "Apps/Artwork/Components/ArtworkTopContextBar/RegistrationAuctionTimer"
import { TopContextBar } from "Components/TopContextBar"
import { useNavigationHistory } from "System/Contexts/NavigationHistoryContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArtworkTopContextBarDynamicBreadcrumbQuery } from "__generated__/ArtworkTopContextBarDynamicBreadcrumbQuery.graphql"
import type { ArtworkTopContextBarDynamicBreadcrumb_artwork$data } from "__generated__/ArtworkTopContextBarDynamicBreadcrumb_artwork.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export const useDynamicBreadcrumb = ():
  | { isEnabled: true; type: "SALE" | "FAIR" | "SHOW"; id: string }
  | { isEnabled: false; type: null; id: null } => {
  const { previousPath } = useNavigationHistory()

  const [_, type, id] = (previousPath || "").split("/")

  switch (type) {
    case "fair":
      return { isEnabled: true, type: "FAIR" as const, id }
    case "auction":
      return { isEnabled: true, type: "SALE" as const, id }
    case "show":
      return { isEnabled: true, type: "SHOW" as const, id }
    default:
      return { isEnabled: false, type: null, id: null }
  }
}

export interface ArtworkTopContextBarDynamicBreadcrumbProps {
  artwork: ArtworkTopContextBarDynamicBreadcrumb_artwork$data
}

export const ArtworkTopContextBarDynamicBreadcrumb: React.FC<
  React.PropsWithChildren<ArtworkTopContextBarDynamicBreadcrumbProps>
> = ({ artwork }) => {
  switch (artwork.contextMatch?.__typename) {
    case "Sale": {
      const sale = artwork.contextMatch

      return (
        <TopContextBar
          href={sale.href}
          src={sale.coverImage?.url}
          rightContent={
            <RegistrationAuctionTimerFragmentContainer sale={sale} />
          }
          displayBackArrow
          preferHistoryBack
        >
          <Stack gap={1} flexDirection="row">
            {sale.name}{" "}
            {sale.isBenefit || sale.isGalleryAuction || !sale.isAuction
              ? null
              : `- ${sale.partner?.name}`}{" "}
            <Box as="span" color="black60">
              {sale.isAuction ? "In auction" : "In sale"}
            </Box>
          </Stack>
        </TopContextBar>
      )
    }

    case "Show": {
      const show = artwork.contextMatch

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

    case "Fair": {
      const fair = artwork.contextMatch

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

    default: {
      return (
        <ArtworkTopContextBarBreadcrumbFragmentContainer artwork={artwork} />
      )
    }
  }
}

export const ArtworkTopContextBarDynamicBreadcrumbFragmentContainer =
  createFragmentContainer(ArtworkTopContextBarDynamicBreadcrumb, {
    artwork: graphql`
      fragment ArtworkTopContextBarDynamicBreadcrumb_artwork on Artwork
      @argumentDefinitions(
        contextMatchId: { type: "String!" }
        contextMatchType: { type: "ArtworkContextEnum!" }
      ) {
        ...ArtworkTopContextBarBreadcrumb_artwork
        contextMatch(id: $contextMatchId, type: $contextMatchType) {
          __typename
          ...RegistrationAuctionTimer_sale
          ... on Sale {
            name
            href
            isAuction
            isBenefit
            isGalleryAuction
            coverImage {
              url
            }
            partner {
              name
            }
          }
          ... on Fair {
            name
            href
            profile {
              icon {
                url
              }
            }
          }
          ... on Show {
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
      }
    `,
  })

interface ArtworkTopContextBarDynamicBreadcrumbQueryRendererProps {
  id: string
  children: React.ReactNode
  contextMatchId: string
  contextMatchType: "SALE" | "FAIR" | "SHOW"
}

export const ArtworkTopContextBarDynamicBreadcrumbQueryRenderer: React.FC<
  ArtworkTopContextBarDynamicBreadcrumbQueryRendererProps
> = ({ id, contextMatchId, contextMatchType, children }) => {
  return (
    <SystemQueryRenderer<ArtworkTopContextBarDynamicBreadcrumbQuery>
      query={graphql`
        query ArtworkTopContextBarDynamicBreadcrumbQuery(
          $id: String!
          $contextMatchId: String!
          $contextMatchType: ArtworkContextEnum!
        ) {
          artwork(id: $id) {
            ...ArtworkTopContextBarDynamicBreadcrumb_artwork
              @arguments(
                contextMatchId: $contextMatchId
                contextMatchType: $contextMatchType
              )
          }
        }
      `}
      variables={{ id, contextMatchId, contextMatchType }}
      placeholder={<>{children}</>}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return <>{children}</>
        }

        if (!props?.artwork) {
          return <>{children}</>
        }

        return (
          <ArtworkTopContextBarDynamicBreadcrumbFragmentContainer
            artwork={props.artwork}
          />
        )
      }}
    />
  )
}
