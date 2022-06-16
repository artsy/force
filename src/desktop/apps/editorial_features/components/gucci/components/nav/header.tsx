import styled from "styled-components"
import * as React from "react"
import { PartnerInline } from "@artsy/reaction/dist/Components/Publishing/Partner/PartnerInline"
import {
  Clickable,
  CloseIcon,
  Flex,
  MenuIcon,
  Sans,
  Serif,
  media,
} from "@artsy/palette"
import { Media } from "@artsy/reaction/dist/Utils/Responsive"

interface HeaderProps {
  title: string
  isOpen?: boolean
  onOpenMenu?: () => void
  partner_logo: string
  partner_url: string
}

export const Header: React.SFC<HeaderProps> = props => {
  const { title, isOpen, onOpenMenu, partner_logo, partner_url } = props

  return (
    <HeaderMain justifyContent="space-between" alignItems="center">
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <PartnerInline
        url={partner_url}
        logo={partner_logo}
        trackingData={{
          type: "external link",
          destination_path: partner_url,
        }}
      />

      <Media greaterThan="md">
        <Title size={["5", "5", "5", "6"]}>{title}</Title>
      </Media>

      <BackLink size="3" weight="medium">
        <Media greaterThan="sm">
          <a href="/articles">Back to Editorial</a>
        </Media>
      </BackLink>

      <Media lessThan="lg">
        {onOpenMenu && (
          <Menu
            onClick={onOpenMenu}
            justifyContent="flex-end"
            alignItems="center"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </Menu>
        )}
      </Media>
    </HeaderMain>
  )
}

const Title = styled(Serif)`
  flex: 2;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: -0.25px;
`

const Menu = styled(Clickable)`
  flex: 1;
`

const BackLink = styled(Sans)`
  flex: 1;
  text-align: right;
`

const HeaderMain = styled(Flex)`
  .PartnerInline {
    flex: 1;
    img {
      max-width: 120px;
    }
  }

  ${media.md`
    .PartnerInline{
      img {
        max-width: 100px;
      }
    }
  `};
`
