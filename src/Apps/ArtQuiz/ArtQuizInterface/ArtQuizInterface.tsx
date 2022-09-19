import {
  HeartIcon,
  CloseIcon,
  ArrowLeftIcon,
  Text,
  Clickable,
  HeartFillIcon,
  Image,
  ClickableProps,
  Flex,
  CSSGrid,
  FullBleed,
  ImageProps,
  TextProps,
  FlexProps,
} from "@artsy/palette"
import { useArtQuizContext } from "Apps/ArtQuiz/ArtQuizContext"
import { processImageUrl } from "Apps/ArtQuiz/ArtQuizInterface/maxHeight"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { FC, useState } from "react"
import styled from "styled-components"
import { flex, grid, GridProps } from "styled-system"

export const ArtQuizInterface: FC = () => {
  const { desktop, mobile } = useNavBarHeight()
  const { currentArtwork } = useArtQuizContext()

  const aspectRatio = currentArtwork.image?.aspectRatio ?? 1
  const width = 445
  const { src, srcSet } = processImageUrl({
    aspectRatio,
    width,
    url: currentArtwork.image?.url,
  })

  return (
    // Should we lift this FullBleed up into the ArtQuizApp?
    <FullBleed
      height={[`calc(100vh - ${mobile}px)`, `calc(100vh - ${desktop}px)`]}
    >
      <CSSGrid
        gridTemplateAreas={[
          `"mobile-header"
          "image"
          "controls"`,
          `"back progress skip"
          ". image ."
          ". controls ."`,
        ]}
        gridTemplateColumns={["1fr", "240px 1fr 240px"]}
        gridTemplateRows={["80px 1fr 80px", "120px 1fr 120px"]}
      >
        <GridClickable
          alignSelf={"center"}
          gridArea={["mobile-header", "back"]}
          justifySelf={["flex-start", "flex-end"]}
          px={[2, 0]}
        >
          <ArrowLeftIcon />
        </GridClickable>
        <GridText
          gridArea={["mobile-header", "progress"]}
          alignSelf="center"
          justifySelf="center"
        >
          1/16
        </GridText>
        <GridClickable
          gridArea={["mobile-header", "skip"]}
          alignSelf="center"
          justifySelf={["flex-end", "flex-start"]}
          px={[2, 0]}
        >
          <CloseIcon />
        </GridClickable>

        <GridImage
          justifySelf="center"
          alt={currentArtwork.title}
          src={src}
          srcSet={srcSet}
          preventRightClick={true}
          gridArea="image"
          py={2}
          px={[0, 2]}
          height="100%"
        />

        <GridFlex
          gridArea="controls"
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <ArtQuizDislikeButton mx={6} />
          <ArtQuizSaveButton slug={currentArtwork.slug} mx={6} />
        </GridFlex>
      </CSSGrid>
    </FullBleed>
  )
}

const ArtQuizSaveButton: FC<{ slug: string } & ClickableProps> = ({
  slug,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  const handleClick = () => {}

  return (
    <Clickable
      display="flex"
      p={0.5}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      alignItems="center"
      {...rest}
    >
      {isHovered ? <HeartFillIcon /> : <HeartIcon />}
    </Clickable>
  )
}

// HEY LAURA DONT FORGET
const ArtQuizDislikeButton: FC<ClickableProps> = ({ ...rest }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  const handleClick = () => {}
  return (
    <Clickable
      display="flex"
      p={0.5}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      alignItems="center"
      {...rest}
    >
      <CloseIcon height={isHovered ? 22 : 18} width={isHovered ? 22 : 18} />
    </Clickable>
  )
}

// It would be my preference to grid-enable our base Box component
const GridClickable = styled(Clickable)<ClickableProps & GridProps>`
  ${grid}
`
const GridImage = styled(Image)<ImageProps & GridProps & FlexProps>`
  ${grid}
  ${flex}
`
const GridText = styled(Text)<TextProps & GridProps>`
  ${grid}
`
const GridFlex = styled(Flex)<FlexProps & GridProps>`
  ${grid}
`
