const { ContextModule } = require("@artsy/cohesion")
import React, { FC, useState } from "react"
import {
  Box,
  Button,
  Card,
  CloseIcon,
  Flex,
  HeartIcon,
  HeartFillIcon,
  Separator,
  Text,
} from "@artsy/palette"
import { curatorRoutes_CuratorQueryResponse } from "v2/__generated__/curatorRoutes_CuratorQuery.graphql"
import { extractNodes } from "../../Utils/extractNodes"
import { useSaveArtwork } from "v2/Components/Artwork/SaveButton/useSaveArtwork"

interface CuratorAppProps {
  artworks: curatorRoutes_CuratorQueryResponse["artworks"]
}

const Curator: FC<CuratorAppProps> = ({ artworks }) => {
  const [quizIndex, setQuizIndex] = useState<number>(0)
  const artworkNodes = extractNodes(artworks)
  const { handleSave } = useSaveArtwork({
    isSaved: !!artworkNodes[quizIndex].isSaved,
    artwork: {
      internalID: artworkNodes[quizIndex].internalID,
      slug: artworkNodes[quizIndex].slug,
      id: artworkNodes[quizIndex].id,
      title: artworkNodes[quizIndex].title,
    },
    contextModule: ContextModule.curatorVisualQuiz,
  })
  const onLikeClick = () => {
    if (!artworkNodes[quizIndex].isSaved) {
      handleSave()
    }
    setQuizIndex(prevState => {
      if (prevState < 9) {
        return prevState + 1
      } else {
        return 0
      }
    })
  }
  const onDislikeClick = () => {
    setQuizIndex(prevState => {
      if (prevState < 9) {
        return prevState + 1
      } else {
        return 0
      }
    })
  }

  return (
    <Box mt={4}>
      <Text variant="xl">Curator</Text>
      <Separator my={4} />
      <Flex width="100%" alignItems="center" justifyContent="center">
        <Box
          display="grid"
          style={{
            gridTemplateColumns: "1fr auto 1fr",
            gridTemplateAreas: "dislike content like",
            gridAutoFlow: "column",
            columnGap: "2rem",
          }}
        >
          <Box
            className="dislike"
            justifySelf="end"
            display="flex"
            alignItems="center"
          >
            <Button variant="noOutline" px={15} onClick={onDislikeClick}>
              <CloseIcon />
            </Button>
          </Box>
          <Box className="content" justifySelf="center">
            {artworkNodes[quizIndex] && (
              <Card
                width={artworkNodes[quizIndex].image!.width}
                image={{ src: artworkNodes[quizIndex].imageUrl! }}
                title={artworkNodes[quizIndex].title}
                subtitle={artworkNodes[quizIndex].artist?.name}
              />
            )}
          </Box>
          <Box
            className="like"
            justifySelf="start"
            display="flex"
            alignItems="center"
          >
            <Button variant="noOutline" px={15} onClick={onLikeClick}>
              {artworkNodes[quizIndex].isSaved ? (
                <HeartFillIcon />
              ) : (
                <HeartIcon />
              )}
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

const CuratorAppFragmentContainer: FC<CuratorAppProps> = ({ artworks }) => {
  return <Curator artworks={artworks} />
}

export { CuratorAppFragmentContainer }
