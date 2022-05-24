import {
  Flex,
  Spacer,
  Text,
  Join,
  Box,
  CheckCircleFillIcon,
  Button,
} from "@artsy/palette"
import { FC } from "react"
import {
  OPTION_ARTWORKS_FROM_TRENDING_ARTISTS,
  OPTION_AUCTION_HIGHLIGHTS_FROM_THIS_WEEK,
  OPTION_A_CURATED_SELECTION_OF_ARTWORKS,
  OPTION_COLLECTING_ART_THAT_MOVES_ME,
  OPTION_CREATE_AN_ART_WISHLIST,
  OPTION_CURRENTLY_TRENDING_ARTISTS,
  OPTION_FINDING_MY_NEXT_GREAT_INVESTMENT,
  OPTION_FIND_NEW_ART_FROM_ARTISTS_THAT_I_COLLECT,
  OPTION_FOLLOW_ARTISTS_I_COLLECT,
  OPTION_FOLLOW_GALLERIES_I_LOVE,
  OPTION_GROW_MY_TASTE_IN_ART,
  OPTION_KEEPING_TRACK_OF_ART_I_AM_INTERESTED_IN,
  OPTION_KEEP_TRACK_OF_ARTIST_CAREER,
  OPTION_POPULAR_AUCTION_LOTS,
} from "../config"
import { useOnboardingContext } from "../useOnboardingContext"

export const OnboardingQuestionTwo: FC = () => {
  const { answers, setAnswerTwo, setBasis, next } = useOnboardingContext()

  const answerOne = answers[0] as keyof typeof QUESTION_2
  const options = QUESTION_2[answerOne]

  return (
    <Flex flexDirection="column">
      <Text variant="xs">Help Artsy get to know what you like.</Text>

      <Spacer mt={1} />

      <Text variant="lg-display">Where would you like to dive in first?</Text>

      <Spacer mt={4} />

      <Box>
        <Join separator={<Spacer mt={2} />}>
          <Flex alignItems="center">
            <CheckCircleFillIcon fill="blue100" mr={1} />

            <Text variant="xs">{answers[0]}</Text>
          </Flex>

          {options.map(option => {
            return (
              <Button
                key={option}
                size="small"
                variant="secondaryOutline"
                onClick={() => {
                  setAnswerTwo(option)
                  setBasis({ answer: option })
                  next()
                }}
              >
                {option}
              </Button>
            )
          })}
        </Join>
      </Box>
    </Flex>
  )
}

const QUESTION_2 = {
  [OPTION_GROW_MY_TASTE_IN_ART]: [
    OPTION_AUCTION_HIGHLIGHTS_FROM_THIS_WEEK,
    OPTION_CURRENTLY_TRENDING_ARTISTS,
    OPTION_A_CURATED_SELECTION_OF_ARTWORKS,
  ],
  [OPTION_KEEPING_TRACK_OF_ART_I_AM_INTERESTED_IN]: [
    OPTION_FIND_NEW_ART_FROM_ARTISTS_THAT_I_COLLECT,
    OPTION_ARTWORKS_FROM_TRENDING_ARTISTS,
    OPTION_AUCTION_HIGHLIGHTS_FROM_THIS_WEEK,
  ],
  [OPTION_FINDING_MY_NEXT_GREAT_INVESTMENT]: [
    OPTION_KEEP_TRACK_OF_ARTIST_CAREER,
    OPTION_CURRENTLY_TRENDING_ARTISTS,
    OPTION_POPULAR_AUCTION_LOTS,
  ],
  [OPTION_COLLECTING_ART_THAT_MOVES_ME]: [
    OPTION_FOLLOW_ARTISTS_I_COLLECT,
    OPTION_FOLLOW_GALLERIES_I_LOVE,
    OPTION_CREATE_AN_ART_WISHLIST,
  ],
}
