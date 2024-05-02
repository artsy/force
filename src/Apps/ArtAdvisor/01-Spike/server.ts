import express from "express"

export const router = express.Router()

router.get("/", (req, res) => {
  res.send("Hello root under experiment 1")
})

router.get("/a", (req, res) => {
  res.send("Hello experiment 1a")
})

router.get("/b", (req, res) => {
  res.send("Hello experiment 1b")
})
