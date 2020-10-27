// TODO: Merge with novo/src/server.ts
import express from "express"
import assetMiddleware from "../lib/middleware/assetMiddleware"

const novo = express()

// TODO: We can use a single assetMiddleware
novo.use(assetMiddleware("manifest-novo.json"))

novo.use(require("./src/server"))

export default novo
