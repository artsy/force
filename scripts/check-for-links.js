const { exec } = require("child_process")
const { createReadStream } = require("fs")
const chalk = require("chalk")

const fileHasText = (file, text) =>
  new Promise((resolve, reject) => {
    const stream = createReadStream(file)
    let hasText = false

    stream.on("data", data => {
      if (!hasText) {
        hasText = !!(data + "").match(text)
      } else {
        stream.close()
      }
    })

    stream.on("error", err => {
      reject(err)
    })
    stream.on("close", () => {
      resolve(hasText)
    })
  })

exec(
  "yarn yalc check",
  {
    cwd: process.cwd(),
    env: process.env,
    shell: true,
  },
  async (err, stdout) => {
    if (err) {
      const file = process.argv[2]

      // If there's no links in the lock file, ignore
      if (
        file.includes("yarn.lock") &&
        !(await fileHasText(file, "file:.yalc"))
      ) {
        return
      }

      // If there's no links in the package.json, ignore
      if (
        file.includes("package.json") &&
        !(await fileHasText(file, "file:.yalc"))
      ) {
        return
      }

      console.log("")
      console.log(
        chalk.yellow(
          `Linking detected, can't commit ${file} until everything is unlinked.\n`
        )
      )
      console.log("Linked packages:")
      console.log(stdout.split(":")[1].split("]")[0] + "]\n")
      console.log(
        `Run ${chalk.bold(
          "yarn unlink-all"
        )} to fix. (Will run a yarn install).`
      )
      process.exit(1)
    }
  }
)
