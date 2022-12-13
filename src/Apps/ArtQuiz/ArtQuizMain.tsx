import {
  ArrowLeftIcon,
  Clickable,
  CloseIcon,
  CSSGrid,
  Flex,
  FullBleed,
  Image,
  ResponsiveBox,
  Spinner,
  Text,
} from "@artsy/palette"
import {
  ArtQuizDislikeButton,
  ArtQuizSaveButton,
} from "Apps/ArtQuiz/Components/ArtQuizButtons"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { FC, useEffect, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useWindowSize } from "Utils/Hooks/useWindowSize"
import { ArtQuizMain_quiz$data } from "__generated__/ArtQuizMain_quiz.graphql"

const DESKTOP_ROW_HEIGHT = 120
const DESKTOP_IMAGE_PY = 40
const MOBILE_ROW_HEIGHT = 80
const MOBILE_ADDRESS_BAR_HEIGHT = 55

interface ArtQuizMainProps {
  quiz: ArtQuizMain_quiz$data
}

export const ArtQuizMain: FC<ArtQuizMainProps> = props => {
  const { desktop, mobile } = useNavBarHeight()
  const { height, width } = useWindowSize()

  console.log("**************", props)

  const totalCount = props.quiz.quizArtworks?.totalCount
  const currentQuizArtwork = props.quiz!.quizArtworks!.edges!.find(edge => {
    const quizArtwork = edge!.node!
    return !quizArtwork.interactedAt
  })!.node!

  const currentArtwork = currentQuizArtwork!.artwork!

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
        gridTemplateColumns={["1fr", "2fr 8fr 2fr"]}
        gridTemplateRows={[
          `${MOBILE_ROW_HEIGHT}px 1fr ${MOBILE_ROW_HEIGHT}px`,
          `${DESKTOP_ROW_HEIGHT}px 1fr ${DESKTOP_ROW_HEIGHT}px`,
        ]}
        height="100%"
        pb={6}
      >
        <Clickable
          alignSelf={"center"}
          gridArea={["header", "back"]}
          justifySelf={["flex-start", "flex-end"]}
          px={[2, 0]}
        >
          <ArrowLeftIcon />
        </Clickable>
        <Text
          gridArea={["header", "progress"]}
          alignSelf="center"
          justifySelf="center"
        >
          {`${currentQuizArtwork.position + 1} / ${totalCount}`}
        </Text>
        <Clickable
          gridArea={["header", "skip"]}
          alignSelf="center"
          justifySelf={["flex-end", "flex-start"]}
          px={[2, 0]}
        >
          <CloseIcon />
        </Clickable>

        <Flex gridArea="image" justifyContent="center" alignItems="center">
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
            <ResponsiveBox
              display="grid"
              gridArea="image"
              aspectWidth={aspectRatio}
              aspectHeight={1}
              maxHeight={maxHeight}
              p={[0, 2]}
            >
              <Image
                alt={currentArtwork.title!}
                src={currentArtwork.image?.url!}
                preventRightClick={true}
                height="100%"
                width="100%"
              />
            </ResponsiveBox>
          )}
        </Flex>

        <Flex
          gridArea="controls"
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <ArtQuizDislikeButton px={6} />
          <ArtQuizSaveButton slug={currentArtwork.slug} px={6} />
        </Flex>
      </CSSGrid>
    </FullBleed>
  )
}

export const ArtQuizMainFragmentContainer = createFragmentContainer(
  ArtQuizMain,
  {
    quiz: graphql`
      fragment ArtQuizMain_quiz on Quiz {
        quizArtworks(first: 16) {
          totalCount
          edges {
            node {
              interactedAt
              position
              artwork {
                slug
                title
                image {
                  url(version: "large")
                  aspectRatio
                }
              }
            }
          }
        }
      }
    `,
  }
)
