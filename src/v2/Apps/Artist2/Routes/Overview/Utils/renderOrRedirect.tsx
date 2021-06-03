import React from "react"
import { RedirectException, RouteRenderArgs } from "found"
import { hasOverviewContent } from "./hasOverviewContent"

export function renderOrRedirect({
  Component,
  props,
  match,
}: RouteRenderArgs): undefined | null | React.ReactElement {
  const isLoading = !(Component && props)

  if (isLoading) {
    return null
  }

  const { artist } = props as any
  const { pathname } = match.location

  if (!artist) {
    return undefined
  }

  const showMarketInsights = () => {
    // Is there a gallery representation section? Is there an auction highlights
    // section? Is there a permanent collections section?
    if (
      artist?.artistPartnersConnection?.edges?.length ||
      artist?.auctionResults?.edges?.length ||
      artist?.collections?.length
    ) {
      return true
    }

    return false
  }

  const showArtistInsights =
    showMarketInsights() || artist?.insights?.length > 0

  const hasArtistContent = hasOverviewContent(artist)

  const alreadyAtWorksForSalePath = pathname.includes(
    `${artist.slug}/works-for-sale`
  )

  const canShowOverview = showArtistInsights || hasArtistContent

  if (pathname === `/artist/${artist.slug}/`) {
    throw new RedirectException(`/artist/${artist.slug}`, 301)
  }

  if (!canShowOverview && !alreadyAtWorksForSalePath) {
    throw new RedirectException(`/artist/${artist.slug}/works-for-sale`, 301)
  }

  // @ts-ignore // FIXME
  return <Component {...props} />
}
