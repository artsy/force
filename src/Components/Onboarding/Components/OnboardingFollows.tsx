import {
  Box,
  Text,
  LabeledInput,
  MagnifyingGlassIcon,
  Button,
  Flex,
} from "@artsy/palette"
import { FC, useState } from "react"
import { OnboardingOrderedSetQueryRenderer } from "../Components/OnboardingOrderedSet"
import { useOnboardingContext } from "../Hooks/useOnboardingContext"
import { OnboardingSearchResultsQueryRenderer } from "../Components/OnboardingSearchResults"
import { useDebouncedValue } from "Utils/Hooks/useDebounce"
import { useOnboardingFadeTransition } from "../Hooks/useOnboardingFadeTransition"
import { OnboardingFigure } from "../Components/OnboardingFigure"
import { useOnboardingTracking } from "../Hooks/useOnboardingTracking"
import { SplitLayout } from "Components/SplitLayout"

interface OnboardingFollowsProps {
  kind: "artists" | "galleries"
}

const CONFIGURATION = {
  artists: {
    title: "Follow artists to see more of their work",
    placeholder: "Search Artists",
    entities: "ARTIST",
    setId: "onboarding:suggested-artists",
  },
  galleries: {
    title: "Follow galleries you love to see events and news",
    placeholder: "Search Galleries",
    entities: "PROFILE",
    setId: "onboarding:suggested-galleries",
  },
} as const

export const OnboardingFollows: FC<OnboardingFollowsProps> = ({ kind }) => {
  const { next, state } = useOnboardingContext()
  const { register, handleNext, loading } = useOnboardingFadeTransition({
    next,
  })
  const [query, setQuery] = useState("")

  const { debouncedValue } = useDebouncedValue({ value: query, delay: 200 })

  const { title, placeholder, entities, setId } = CONFIGURATION[kind]

  const tracking = useOnboardingTracking()

  return (
    <SplitLayout
      left={
        <OnboardingFigure
          ref={register(0)}
          src="https://files.artsy.net/images/wang-question.jpg"
          aspectWidth={2116}
          aspectHeight={3667}
          caption="Ziping Wang, The snowflake that comes alive, 2021"
        />
      }
      right={
        <Flex flexDirection="column" minWidth={0}>
          <Box pt={4} px={4}>
            <Text ref={register(1)} variant="lg-display" mb={2}>
              {title}
            </Text>

            <Box ref={register(2)}>
              <LabeledInput
                label={<MagnifyingGlassIcon />}
                placeholder={placeholder}
                mb={4}
                onChange={event => setQuery(event.currentTarget.value)}
                data-testid="search-input"
              />
            </Box>
          </Box>

          <Box
            ref={register(3)}
            px={4}
            flex={1}
            overflowY="auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {debouncedValue.length >= 2 ? (
              <OnboardingSearchResultsQueryRenderer
                term={debouncedValue}
                entities={entities}
              />
            ) : (
              <OnboardingOrderedSetQueryRenderer id={setId} />
            )}
          </Box>

          <Box p={2}>
            <Button
              width="100%"
              onClick={() => {
                tracking.userCompletedOnboarding()
                handleNext()
              }}
              loading={loading}
              disabled={state.followedIds.length === 0}
            >
              Next
            </Button>
          </Box>
        </Flex>
      }
    />
  )
}
