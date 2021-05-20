import React from "react"
import { Match, RedirectException, RouteRenderArgs } from "found"
import { hasSections as showMarketInsights } from "v2/Apps/Artist/Components/MarketInsights/MarketInsights"
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

  const showArtistInsights =
    showMarketInsights(artist) || artist?.insights?.length > 0

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

  return <Component {...props} />
}
