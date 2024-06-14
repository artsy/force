import { createFragmentContainer, graphql } from "react-relay"
import { ArtQuizArtworks_me$data } from "__generated__/ArtQuizArtworks_me.graphql"
import {
  Clickable,
  Flex,
  FullBleed,
  Text,
  Tooltip,
  useDidMount,
} from "@artsy/palette"
import {
  ArtQuizButton,
  ArtQuizButtonRef,
} from "Apps/ArtQuiz/Components/ArtQuizButton"
import { Mode, useArtQuizCards } from "Apps/ArtQuiz/Components/ArtQuizCard"
import { useSwipe } from "Apps/ArtQuiz/Hooks/useSwipe"
import { useDislikeArtwork } from "Apps/ArtQuiz/Hooks/useDislikeArtwork"
import { FC, useCallback, useRef, useState } from "react"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { ArtQuizFullScreen } from "Apps/ArtQuiz/Components/ArtQuizFullscreen"
import { useUpdateQuiz } from "Apps/ArtQuiz/Hooks/useUpdateQuiz"
import { useSaveArtwork } from "Apps/ArtQuiz/Hooks/useSaveArtwork"
import { ArtQuizResultsLoader } from "Apps/ArtQuiz/Components/ArtQuizResultsLoader"
import { useTracking } from "react-tracking"
import { ContextModule } from "@artsy/cohesion"
import { useTranslation } from "react-i18next"
import { compact } from "lodash"
import { ArtQuizArtworksCardFragmentContainer } from "Apps/ArtQuiz/Components/ArtQuizArtworksCard"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"

interface ArtQuizArtworksProps {
  me: ArtQuizArtworks_me$data
}

export const ArtQuizArtworks: FC<ArtQuizArtworksProps> = ({ me }) => {
  const { submitMutation: submitDislike } = useDislikeArtwork()
  const { submitMutation: submitSave } = useSaveArtwork()
  const { submitMutation: submitUpdate } = useUpdateQuiz()
  const { trackEvent } = useTracking()
  const { router } = useRouter()
  const { t } = useTranslation()
  const [showLoader, setShowLoader] = useState(false)

  const edges = me.quiz?.quizArtworkConnection?.edges || []

  // Check to see if the user has already started the quiz
  const startingIndex = edges.findIndex(edge => {
    return edge?.interactedAt === null
  })

  const { cards, activeIndex, dispatch } = useArtQuizCards({
    cards: compact(edges),
    startingIndex,
  })

  const handlePrevious = useCallback(() => {
    const previousArtwork =
      activeIndex > 0 ? edges[activeIndex - 1]?.node : null

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

    if (activeIndex === 0) {
      router.push("/art-quiz/welcome")
    }
  }, [
    activeIndex,
    dispatch,
    me.id,
    router,
    edges,
    submitDislike,
    submitSave,
    submitUpdate,
  ])

  const handleNext = useCallback(
    (action: "Like" | "Dislike") => () => {
      const currentArtwork =
        activeIndex < edges.length ? edges[activeIndex]?.node : null

      if (currentArtwork) {
        if (action === "Like") {
          submitSave({
            variables: {
              input: {
                artworkID: currentArtwork.internalID,
              },
            },
          })
          trackEvent({
            action: "Saved Artwork",
            context_module: ContextModule.onboardingActivity,
            entity_slug: currentArtwork.slug,
            entity_id: currentArtwork.internalID,
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
      }

      dispatch({ type: action })

      if (activeIndex === cards.length - 1) {
        setShowLoader(true)
      }
    },
    [
      activeIndex,
      edges,
      dispatch,
      cards.length,
      submitUpdate,
      me.id,
      submitSave,
      trackEvent,
      submitDislike,
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

  const isMounted = useDidMount()

  // prevents a false position from being displayed after the last quiz image, e.g. 17/16
  const positionDisplay =
    activeIndex + 1 > cards.length ? cards.length : activeIndex + 1

  const handleReady = useCallback(() => {
    router.push("/art-quiz/results")
  }, [router])

  if (showLoader) {
    return <ArtQuizResultsLoader onReady={handleReady} />
  }

  // Using split to create a deliberate break in text for better readability
  const tooltipText = t("artQuizPage.artworksScreen.tooltip").split("\n")

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
            <ChevronLeftIcon />
          </Clickable>

          <Text
            variant="xs"
            flex={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            data-testid="artworks-count"
          >
            {positionDisplay} / {cards.length}
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
            const artwork = card.node

            if (!artwork) return null

            return (
              <ArtQuizArtworksCardFragmentContainer
                key={artwork.internalID}
                mode={mode}
                artwork={artwork}
              />
            )
          })}
        </Flex>

        <Tooltip
          content={
            <Text variant="xs">
              {tooltipText.map((text, i) => {
                return <div key={i}>{text}</div>
              })}
            </Text>
          }
          variant="defaultDark"
          offset={-10}
          pointer
          placement="top"
          textAlign="center"
          visible={isMounted && activeIndex === 0}
        >
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
        </Tooltip>
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
              node {
                ...ArtQuizArtworksCard_artwork
                internalID
                slug
                isDisliked
                isSaved
              }
            }
          }
        }
      }
    `,
  }
)
