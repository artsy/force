import { Column, EntityHeader, GridColumns } from "@artsy/palette"
import React from "react"
import { TopContextBar } from "v2/Components/TopContextBar"

export interface BannerProps {
  /** Image for avatar  */
  imageUrl?: string
  /** Fallback partner initials in case image is not there. */
  initials?: string
  /** In auction / at fair / in show */
  meta?: string
  /** Auction / fair / show name */
  name?: string
  /** Partner name */
  subHeadline?: string
  /** Link to auction */
  href?: string
}

export const Banner: React.SFC<BannerProps> = ({
  imageUrl,
  initials,
  meta,
  name,
  subHeadline,
  href,
}) => {
  return (
    <TopContextBar>
      <GridColumns>
        <Column span={8}>
          <EntityHeader
            initials={initials}
            name={[name, subHeadline].filter(Boolean).join(" - ")}
            meta={meta}
            imageUrl={imageUrl}
            href={href}
          />
        </Column>
      </GridColumns>
    </TopContextBar>
  )
}
