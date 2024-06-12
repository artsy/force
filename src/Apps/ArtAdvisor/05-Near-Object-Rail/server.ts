import {
  createReference,
  getNearObjects,
  getObjects,
  getObjectWithId,
} from "Apps/ArtAdvisor/05-Near-Object-Rail/helpers/weaviate"
import chalk from "chalk"
import express, { Request, Response } from "express"
import { filter } from "lodash"

const likeArtwork = async (req: Request, res: Response) => {
  const { artworkId, userId } = req.body

  try {
    await createReference({
      referenceProperty: "likedArtworks",
      fromClassName: "DiscoveryUsers",
      fromWeaviateId: userId,
      toClassName: "DiscoveryArtworks",
      toWeaviateId: artworkId,
    })

    res.end()
  } catch (e) {
    console.error(chalk.red("ERROR: "), e)
    res.status(500).send("An error occurred")
  }
}

const dislikeArtwork = async (req: Request, res: Response) => {
  const { artworkId, userId } = req.body

  try {
    await createReference({
      referenceProperty: "dislikedArtworks",
      fromClassName: "DiscoveryUsers",
      fromWeaviateId: userId,
      toClassName: "DiscoveryArtworks",
      toWeaviateId: artworkId,
    })

    res.end()
  } catch (e) {
    console.error(chalk.red("ERROR: "), e)
    res.status(500).send("An error occurred")
  }
}

const nearObject = async (req: Request, res: Response) => {
  console.log("nearObject")

  try {
    const userId = req.params.id

    const userQuery =
      "name likedArtworks { ... on DiscoveryArtworks { title _additional { id }}} dislikedArtworks { ... on DiscoveryArtworks { title _additional { id }}} _additional { id }"

    const weaviateUser = await getObjectWithId({
      objectId: userId,
      query: userQuery,
      className: "DiscoveryUsers",
    })

    const userLikes =
      weaviateUser?.data?.Get?.DiscoveryUsers[0].likedArtworks || []
    const userDislikes =
      weaviateUser?.data?.Get?.DiscoveryUsers[0].dislikedArtworks || []

    const artworksQuery = "title imageUrl _additional { id }"

    let artworks

    if (userLikes.length > 0) {
      artworks = await getNearObjects({
        objectId: userId,
        objectClassName: "DiscoveryUsers",
        targetClassName: "DiscoveryArtworks",
        query: artworksQuery,
        limit: 50,
      })
    } else {
      artworks = await getObjects({
        className: "DiscoveryArtworks",
        query: artworksQuery,
        limit: 50,
      })
    }

    const filterIdList = [...userLikes, ...userDislikes].map(
      artwork => artwork._additional.id
    )

    const filteredArtworks = filter(
      artworks.data.Get.DiscoveryArtworks,
      artwork => {
        return !filterIdList.includes(artwork._additional.id)
      }
    )

    res.send(JSON.stringify(filteredArtworks) || [])
  } catch (error) {
    console.error(JSON.stringify(error, null, 2))
    res.status(500).send("An error occurred")
  }
}

const users = async (req: Request, res: Response) => {
  try {
    const weaviateUsers = await getObjects({
      className: "DiscoveryUsers",
      query: "name _additional { id }",
      limit: 25,
    })

    res.send(weaviateUsers?.data.Get.DiscoveryUsers || [])
  } catch (error) {
    console.error(JSON.stringify(error, null, 2))
    res.status(500).send("An error occurred")
  }
}

/*
 * Define the express server routes
 */
export const router = express.Router()
router.get("/users", users)
router.get("/near_object/:id", nearObject)
router.post("/like_artwork", likeArtwork)
router.post("/dislike_artwork", dislikeArtwork)
