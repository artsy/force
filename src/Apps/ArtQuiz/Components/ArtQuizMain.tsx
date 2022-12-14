import {
  ArrowLeftIcon,
  Box,
  Clickable,
  CloseIcon,
  Flex,
  FullBleed,
  HeartFillIcon,
  HeartIcon,
  Text,
} from "@artsy/palette"
import { ArtQuizButton } from "Apps/ArtQuiz/Components/ArtQuizButton"
import { FC } from "react"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "System/Router/useRouter"
import { useCursor } from "use-cursor"

const TOTAL = 10

interface ArtQuizMainProps {}

export const ArtQuizMain: FC<ArtQuizMainProps> = () => {
  const { router } = useRouter()

  const { handleNext, handlePrev, index } = useCursor({ max: TOTAL })

  const onPrevious = () => {
    if (index === 0) {
      router.push("/art-quiz/welcome")

      return
    }

    handlePrev()
  }

  const onNext = () => {
    if (index === TOTAL - 1) {
      router.push("/art-quiz/results")

      return
    }

    handleNext()
  }

  return (
    <>
      <FullBleed height="100%" display="flex" flexDirection="column">
        <Flex alignItems="stretch">
          <Clickable
            onClick={onPrevious}
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
            {index + 1} / {TOTAL}
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

        <Flex justifyContent="center" alignItems="center" flex={1}>
          <Box
            width={400}
            height={400}
            bg="black10"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text variant="xxl">{index + 1}</Text>
          </Box>
        </Flex>

        <Flex alignItems="stretch" justifyContent="center">
          <ArtQuizButton onClick={onNext}>
            <CloseIcon width={40} height={40} />
          </ArtQuizButton>

          <ArtQuizButton onClick={onNext}>
            {({ mode }) => {
              if (mode === "Done") {
                return <HeartFillIcon width={40} height={40} />
              }

              return <HeartIcon width={40} height={40} />
            }}
          </ArtQuizButton>
        </Flex>
      </FullBleed>
    </>
  )
}
