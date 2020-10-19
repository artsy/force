const express = require("express")

const app = express()

const oldForce = require("old-force")
const novo = require("novo/index")

app.use("/", novo)
app.use("/", oldForce)

app.listen(5000, () => {
  const bootMessage = true
    ? `\n[App] Booting Global Force...  \n`
    : `\n[App] Started on http://localhost:5000  \n`

  // eslint-disable-next-line no-console
  console.log(bootMessage)
})
