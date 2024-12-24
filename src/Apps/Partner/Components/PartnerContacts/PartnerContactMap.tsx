import { Image, ResponsiveBox } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { PartnerContactMap_location$data } from "__generated__/PartnerContactMap_location.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import {
  getGoogleMapUrl,
  getGoogleStaticMapImageUrl,
} from "./partnerContactUtils"

export interface PartnerContactMapProps {
  location: PartnerContactMap_location$data
}

const StaticMapImage = styled(Image)`
  display: block;
  width: 100%;
  height: 100%;
`

const aspectWidth = 2
const imageHeight = 300

export const PartnerContactMap: React.FC<
  React.PropsWithChildren<PartnerContactMapProps>
> = ({ location }) => {
  const mapUrl = getGoogleMapUrl(location)
  const mapImageUrl = getGoogleStaticMapImageUrl(
    location,
    imageHeight * aspectWidth,
    imageHeight,
  )

  if (!mapImageUrl || !mapUrl) return null

  return (
    <RouterLink to={mapUrl} target="_blank">
      <ResponsiveBox aspectWidth={aspectWidth} aspectHeight={1} maxWidth="100%">
        <StaticMapImage src={mapImageUrl} alt="" lazyLoad />
      </ResponsiveBox>
    </RouterLink>
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
  },
)
