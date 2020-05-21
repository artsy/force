import { media, Sans } from "@artsy/palette"
import { ArticleData } from "v2/Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"
import { ImageContainer, PartnerBlock } from "../Partner/PartnerBlock"

interface SeriesTitleProps extends React.HTMLProps<HTMLDivElement> {
  article?: ArticleData
  color?: string
  editTitle?: any
}

export const SeriesTitle: React.SFC<SeriesTitleProps> = ({
  article,
  color = "black",
  editTitle,
}) => {
  const { sponsor, title } = article

  return (
    <SeriesTitleContainer color={color}>
      <Sans size={["10", "12", "16"]} element="h1" mb={["2", "3"]}>
        {editTitle ? editTitle : title}
      </Sans>

      {sponsor && (
        <PartnerBlock
          logo={sponsor.partner_light_logo}
          url={sponsor.partner_logo_link}
          trackingData={{
            type: "external link",
            destination_path: sponsor.partner_logo_link,
          }}
        />
      )}
    </SeriesTitleContainer>
  )
}

export const SeriesTitleContainer = styled.div<{ color: string }>`
  color: ${props => props.color};
  text-align: center;

  ${ImageContainer} {
    padding-top: 5px;
    padding-bottom: 40px;

    img {
      margin-left: auto;
      margin-right: auto;
    }
  }

  ${media.md`
    ${ImageContainer} {
      padding-bottom: 0;
    }
  `};
`
