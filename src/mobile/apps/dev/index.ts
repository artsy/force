// TODO (DELETE): This app is not used.

const expressDev = require("express")
const routes = require("./routes")

const appDev = (module.exports = expressDev())
appDev.set("views", __dirname + "/templates")
appDev.set("view engine", "jade")
appDev.get("/dev/blank", routes.blank)
