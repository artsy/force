import * as React from "react";
import { PartnerArtistDetailsPlaceholder } from "../PartnerArtistDetails"

export interface PartnerArtistDetailsListPlaceholderProps {
  count: number
}

export const PartnerArtistDetailsListPlaceholder: React.FC<PartnerArtistDetailsListPlaceholderProps> = ({
  count,
}) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <PartnerArtistDetailsPlaceholder key={i} />
      ))}
    </>
  )
}
