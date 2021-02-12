import express from "express"
const config = require("../../config.coffee")

const { APPLY_URL } = config

const app = (module.exports = express())

const redirect = path => {
  return (req, res) => res.redirect(301, `${APPLY_URL}/${path}`)
}

app.get("/apply/gallery", redirect("galleries"))
app.get("/apply/institution", redirect("institutions"))
app.get("/apply/auction", redirect("auctions"))
app.get("/apply/fair", redirect("fairs"))
app.get("/apply*", redirect("partnerships"))
