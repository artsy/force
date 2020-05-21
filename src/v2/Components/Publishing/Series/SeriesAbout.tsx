import { Box, Flex, Sans } from "@artsy/palette"
import React, { Component } from "react"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"

import { Share } from "v2/Components/Publishing/Byline/Share"
import { PartnerBlock } from "v2/Components/Publishing/Partner/PartnerBlock"
import { Text } from "v2/Components/Publishing/Sections/Text"
import { ArticleData } from "v2/Components/Publishing/Typings"
import { Media } from "v2/Utils/Responsive"
import { getArticleFullHref } from "../Constants"

interface SeriesAboutProps {
  article?: ArticleData
  color?: string
  editDescription?: any
  editSubTitle?: any
  tracking?: TrackingProp
}

@track()
export class SeriesAbout extends Component<SeriesAboutProps> {
  public static defaultProps: Partial<SeriesAboutProps> = {
    color: "black",
  }

  componentDidMount() {
    const textLink = document.querySelector(".SeriesAbout__description a")
    if (textLink) {
      textLink.addEventListener("click", this.onClickFooterLink)
    }
  }

  onClickFooterLink = event => {
    this.props.tracking.trackEvent({
      action: "Click",
      flow: "Partner Footer CTA",
      type: "external_link",
      destination_path: event.currentTarget.href,
    })
  }

  partnerBlock = () => {
    const {
      article: { sponsor },
      color,
    } = this.props
    const sponsorLogo =
      sponsor &&
      (color === "white"
        ? sponsor.partner_light_logo
        : sponsor.partner_dark_logo)

    return (
      <PartnerBlock
        logo={sponsorLogo}
        url={sponsor.partner_logo_link}
        trackingData={{
          type: "external link",
          destination_path: sponsor.partner_logo_link,
        }}
      />
    )
  }

  render() {
    const {
      article: { series, slug, social_title, sponsor, thumbnail_title },
      color,
      editDescription,
      editSubTitle,
    } = this.props

    return (
      <SeriesAboutContainer
        color={color}
        maxWidth="1200px"
        mx="auto"
        width="100%"
        flexDirection={["column", "column", "row", "row"]}
      >
        <Flex
          width={[1, 1, 1 / 3, 1 / 3]}
          justifyContent="space-between"
          flexDirection="column"
        >
          <div>
            <Sans size="8" mb={["10px", "10px", 20, 20]} color={color}>
              {editSubTitle
                ? editSubTitle
                : (series && series.sub_title) || "About the Series"}
            </Sans>

            <Sans size="5" mb={["20px", "20px", 0, 0]}>
              <Share
                url={getArticleFullHref(slug)}
                title={social_title || thumbnail_title}
                color={color}
              />
            </Sans>
          </div>

          <Media greaterThanOrEqual="md">
            {sponsor && <Box mb={1}>{this.partnerBlock()}</Box>}
          </Media>
        </Flex>

        <Flex width={[1, 1, 2 / 3, 2 / 3]} flexDirection="column">
          {editDescription ? (
            <Text layout="standard" color={color}>
              {editDescription}
            </Text>
          ) : (
              <div className="SeriesAbout__description">
                <Text
                  layout="standard"
                  color={color}
                  html={series && series.description}
                />
              </div>
            )}
          <Media lessThan="md">
            {sponsor && <Box mt={60}>{this.partnerBlock()}</Box>}
          </Media>
        </Flex>
      </SeriesAboutContainer>
    )
  }
}

export const SeriesAboutContainer = styled(Flex)``
