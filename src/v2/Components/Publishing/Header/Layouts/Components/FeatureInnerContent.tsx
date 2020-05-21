import { color, Sans, space } from "@artsy/palette"
import { unica } from "v2/Assets/Fonts"
import { pMedia } from "v2/Components/Helpers"
import { Byline } from "v2/Components/Publishing/Byline/Byline"
import {
  Vertical,
  VerticalOrSeriesTitle,
} from "v2/Components/Publishing/Sections/VerticalOrSeriesTitle"
import React from "react"
import styled from "styled-components"
import { FeatureHeaderProps } from "../FeatureHeader"

export const FeatureInnerContent: React.SFC<FeatureHeaderProps> = props => {
  const { article, textColor, editTitle, editVertical } = props
  const { title, hero_section } = article
  const vertical = article.vertical && article.vertical.name
  const isFullscreen = hero_section && hero_section.type === "fullscreen"
  const TextColor = textColor ? textColor : isFullscreen && "white"
  const verticalColor = !vertical ? color("black30") : TextColor || undefined

  return (
    <TextContainer>
      <div>
        <VerticalOrSeriesTitle
          article={article}
          color={verticalColor}
          vertical={vertical || editVertical}
        />
        <Title color={TextColor || undefined}>
          {editTitle || <h1>{title}</h1>}
        </Title>
      </div>
      <FeatureInnerSubContent {...props} />
    </TextContainer>
  )
}

export const TextContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${Vertical} {
    padding-bottom: ${space(1)}px;
  }
`

export const Title = styled.div.attrs<{ color?: string }>({})`
  color: ${props => (props.color ? props.color : color("black100"))};
  ${unica("s100")};
  margin-bottom: 75px;
  letter-spacing: -0.035em;

  ${pMedia.xl`
    ${unica("s80")}
  `};
  ${pMedia.lg`
    ${unica("s65")}
  `};
  ${pMedia.xs`
    ${unica("s45")}
  `};
`

// Deck & Byline exported separately for mobile split layout
export const FeatureInnerSubContent: React.SFC<FeatureHeaderProps> = props => {
  const { article, textColor, date, editDeck } = props
  const { hero_section } = article
  const deck = editDeck || (hero_section && hero_section.deck)
  const isFullscreen = hero_section && hero_section.type === "fullscreen"
  const TextColor = textColor || (isFullscreen ? "white" : color("black100"))

  return (
    <SubContentContainer>
      {deck && (
        <Deck size="3t" weight="medium" color={TextColor}>
          {deck}
        </Deck>
      )}
      <Byline article={article} color={TextColor} date={date && date} />
    </SubContentContainer>
  )
}

export const SubContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
  ${pMedia.sm`
    align-items: flex-start;
    flex-direction: column;
  `};
`

export const Deck = styled(Sans)`
  max-width: 460px;
  margin-right: ${space(3)}px;
  ${pMedia.sm`
    margin-bottom: ${space(3)}px;
  `};
`
