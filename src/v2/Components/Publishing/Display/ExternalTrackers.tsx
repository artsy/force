import React from "react"
import styled from "styled-components"

export const PixelTracker = props => {
  const { unit, date } = props
  const url = unit.pixel_tracking_code
  if (!url) {
    return null
  }

  return (
    <TrackerImage
      width={1}
      height={1}
      src={replaceWithCacheBuster(url, date)}
    />
  )
}

const TrackerImage = styled.img`
  display: none;
`

export const replaceWithCacheBuster = (url, date) => {
  return url.replace("[timestamp]", date)
}
