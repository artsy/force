import {
  ArrowLeftIcon,
  Box,
  Clickable,
  CloseIcon,
  Flex,
  FullBleed,
  HeartIcon,
  Text,
} from "@artsy/palette"
import { useArtQuizContext } from "Apps/ArtQuiz/ArtQuizContext"
import { FC } from "react"
import { RouterLink } from "System/Router/RouterLink"

interface ArtQuizMainProps {}

export const ArtQuizMain: FC<ArtQuizMainProps> = () => {
  const { total, index, onNext, onPrevious } = useArtQuizContext()

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
            {index + 1} / {total}
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
          <Clickable py={4} px={6} onClick={onNext}>
            <CloseIcon width={40} height={40} />
          </Clickable>

          <Clickable py={4} px={6} onClick={onNext}>
            <HeartIcon width={40} height={40} />
          </Clickable>
        </Flex>
      </FullBleed>
    </>
  )
}
