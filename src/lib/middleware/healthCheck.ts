import express from "express"

export const app = express()

/**
 * Routes for pinging system time and up
 */
app.get("/system/time", (req, res) =>
  res.status(200).send({ time: Date.now() })
)
app.get("/system/up", (req, res) => {
  res.status(200).send({ nodejs: true })
})
