import { createFragmentContainer, graphql } from "react-relay"
import { ArtQuizArtworks_me$data } from "__generated__/ArtQuizArtworks_me.graphql"
import { AuthContextModule } from "@artsy/cohesion"
import {
  ArrowLeftIcon,
  Box,
  Clickable,
  Image,
  Flex,
  FullBleed,
  Text,
} from "@artsy/palette"
import { ArtQuizButton } from "Apps/ArtQuiz/Components/ArtQuizButton"
import {
  ArtQuizCard,
  Mode,
  useArtQuizCards,
} from "Apps/ArtQuiz/Components/ArtQuizCard"
import { useSwipe } from "Apps/ArtQuiz/Hooks/useSwipe"
import { useDislikeArtwork } from "Apps/ArtQuiz/Hooks/useDislikeArtwork"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { FC, useCallback } from "react"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "System/Router/useRouter"

interface ArtQuizArtworksProps {
  me: ArtQuizArtworks_me$data
}

export const ArtQuizArtworks: FC<ArtQuizArtworksProps> = ({ me }) => {
  const { router } = useRouter()
  const resume = me.quiz!.quizArtworkConnection!.edges!.findIndex(edge => {
    return edge?.interactedAt === null
  })

  const { cards, activeIndex, dispatch } = useArtQuizCards({
    cards: me.quiz!.quizArtworkConnection!.edges!.map(edge => ({
      ...edge!.node,
      interactedAt: edge!.interactedAt,
    })),
    startingIndex: resume || 0,
  })
  const currentArtwork = me.quiz!.quizArtworkConnection!.edges![activeIndex]!
    .node!

  const { handleSave } = useSaveArtwork({
    artwork: currentArtwork,
    contextModule: "artQuiz" as AuthContextModule,
    isSaved: !!currentArtwork.isSaved,
  })

  const { submitMutation } = useDislikeArtwork()

  const handlePrevious = () => {
    if (activeIndex === 0) {
      router.push("/art-quiz/welcome")

      return
    }

    dispatch({ type: "Previous" })
  }

  const handleNext = useCallback(
    (action: "Like" | "Dislike") => () => {
      if (activeIndex === cards.length - 1) {
        router.push("/art-quiz/results")

        return
      }

      if (action === "Like") {
        handleSave()
      }

      if (action === "Dislike") {
        submitMutation({
          variables: {
            input: {
              artworkId: currentArtwork.internalID,
            },
          },
        })
      }

      dispatch({ type: action })
    },
    [
      activeIndex,
      cards.length,
      currentArtwork.internalID,
      dispatch,
      handleSave,
      router,
      submitMutation,
    ]
  )

  useSwipe({
    onLeft: handleNext("Dislike"),
    onRight: handleNext("Like"),
  })

  return (
    <>
      <FullBleed height="100%" display="flex" flexDirection="column">
        <Flex alignItems="stretch">
          <Clickable
            onClick={handlePrevious}
            p={4}
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ArrowLeftIcon />
          </Clickable>

          <Text
            variant="xs"
            flex={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {activeIndex + 1} / {cards.length}
          </Text>

          <RouterLink
            to="/"
            p={4}
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            textDecoration="none"
          >
            <Text variant="xs">Close</Text>
          </RouterLink>
        </Flex>

        <Flex
          position="relative"
          justifyContent="center"
          alignItems="center"
          flex={1}
          flexDirection="column"
        >
          {cards.map((card, i) => {
            const mode = i === activeIndex ? Mode.Active : card.mode

            return (
              <>
                <ArtQuizCard key={card.slug} mode={mode} position="absolute">
                  <Box
                    height="100%"
                    bg="black10"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image width="100%" height="100%" src={card.image!.url!} />
                  </Box>
                </ArtQuizCard>
              </>
            )
          })}
        </Flex>

        <Flex alignItems="stretch" justifyContent="center">
          <ArtQuizButton variant="Dislike" onClick={handleNext("Dislike")} />

          <ArtQuizButton variant="Like" onClick={handleNext("Like")} />
        </Flex>
      </FullBleed>
    </>
  )
}

export const ArtQuizArtworksFragmentContainer = createFragmentContainer(
  ArtQuizArtworks,
  {
    quiz: graphql`
      fragment ArtQuizArtworks_me on Me {
        quiz {
          quizArtworkConnection(first: 16) {
            edges {
              interactedAt
              position
              node {
                id
                internalID
                image {
                  url(version: "large")
                  aspectRatio
                  width
                  height
                }
                isDisliked
                isSaved
                slug
                title
              }
            }
          }
        }
      }
    `,
  }
)
