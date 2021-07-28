import {
  Column,
  EntityHeader,
  EntityHeaderProps,
  GridColumns,
} from "@artsy/palette"
import React from "react"
import { TopContextBar } from "v2/Components/TopContextBar"

export interface BannerProps extends EntityHeaderProps {
  subHeadline?: string | null
}

export const Banner: React.FC<BannerProps> = ({
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
