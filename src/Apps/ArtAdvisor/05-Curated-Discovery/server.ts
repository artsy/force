import express, { Request, Response } from "express"

const handler = async (req: Request, res: Response) => {
  res.send("Hello from curated discovery")
}

/*
 * Define the express server routes
 */
export const router = express.Router()
router.get("/", handler)

// get nearObject works
// get nearText works
// add a disliked reference
// add a liked reference

// for nearObject, just shuffles random artworks to build the initial true.
