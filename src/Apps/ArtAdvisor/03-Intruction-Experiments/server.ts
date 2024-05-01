import express from "express"

export const router = express.Router()

router.get("/", (req, res) => {
  res.send("Hello root under experiment 3")
})

router.get("/a", (req, res) => {
  res.send("Hello experiment 3a")
})

router.get("/b", (req, res) => {
  res.send("Hello experiment 3b")
})
