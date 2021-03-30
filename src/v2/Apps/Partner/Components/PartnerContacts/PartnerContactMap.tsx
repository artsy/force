import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Link, Image, ResponsiveBox } from "@artsy/palette"
import {
  getGoogleMapUrl,
  getGoogleStaticMapImageUrl,
} from "./partnerContactUtils"
import { PartnerContactCard_location } from "v2/__generated__/PartnerContactCard_location.graphql"
import { useWindowSize } from "v2/Utils/Hooks/useWindowSize"
import { unitlessBreakpoints } from "@artsy/palette/dist/themes/v3"

export interface PartnerContactMapProps {
  location: PartnerContactCard_location
}

const StaticMapImage = styled(Image)`
  display: block;
  width: 100%;
  height: 100%;
`

export const PartnerContactMap: React.FC<PartnerContactMapProps> = ({
  location,
}) => {
  const [mapImageUrl, setMapImageUrl] = useState<string>()
  const { width } = useWindowSize()
  const isMobile = width <= unitlessBreakpoints.xs
  const aspectWidth = isMobile ? 2 : 1.2
  const mapUrl = getGoogleMapUrl(location)

  useEffect(() => {
    const imageHeight = isMobile ? 300 : 480
    const imageWidth = imageHeight * aspectWidth

    setMapImageUrl(
      getGoogleStaticMapImageUrl(location, imageWidth, imageHeight)
    )
  }, [isMobile])

  if (!mapImageUrl || !mapUrl) return null

  return (
    <Link href={mapUrl} target="_blank">
      <ResponsiveBox aspectWidth={aspectWidth} aspectHeight={1} maxWidth="100%">
        <StaticMapImage src={mapImageUrl} alt="" lazyLoad />
      </ResponsiveBox>
    </Link>
  )
}
