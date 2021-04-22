import React from "react"
import styled from "styled-components"
import { Link, Image, ResponsiveBox } from "@artsy/palette"
import {
  getGoogleMapUrl,
  getGoogleStaticMapImageUrl,
} from "./partnerContactUtils"
import { PartnerContactMap_location } from "v2/__generated__/PartnerContactMap_location.graphql"
import { Media } from "v2/Utils/Responsive"
import { createFragmentContainer, graphql } from "react-relay"

export interface PartnerContactMapProps {
  location: PartnerContactMap_location
}

const StaticMapImage = styled(Image)`
  display: block;
  width: 100%;
  height: 100%;
`

const getAspectWidth = (isMobile: boolean) => (isMobile ? 2 : 1.2)
const getImageHeight = (isMobile: boolean) => (isMobile ? 300 : 480)

export const PartnerContactMap: React.FC<PartnerContactMapProps> = ({
  location,
}) => {
  const mapUrl = getGoogleMapUrl(location)
  const mobileMapImageUrl = getGoogleStaticMapImageUrl(
    location,
    getImageHeight(true) * getAspectWidth(true),
    getImageHeight(true)
  )
  const desktopMapImageUrl = getGoogleStaticMapImageUrl(
    location,
    getImageHeight(false) * getAspectWidth(false),
    getImageHeight(false)
  )

  if (!mobileMapImageUrl || !desktopMapImageUrl || !mapUrl) return null

  return (
    <Link href={mapUrl} target="_blank">
      <Media greaterThan="xs">
        <ResponsiveBox
          aspectWidth={getAspectWidth(false)}
          aspectHeight={1}
          maxWidth="100%"
        >
          <StaticMapImage src={desktopMapImageUrl} alt="" lazyLoad />
        </ResponsiveBox>
      </Media>
      <Media at="xs">
        <ResponsiveBox
          aspectWidth={getAspectWidth(true)}
          aspectHeight={1}
          maxWidth="100%"
        >
          <StaticMapImage src={mobileMapImageUrl} alt="" lazyLoad />
        </ResponsiveBox>
      </Media>
    </Link>
  )
}

export const PartnerContactMapFragmentContainer = createFragmentContainer(
  PartnerContactMap,
  {
    location: graphql`
      fragment PartnerContactMap_location on Location {
        city
        phone
        state
        address
        address2
        postalCode
        displayCountry
        coordinates {
          lat
          lng
        }
      }
    `,
  }
)
