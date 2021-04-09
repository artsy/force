import React from "react"
import { PartnerArtistDetailsPlaceholder } from "./PartnerArtistDetailsPlaceholder"

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
