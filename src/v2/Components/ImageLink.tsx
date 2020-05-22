import { Box, ResponsiveImage, SerifProps } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import React, { FC } from "react"
import styled from "styled-components"
import { space } from "styled-system"
import { Media } from "v2/Utils/Responsive"

const ImageContainer = styled(Box)`
  position: relative;
`

const HubImage = styled(ResponsiveImage)`
  vertical-align: middle;
`

const ImageOverlay = styled(Box)`
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    color: #fff;
    content: "";
    background: rgba(0, 0, 0, 0.3);
  }
`

const OuterLink = styled(RouterLink)`
  text-decoration: none;

  &:hover {
    .title {
      text-decoration: underline;
    }

    ${ImageOverlay} {
      &::before {
        display: block;
      }
    }
  }

  ${space}
`

interface ImageLinkProps {
  /** Source url for the image */
  src: string

  /** Destination for the hyperlink */
  to: string

  /** Primary text that appears below the image */
  title: React.ReactElement<SerifProps & { className?: string }>

  /** Secondary text that (optionally) appears below the title */
  subtitle?: React.ReactElement<SerifProps>

  /** A number corresponding to the ratio of height/width (inverted from the usual width/height aspect ratio) */
  ratio: number | number[]

  onClick?: () => void
}

export const ImageLink: FC<ImageLinkProps> = ({
  to,
  src,
  title,
  subtitle,
  ratio,
  onClick,
}) => {
  return (
    <OuterLink to={to} onClick={onClick}>
      <ImageContainer>
        <ImageOverlay>
          <HubImage src={src} width="100%" ratio={ratio} />
        </ImageOverlay>
      </ImageContainer>
      {React.cloneElement(title, {
        // kind of like "default props" for a cloned element.
        element: title.props.element || "h3",
        mt: "1",
        mb: "0.5",
        textAlign: "center",
        className: "title",
      })}
      <Media greaterThan="xs">
        {subtitle &&
          React.cloneElement(subtitle, {
            // kind of like "default props" for a cloned element.
            element: title.props.element || "h4",
            textAlign: "center",
          })}
      </Media>
    </OuterLink>
  )
}
