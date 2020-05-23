import { Box, Image, Serif, Spacer } from "@artsy/palette"
import React, { SFC } from "react"
import { data as sd } from "sharify"
import { SpaceProps, WidthProps } from "styled-system"

interface ArtistShowBlockItemProps {
  imageUrl: string
  blockWidth: WidthProps["width"]
  name: string
  exhibitionInfo: string
  partner: string
  href: string
  city?: string
  // FIXME: Fix container directly by making responsive
  pr?: SpaceProps["pr"]
  pb?: SpaceProps["pb"]
}

export const ArtistShowBlockItem: SFC<ArtistShowBlockItemProps> = props => {
  const { pr, pb, href, city, imageUrl, exhibitionInfo } = props

  return (
    <Box width={props.blockWidth} height="auto" pr={pr} pb={pb}>
      <a href={sd.APP_URL + href} className="noUnderline">
        <Image width="100%" src={imageUrl} />
        <Spacer my={1} />
        <Serif size="3">{props.name}</Serif>
      </a>
      <Serif size="2" color="black60">
        <a href={sd.APP_URL + href} className="noUnderline">
          {props.partner}
        </a>
      </Serif>
      <Serif size="1" color="black60">
        {city && `${city}, `}
        {exhibitionInfo}
      </Serif>
    </Box>
  )
}
