import { Col, Row, Separator, Serif, Spacer } from "@artsy/palette"
import React, { SFC } from "react"
import { Media } from "v2/Utils/Responsive"

interface ArtistShowListItemProps {
  exhibitionInfo: string
  name: string
  partner: string
  city: string
  href: string
}

const FIXME_DOMAIN = "https://www.artsy.net"

export const ArtistShowListItem: SFC<ArtistShowListItemProps> = props => {
  return (
    <>
      <Media at="xs">
        <SmallShowListItem {...props} />
      </Media>
      <Media greaterThan="xs">
        <LargeShowListItem {...props} />
      </Media>
    </>
  )
}

const LargeShowListItem: SFC<ArtistShowListItemProps> = props => {
  const { name, city, exhibitionInfo, href, partner } = props

  return (
    <>
      <Separator mb={4} />
      <Row>
        <Col sm={3}>
          <Serif size="2">
            {city && `${city}, `}
            {exhibitionInfo}
          </Serif>
        </Col>
        <Col sm={6}>
          <Serif size="4">
            <a href={FIXME_DOMAIN + href} className="noUnderline">
              {name}
            </a>
          </Serif>
          <Serif size="2" color="black60">
            <a href={FIXME_DOMAIN + href} className="noUnderline">
              {partner}
            </a>
          </Serif>
        </Col>
        <Col sm={3}>
          <Serif size="2">{city}</Serif>
        </Col>
      </Row>

      <Spacer mb={4} />
    </>
  )
}

const SmallShowListItem: SFC<ArtistShowListItemProps> = props => {
  const { name, city, exhibitionInfo, href, partner } = props

  return (
    <>
      <Separator mb={3} />
      <Serif size="3">
        <a href={FIXME_DOMAIN + href} className="noUnderline">
          {name}
        </a>
      </Serif>
      <Serif size="2" color="black60">
        <a href={FIXME_DOMAIN + props.href} className="noUnderline">
          {partner}
        </a>
      </Serif>
      <Serif size="1" color="black60">
        {city && `${city}, `}
        {exhibitionInfo}
      </Serif>
      <Spacer mb={3} />
    </>
  )
}
