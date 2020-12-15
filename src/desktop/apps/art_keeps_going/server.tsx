import express from "express"
// @ts-ignore
import JSONPage from "../../components/json_page"
import { adminOnly } from "desktop/lib/admin_only"
import { landingPage } from "./routes"

export const app = express()

const landing = new JSONPage({
  name: "art-keeps-going",
  paths: {
    edit: "/campaign/art-keeps-going/edit",
    show: "/campaign/art-keeps-going",
  },
})

const { data, edit, upload } = require("../../components/json_page/routes")(
  landing
)

app.get(landing.paths.show, landingPage)
app.get(landing.paths.show + "/data", adminOnly, data)
app.get(landing.paths.edit, adminOnly, edit)
app.post(landing.paths.edit, adminOnly, upload)
