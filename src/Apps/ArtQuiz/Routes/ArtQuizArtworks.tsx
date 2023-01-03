import { createFragmentContainer, graphql } from "react-relay"
import { ArtQuizArtworks_me$data } from "__generated__/ArtQuizArtworks_me.graphql"
import {
  ArrowLeftIcon,
  Clickable,
  Image,
  Flex,
  FullBleed,
  Text,
} from "@artsy/palette"
import {
  ArtQuizButton,
  ArtQuizButtonRef,
} from "Apps/ArtQuiz/Components/ArtQuizButton"
import {
  ArtQuizCard,
  Mode,
  useArtQuizCards,
} from "Apps/ArtQuiz/Components/ArtQuizCard"
import { useSwipe } from "Apps/ArtQuiz/Hooks/useSwipe"
import { useDislikeArtwork } from "Apps/ArtQuiz/Hooks/useDislikeArtwork"
import { FC, useCallback, useRef } from "react"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "System/Router/useRouter"
import { FullscreenBox } from "Components/FullscreenBox"
import { ArtQuizFullScreen } from "Apps/ArtQuiz/Components/ArtQuizFullscreen"
import { useUpdateQuiz } from "Apps/ArtQuiz/Hooks/useUpdateQuiz"
import { useSaveArtwork } from "Apps/ArtQuiz/Hooks/useSaveArtwork"

interface ArtQuizArtworksProps {
  me: ArtQuizArtworks_me$data
}

export const ArtQuizArtworks: FC<ArtQuizArtworksProps> = ({ me }) => {
  const { router } = useRouter()

  const edges = me.quiz.quizArtworkConnection!.edges!
  const startingIndex = edges.findIndex(edge => {
    return edge?.interactedAt === null
  })

  const { cards, activeIndex, dispatch } = useArtQuizCards({
    cards: edges.map(edge => ({
      ...edge!.node,
      interactedAt: edge!.interactedAt,
    })),
    startingIndex,
  })

  const currentArtwork = edges[activeIndex]!.node!
  const previousArtwork = activeIndex > 0 ? edges[activeIndex - 1]!.node! : null

  const { submitMutation: submitDislike } = useDislikeArtwork()
  const { submitMutation: submitSave } = useSaveArtwork()
  const { submitMutation: submitUpdate } = useUpdateQuiz()

  const handlePrevious = useCallback(() => {
    if (activeIndex === 0) {
      router.push("/art-quiz/welcome")
      return
    }

    if (previousArtwork) {
      const { isSaved, isDisliked } = previousArtwork

      if (isSaved) {
        submitSave({
          variables: {
            input: {
              artworkID: previousArtwork.internalID,
              remove: true,
            },
          },
        })
      }

      if (isDisliked) {
        submitDislike({
          variables: {
            input: {
              artworkID: previousArtwork.internalID,
              remove: true,
            },
          },
        })
      }

      submitUpdate({
        variables: {
          input: {
            artworkId: previousArtwork.internalID,
            userId: me.id,
            clearInteraction: true,
          },
        },
      })
    }

    dispatch({ type: "Previous" })
  }, [
    activeIndex,
    dispatch,
    me.id,
    previousArtwork,
    router,
    submitDislike,
    submitSave,
    submitUpdate,
  ])

  const handleNext = useCallback(
    (action: "Like" | "Dislike") => () => {
      if (activeIndex === cards.length - 1) {
        router.push("/art-quiz/results")
        return
      }

      if (action === "Like") {
        submitSave({
          variables: {
            input: {
              artworkID: currentArtwork.internalID,
            },
          },
        })
      }

      if (action === "Dislike") {
        submitDislike({
          variables: {
            input: {
              artworkID: currentArtwork.internalID,
              remove: false,
            },
          },
        })
      }

      submitUpdate({
        variables: {
          input: {
            artworkId: currentArtwork.internalID,
            userId: me.id,
          },
        },
      })
      dispatch({ type: action })
    },
    [
      activeIndex,
      cards.length,
      currentArtwork.internalID,
      dispatch,
      me.id,
      router,
      submitSave,
      submitDislike,
      submitUpdate,
    ]
  )

  const dislikeRef = useRef<ArtQuizButtonRef | null>(null)
  const likeRef = useRef<ArtQuizButtonRef | null>(null)

  useSwipe({
    onLeft: () => {
      if (!dislikeRef.current) return
      handleNext("Dislike")()
      dislikeRef.current.triggerAnimation()
    },
    onRight: () => {
      if (!likeRef.current) return
      handleNext("Like")()
      likeRef.current.triggerAnimation()
    },
  })

  return (
    <ArtQuizFullScreen>
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
            const image = card.image?.resized

            if (!image) return null

            return (
              <ArtQuizCard
                key={card.slug}
                mode={mode}
                position="absolute"
                width="100%"
                height="100%"
              >
                <FullscreenBox
                  aspectWidth={image.width ?? 1}
                  aspectHeight={image.height ?? 1}
                  bg="black10"
                >
                  <Image
                    width="100%"
                    height="100%"
                    src={image.src}
                    srcSet={image.srcSet}
                    lazyLoad
                  />
                </FullscreenBox>
              </ArtQuizCard>
            )
          })}
        </Flex>

        <Flex alignItems="stretch" justifyContent="center">
          <ArtQuizButton
            ref={dislikeRef}
            variant="Dislike"
            onClick={handleNext("Dislike")}
          />

          <ArtQuizButton
            ref={likeRef}
            variant="Like"
            onClick={handleNext("Like")}
          />
        </Flex>
      </FullBleed>
    </ArtQuizFullScreen>
  )
}

export const ArtQuizArtworksFragmentContainer = createFragmentContainer(
  ArtQuizArtworks,
  {
    me: graphql`
      fragment ArtQuizArtworks_me on Me {
        id
        quiz {
          quizArtworkConnection(first: 16) {
            edges {
              interactedAt
              position
              node {
                id
                internalID
                image {
                  resized(
                    width: 900
                    height: 900
                    version: ["normalized", "larger", "large"]
                  ) {
                    src
                    srcSet
                    width
                    height
                  }
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
