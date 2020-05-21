import Colors from "v2/Assets/Colors"
import { unica } from "v2/Assets/Fonts"
import { pMedia } from "v2/Components/Helpers"
import PropTypes from "prop-types"
import React from "react"
import styled, { StyledFunction } from "styled-components"
import { ArtworkCaption } from "../ArtworkCaption"

interface CaptionProps extends React.HTMLProps<HTMLDivElement> {
  section?: any
  total: number
  index: number
  open: boolean
}

interface CaptionOpenProps extends React.HTMLProps<HTMLDivElement> {
  open: boolean
}

export const Caption: React.SFC<CaptionProps> = props => {
  const { index, open, section, total } = props

  const isArtwork = section.type === "artwork"
  const indexText = `${index} of ${total}`

  return (
    <CaptionContainer>
      <CaptionTextContainer>
        <CaptionToggle open={open} />

        <CaptionText open={open}>
          {isArtwork ? (
            <ArtworkCaption artwork={section} isFullscreenCaption linked />
          ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: section.caption,
                }}
              />
            )}
        </CaptionText>
      </CaptionTextContainer>

      <Index>{indexText}</Index>
    </CaptionContainer>
  )
}

const CaptionToggle: React.SFC<CaptionOpenProps> = (props, context) => {
  const toggleMessage = props.open ? "Hide" : "View Caption"

  return (
    <StyledCaptionToggle
      onClick={context.onToggleCaption}
      className="fullscreen-viewer__caption-toggle"
    >
      <span>{toggleMessage}</span>
    </StyledCaptionToggle>
  )
}

CaptionToggle.contextTypes = {
  onToggleCaption: PropTypes.func,
}

const StyledCaptionToggle = styled.div`
  display: none;
  ${pMedia.sm`
    ${unica("s14", "medium")}
    cursor: pointer;
    display: inline-block;
    span {
      border-bottom: 1px solid black;
    }
  `};
`

const CaptionDiv: StyledFunction<CaptionOpenProps> = styled.div

const CaptionText = CaptionDiv`
  ${unica("s16", "medium")}
  a {
    color: black;
  }
  ${props => pMedia.sm`
    ${unica("s14", "medium")}
    display: ${props.open ? "block" : "none"};
    margin-top: ${props.open ? "20px" : "0px"};
  `}
`

const Index = styled.div`
  margin-left: 20px;
  white-space: nowrap;
  ${unica("s16")};
  ${pMedia.sm`
    ${unica("s14")}
  `};
`

const CaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${Colors.gray};
  padding: 30px 60px;

  p {
    margin: 0;
  }

  ${pMedia.sm`
    position: absolute;
    bottom: 0;
    width: 100%;
    max-width: 100vh;
    padding: 20px;
  `};
`

const CaptionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`
