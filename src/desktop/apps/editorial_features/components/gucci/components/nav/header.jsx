import styled from "styled-components"
import PropTypes from "prop-types"
import React, { Component } from "react"
import Icon from "reaction/Components/Icon"
import { PartnerInline } from "reaction/Components/Publishing/Partner/PartnerInline"
import { media, Flex, Sans, Serif } from "@artsy/palette"
import { Media } from "@artsy/reaction/dist/Utils/Responsive"

export class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    isMobile: PropTypes.bool,
    isOpen: PropTypes.bool,
    onOpenMenu: PropTypes.any,
    partner_logo: PropTypes.string,
    partner_url: PropTypes.string,
  }

  render() {
    const {
      title,
      isMobile,
      isOpen,
      onOpenMenu,
      partner_logo,
      partner_url,
    } = this.props

    return (
      <HeaderMain justify-content="space-between" align-items="center">
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
            <a href="/articles">Back to Magazine</a>
          </Media>
        </BackLink>

        <Media lessThan="lg">
          {onOpenMenu && (
            <Menu
              onClick={onOpenMenu}
              justifyContent="flex-end"
              alignItems="center"
            >
              <Icon
                name={isOpen ? "close" : "list"}
                color="black"
                fontSize={isOpen ? "25px" : "32px"}
              />
            </Menu>
          )}
        </Media>
      </HeaderMain>
    )
  }
}

const Title = styled(Serif)`
  flex: 2;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: -0.25px;
`

const Menu = styled(Flex)`
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
