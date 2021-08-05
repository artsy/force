import React from "react"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"

export const FairOrganizerHeaderImage: React.FC<any> = ({ image }) => {
  if (image.url) {
    return <FullBleedHeader src={image.url} />
  }

  return null
}
