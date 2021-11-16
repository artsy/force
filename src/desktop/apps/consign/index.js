import * as routes from "./routes"
// import adminOnly from "../../lib/admin_only"
import express from "express"

export const app = express()

app.set("views", `${__dirname}/templates`)
app.set("view engine", "jade")

// TODO: This can be removed once /consign2 launches
// const landing = new JSONPage({
//   name: "consignments-landing",
//   paths: {
//     show: "/consign",
//     edit: "/consign/edit",
//   },
// })

// const { data, edit, upload } = require("../../components/json_page/routes")(
//   landing
// )

// app.get(landing.paths.show, routes.landingPage)
// app.get(landing.paths.show + "/data", adminOnly, data)
// app.get(landing.paths.edit, adminOnly, edit)
// app.post(landing.paths.edit, adminOnly, upload)

// TODO: SWA-77
// app.get(
//   "/consign/submission/:id/describe-your-work",
//   routes.submissionFlowWithFetch
// )
// app.get("/consign/submission/:id/upload-photos", routes.submissionFlowWithFetch)
// app.get("/consign/submission/:id/thank-you", routes.submissionFlowWithId)
// app.get("/consign/submission/:id/upload", routes.submissionFlowWithId)
// app.get("/consign/submission", routes.submissionFlow)
// app.get("/consign/submission*", routes.redirectToSubmissionFlow)
