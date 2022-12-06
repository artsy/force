import * as React from "react"
import { PartnerArtistDetailsPlaceholder } from "Apps/Partner/Components/PartnerArtists/PartnerArtistDetails"
import { Join, Skeleton, Spacer } from "@artsy/palette"

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
