import {
  ArrowLeftIcon,
  CloseIcon,
  CSSGrid,
  FullBleed,
  Spinner,
  Text,
} from "@artsy/palette"
import { useArtQuizContext } from "Apps/ArtQuiz/ArtQuizContext"
import {
  ArtQuizDislikeButton,
  ArtQuizSaveButton,
} from "Apps/ArtQuiz/Components/ArtQuizButtons"
import {
  GridClickable,
  GridFlex,
  GridImage,
  GridResponsiveBox,
  GridText,
} from "Apps/ArtQuiz/Components/ArtQuizGridComponents"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { FC, useEffect, useState } from "react"
import { useWindowSize } from "Utils/Hooks/useWindowSize"

const DESKTOP_ROW_HEIGHT = 120
const DESKTOP_IMAGE_PY = 40
const MOBILE_ROW_HEIGHT = 80
const MOBILE_ADDRESS_BAR_HEIGHT = 55

export const ArtQuizMain: FC = () => {
  const { desktop, mobile } = useNavBarHeight()
  const {
    artworksTotalCount,
    currentArtwork,
    currentIndex,
  } = useArtQuizContext()
  const { height, width } = useWindowSize()

  const aspectRatio = currentArtwork.image?.aspectRatio ?? 1

  const [maxHeight, setMaxHeight] = useState<number>(0)

  useEffect(() => {
    if (height && width > 768) {
      setMaxHeight(height - DESKTOP_ROW_HEIGHT * 2 - DESKTOP_IMAGE_PY - desktop)
    }
    if (height && width < 768) {
      setMaxHeight(
        height - MOBILE_ROW_HEIGHT * 2 - MOBILE_ADDRESS_BAR_HEIGHT - mobile
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width])

  return (
    // Should we lift this FullBleed up into the ArtQuizApp?
    // Maybe not relevant to the results page
    <FullBleed
      height={[`calc(100vh - ${mobile}px)`, `calc(100vh - ${desktop}px)`]}
      justifyContent="center"
    >
      <CSSGrid
        gridTemplateAreas={[
          `"header"
          "image"
          "controls"`,
          `"back progress skip"
          ". image ."
          ". controls ."`,
        ]}
        gridTemplateColumns={["1fr", "1fr 8fr 1fr"]}
        gridTemplateRows={[
          `${MOBILE_ROW_HEIGHT}px 1fr ${MOBILE_ROW_HEIGHT}px`,
          `${DESKTOP_ROW_HEIGHT}px 1fr ${DESKTOP_ROW_HEIGHT}px`,
        ]}
        height="100%"
        pb={6}
      >
        <GridClickable
          alignSelf={"center"}
          gridArea={["header", "back"]}
          justifySelf={["flex-start", "flex-end"]}
          px={[2, 0]}
        >
          <ArrowLeftIcon />
        </GridClickable>
        <GridText
          gridArea={["header", "progress"]}
          alignSelf="center"
          justifySelf="center"
        >
          {`${currentIndex + 1} / ${artworksTotalCount}`}
        </GridText>
        <GridClickable
          gridArea={["header", "skip"]}
          alignSelf="center"
          justifySelf={["flex-end", "flex-start"]}
          px={[2, 0]}
        >
          <CloseIcon />
        </GridClickable>

        <GridFlex gridArea="image" justifyContent="center" alignItems="center">
          {/** The appearance/disappearance of this loader is startling and poor UX.
           * We should definitely work on smoothing this visual transition out as part of
           * the animation user story. */}
          {!maxHeight && (
            <>
              <Text>Loading images...</Text>
              <Spinner />
            </>
          )}
          {!!maxHeight && (
            <GridResponsiveBox
              display="grid"
              gridArea="image"
              aspectWidth={aspectRatio}
              aspectHeight={1}
              maxHeight={maxHeight}
              p={[0, 2]}
            >
              <GridImage
                alt={currentArtwork.title}
                src={currentArtwork.image?.url}
                preventRightClick={true}
                height="100%"
                width="100%"
              />
            </GridResponsiveBox>
          )}
        </GridFlex>

        <GridFlex
          gridArea="controls"
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <ArtQuizDislikeButton px={6} />
          <ArtQuizSaveButton slug={currentArtwork.slug} px={6} />
        </GridFlex>
      </CSSGrid>
    </FullBleed>
    
  )
}
