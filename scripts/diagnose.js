const { spawnSync } = require("child_process")
const fs = require("fs")

const exec = (command, cwd) => {
  const task = spawnSync(command, { shell: true, cwd })
  if (task.status != 0) {
    throw new Error(task.stderr.toString())
  }
  return task.stdout.toString()
}

const checkEnvVariables = () => {
  // exec("touch .env.temp")
  try {
    exec("aws s3 cp s3://artsy-citadel/dev/.env.eigen .env.temp")
  } catch (e) {
    console.log(e)
  }

  const updatedEnv = fs.readFileSync("./.env.temp", "utf8").toString()
  const localEnv = fs.readFileSync("./.env.shared", "utf8").toString()

  if (updatedEnv !== localEnv) {
    console.log(
      `❌ Your .env.shared file does not match the one in S3. Please re-run ${chalk.green(
        "./scripts/setup.sh"
      )}`
    )
  } else {
    console.log(`✅ .env.shared is up to date`)
  }
  exec("rm .env.temp")
}

const main = async () => {
  // Check if the environment variables are up to date
  await checkEnvVariables()
}

main()
