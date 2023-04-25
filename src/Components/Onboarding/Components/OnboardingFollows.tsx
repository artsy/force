import { Box, Text, LabeledInput, Button, Flex } from "@artsy/palette"
import { FC, useState } from "react"
import { OnboardingOrderedSetQueryRenderer } from "Components/Onboarding/Components/OnboardingOrderedSet"
import { useOnboardingContext } from "Components/Onboarding/Hooks/useOnboardingContext"
import { OnboardingSearchResultsQueryRenderer } from "Components/Onboarding/Components/OnboardingSearchResults"
import { useDebouncedValue } from "Utils/Hooks/useDebounce"
import { useOnboardingFadeTransition } from "Components/Onboarding/Hooks/useOnboardingFadeTransition"
import { OnboardingFigure } from "Components/Onboarding/Components/OnboardingFigure"
import { useOnboardingTracking } from "Components/Onboarding/Hooks/useOnboardingTracking"
import { SplitLayout } from "Components/SplitLayout"
import { useTranslation } from "react-i18next"
import SearchIcon from "@artsy/icons/SearchIcon"

interface OnboardingFollowsProps {
  kind: "artists" | "galleries"
}

const CONFIGURATION = {
  artists: {
    entities: "ARTIST",
    setId: "onboarding:suggested-artists",
  },
  galleries: {
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

  const { entities, setId } = CONFIGURATION[kind]

  const tracking = useOnboardingTracking()

  const { t } = useTranslation()

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
            <Text ref={register(1)} variant="lg-display" mb={1}>
              {t(`onboarding.follows.${kind}.title`)}
            </Text>

            <Text ref={register(2)} variant="sm-display" mb={2}>
              {t("onboarding.follows.description")}
            </Text>

            <Box ref={register(3)}>
              <LabeledInput
                label={<SearchIcon />}
                placeholder={t(`onboarding.follows.${kind}.placeholder`)}
                mb={4}
                onChange={event => setQuery(event.currentTarget.value)}
                data-testid="search-input"
              />
            </Box>
          </Box>

          <Box
            ref={register(4)}
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
