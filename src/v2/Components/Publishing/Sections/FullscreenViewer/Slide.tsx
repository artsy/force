import { unica } from "v2/Assets/Fonts"
import { pMedia } from "v2/Components/Helpers"
import { omit } from "lodash"
import React from "react"
import styled, { StyledFunction } from "styled-components"
import { resize } from "v2/Utils/resizer"
import { Caption } from "./Caption"

interface ImageProps {
  src: string
}

export const Slide = props => {
  const newProps = omit(props, ["section", "index", "total", "isCaptionOpen"])
  const section = props.section
  const src = resize(section.url || section.image, { width: 1200 })
  return (
    <div {...newProps}>
      <SlideContainer>
        <Title>{section.setTitle || ""}</Title>
        <Image src={src} />
        <Caption
          open={props.isCaptionOpen}
          section={section}
          total={props.total}
          index={props.index}
        />
      </SlideContainer>
    </div>
  )
}

const SlideContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`
const Img: StyledFunction<ImageProps> = styled.div
const Image = Img`
  display: block;
  background: url(${props => props.src}) no-repeat center;
  background-size: contain;
  flex: 1;
  margin: 50px 60px;
  ${pMedia.sm`
    margin: 20px 0 80px 0;
  `}
`
const Title = styled.div`
  min-height: 25px;
  padding: 30px 60px 0 60px;
  ${unica("s40")};
  ${pMedia.sm`
    padding: 20px 60px 0 20px;
    ${unica("s19")}
  `};
`
