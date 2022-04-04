const { ContextModule } = require("@artsy/cohesion")
import {
  Box,
  Button,
  CloseIcon,
  Card,
  HeartFillIcon,
  HeartIcon,
} from "@artsy/palette"
import React, { FC, useState } from "react"
import { createRefetchContainer, graphql } from "react-relay"
import { useSaveArtwork } from "../../../Components/Artwork/SaveButton/useSaveArtwork"
import { RouterLink } from "../../../System/Router/RouterLink"
import { extractNodes } from "../../../Utils/extractNodes"
import { curatorRoutes_CuratorQueryResponse } from "../../../__generated__/curatorRoutes_CuratorQuery.graphql"

interface CuratorQuizProps {
  artworks: curatorRoutes_CuratorQueryResponse["artworks"]
}

const CuratorQuiz: FC<CuratorQuizProps> = ({ artworks }) => {
  const [quizIndex, setQuizIndex] = useState<number>(0)
  const artworkNodes = extractNodes(artworks)
  const {
    artist,
    isSaved,
    internalID,
    slug,
    id,
    title,
    imageUrl,
    href,
    image,
  } = artworkNodes[quizIndex]
  const { handleSave } = useSaveArtwork({
    isSaved: !!isSaved,
    artwork: {
      internalID,
      slug,
      id,
      title,
    },
    contextModule: ContextModule.curatorVisualQuiz,
  })
  const onLikeClick = () => {
    if (!isSaved) {
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
    if (isSaved) {
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

  return (
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
          <RouterLink to={href}>
            <Card
              width={image!.width}
              image={{ src: imageUrl! }}
              title={title}
              subtitle={artist?.name}
            />
          </RouterLink>
        )}
      </Box>
      <Box
        className="like"
        justifySelf="start"
        display="flex"
        alignItems="center"
      >
        <Button variant="noOutline" px={15} onClick={onLikeClick}>
          {isSaved ? <HeartFillIcon /> : <HeartIcon />}
        </Button>
      </Box>
    </Box>
  )
}

const FEATURED_ARTWORKS_QUERY = graphql``
const ARTWORKS_BY_GENE_QUERY = graphql``

const CuratorQuizFragmentContainer = createRefetchContainer(
  CuratorQuiz,
  {
    artworks: graphql``,
  },
  FEATURED_ARTWORKS_QUERY
)
const CuratorQuizByGeneFragmentContainer = createRefetchContainer(
  CuratorQuiz,
  {
    artworks: graphql``,
  },
  ARTWORKS_BY_GENE_QUERY
)
export {
  CuratorQuiz,
  CuratorQuizFragmentContainer,
  CuratorQuizByGeneFragmentContainer,
}
