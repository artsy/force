import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeaderImage_fair } from "v2/__generated__/FairHeaderImage_fair.graphql"
import { FullBleed } from "v2/Components/FullBleed"
import styled from "styled-components"

const Container = styled(FullBleed)`
  position: relative;
  overflow: hidden;
`

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

interface FairHeaderImageProps {
  fair: FairHeaderImage_fair
}

export const FairHeaderImage: React.FC<FairHeaderImageProps> = ({
  fair: { image },
}) => {
  if (!image) return null

  return (
    <Container bg="black10" height={600}>
      <picture>
        <source srcSet={image.lg.srcSet} media="(min-width: 1200px)" />
        <source srcSet={image.md.srcSet} media="(min-width: 700px)" />
        <source srcSet={image.sm.srcSet} media="(max-width: 700px)" />
        <Image src={image.sm.src} alt="" loading="lazy" />
      </picture>
    </Container>
  )
}

export const FairHeaderImageFragmentContainer = createFragmentContainer(
  FairHeaderImage,
  {
    fair: graphql`
      fragment FairHeaderImage_fair on Fair {
        image {
          sm: cropped(width: 480, height: 600, version: "wide") {
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
