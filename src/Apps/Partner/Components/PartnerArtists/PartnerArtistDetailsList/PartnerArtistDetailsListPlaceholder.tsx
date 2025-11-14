import { PartnerArtistDetailsPlaceholder } from "Apps/Partner/Components/PartnerArtists/PartnerArtistDetails/PartnerArtistDetailsPlaceholder"
import { Join, Skeleton, Spacer } from "@artsy/palette"
import type * as React from "react"

export interface PartnerArtistDetailsListPlaceholderProps {
  count: number
}

export const PartnerArtistDetailsListPlaceholder: React.FC<
  React.PropsWithChildren<PartnerArtistDetailsListPlaceholderProps>
> = ({ count }) => {
  return (
    <Skeleton>
      <Join separator={<Spacer y={4} />}>
        {[...Array(count)].map((_, i) => (
          <PartnerArtistDetailsPlaceholder key={i} />
        ))}
      </Join>
    </Skeleton>
  )
}
