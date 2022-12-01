import {
  ArrowLeftIcon,
  Clickable,
  CloseIcon,
  Column,
  Flex,
  FullBleed,
  GridColumns,
  Image,
  Text,
} from "@artsy/palette"
import { useArtQuizContext } from "Apps/ArtQuiz/ArtQuizContext"
import {
  ArtQuizDislikeButton,
  ArtQuizSaveButton,
} from "Apps/ArtQuiz/Components/ArtQuizButtons"
import { FullyResponsiveBox } from "Components/FullyResponsiveBox"
import { FC } from "react"

export const ArtQuizMain: FC = () => {
  const {
    artworksTotalCount,
    currentArtwork,
    currentIndex,
  } = useArtQuizContext()

  return (
    <FullBleed height="100%" display="flex" flexDirection="column">
      <GridColumns p={4}>
        <Column span={4} display="flex" justifyContent="center">
          <Clickable>
            <ArrowLeftIcon />
          </Clickable>
        </Column>

        <Column span={4} display="flex" justifyContent="center">
          <Text variant="sm-display">{`${
            currentIndex + 1
          } / ${artworksTotalCount}`}</Text>
        </Column>

        <Column span={4} display="flex" justifyContent="center">
          <Clickable>
            <CloseIcon />
          </Clickable>
        </Column>
      </GridColumns>

      <Flex justifyContent="center" alignItems="center" flex={1}>
        <FullyResponsiveBox
          key={currentArtwork.image.url}
          aspectWidth={currentArtwork.image.width}
          aspectHeight={currentArtwork.image.height}
          bg="black10"
        >
          <Image
            // TODO: Needs srcSet
            src={currentArtwork.image.url}
            height="100%"
            width="100%"
            alt={currentArtwork.title}
            lazyLoad
          />
        </FullyResponsiveBox>
      </Flex>

      <GridColumns p={4}>
        <Column span={6} display="flex" justifyContent="center">
          <ArtQuizDislikeButton />
        </Column>

        <Column span={6} display="flex" justifyContent="center">
          <ArtQuizSaveButton slug={currentArtwork.slug} />
        </Column>
      </GridColumns>
    </FullBleed>
  )
}
