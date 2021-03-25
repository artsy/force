import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerHeaderImage_profile } from "v2/__generated__/PartnerHeaderImage_profile.graphql"
import { FullBleed } from "v2/Components/FullBleed"
import styled from "styled-components"
import { Box } from "@artsy/palette"
import { MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT } from "v2/Components/NavBar"

const Container = styled(FullBleed)`
  position: fixed;
  overflow: hidden;
  z-index: -1;
`

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

interface PartnerHeaderImageProps {
  profile: PartnerHeaderImage_profile
}

export const PartnerHeaderImage: React.FC<PartnerHeaderImageProps> = ({
  profile,
}) => {
  if (!profile || !profile.image) return null
  const { image } = profile

  return (
    <>
      <Box height={[280, 600]} />

      <Container
        top={[MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT]}
        bg="black10"
        height={[280, 600]}
      >
        <picture>
          <source srcSet={image.lg.srcSet} media="(min-width: 1200px)" />
          <source srcSet={image.md.srcSet} media="(min-width: 700px)" />
          <source srcSet={image.sm.srcSet} media="(max-width: 700px)" />
          <Image src={image.sm.src} alt="" loading="lazy" />
        </picture>
      </Container>
    </>
  )
}

export const PartnerHeaderImageFragmentContainer = createFragmentContainer(
  PartnerHeaderImage,
  {
    profile: graphql`
      fragment PartnerHeaderImage_profile on Profile {
        image {
          sm: cropped(width: 480, height: 280, version: "wide") {
            src
            srcSet
          }
          md: cropped(width: 900, height: 600, version: "wide") {
            src
            srcSet
          }
          lg: cropped(width: 1600, height: 600, version: "wide") {
            src
            srcSet
          }
        }
      }
    `,
  }
)
