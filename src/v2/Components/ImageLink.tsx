import { Box, Image, SerifProps } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FC } from "react";
import * as React from "react";
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"

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

const ImageContainer = styled(Box)`
  &:hover {
    opacity: 0.9;
  }
`

export const ImageLink: FC<ImageLinkProps> = ({
  to,
  src,
  title,
  subtitle,
  ratio,
  onClick,
}) => {
  return (
    <RouterLink to={to} onClick={onClick}>
      <ImageContainer height={130}>
        <Image src={src} height={130} lazyLoad style={{ objectFit: "cover" }} />
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
    </RouterLink>
  )
}
