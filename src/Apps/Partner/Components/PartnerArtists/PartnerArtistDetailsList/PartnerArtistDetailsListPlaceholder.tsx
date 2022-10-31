import * as React from "react"
import { PartnerArtistDetailsPlaceholder } from "Apps/Partner/Components/PartnerArtists/PartnerArtistDetails"
import { Join, Separator } from "@artsy/palette"

export interface PartnerArtistDetailsListPlaceholderProps {
  count: number
}

export const PartnerArtistDetailsListPlaceholder: React.FC<PartnerArtistDetailsListPlaceholderProps> = ({
  count,
}) => {
  return (
    <Join separator={<Separator />}>
      {[...Array(count)].map((_, i) => (
        <PartnerArtistDetailsPlaceholder key={i} />
      ))}
    </Join>
  )
}
