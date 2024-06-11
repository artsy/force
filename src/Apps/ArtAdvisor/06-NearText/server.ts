import { getArtworksForConcepts } from "Apps/ArtAdvisor/06-NearText/lib/weaviate"
import express, { Request, Response } from "express"

const getArtworks = async (req: Request, res: Response) => {
  const { concepts, artworkClass } = req.query
  const artworks = await getArtworksForConcepts({
    artworkClass,
    concepts,
    limit: 10,
  })
  res.json(artworks)
}

const getArtworkLikes = async (req: Request, res: Response) => {
  res.json({ getting: "likes", ...req.params })
}

const createArtworkLike = async (req: Request, res: Response) => {
  res.json({ liking: "artwork" })
}

const deleteArtworkLike = async (req: Request, res: Response) => {
  res.json({ unliking: "artwork" })
}

const getArtworkDislikes = async (req: Request, res: Response) => {
  res.json({ getting: "dislikes", ...req.params })
}

const createArtworkDislike = async (req: Request, res: Response) => {
  res.json({ disliking: "artwork" })
}

const deleteArtworkDislike = async (req: Request, res: Response) => {
  res.json({ undisliking: "artwork" })
}

export const router = express.Router()

// recommended artworks
router.get("/artworks", getArtworks)

// likes
router.get("/artworks/:artwork_id/likes", getArtworkLikes)
router.post("/artworks/:artwork_id/likes", createArtworkLike)
router.delete("/artworks/:artwork_id/likes/:id", deleteArtworkLike)

// dislikes
router.get("/artworks/:artwork_id/likes", getArtworkDislikes)
router.post("/artworks/:artwork_id/likes", createArtworkDislike)
router.delete("/artworks/:artwork_id/likes/:id", deleteArtworkDislike)
