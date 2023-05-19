import * as React from "react"
import { Join, Skeleton, Spacer } from "@artsy/palette"
import { PartnerArtistDetailsPlaceholder } from "Apps/Partner/Components/PartnerArtists/PartnerArtistDetails/PartnerArtistDetailsPlaceholder"

export interface PartnerArtistDetailsListPlaceholderProps {
  count: number
}

export const PartnerArtistDetailsListPlaceholder: React.FC<PartnerArtistDetailsListPlaceholderProps> = ({
  count,
}) => {
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
