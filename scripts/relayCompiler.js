require('dotenv/config')

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const spawn = require('child_process').spawn
const { execSync } = require('child_process')

ensureRequirementsMet()

// prettier-ignore
const args = [
  '--extensions', 'js', 'jsx', 'ts', 'tsx',
  '--schema', path.resolve(process.cwd(), './data/schema.graphql'),
  '--language', 'typescript',
  '--src', path.resolve(process.cwd(), '../'),
  '--artifactDirectory', path.resolve(process.cwd(), 'src/__generated__'),
  '--include',
      'force/src/**',
      'reaction/src/**',
  '--exclude',
      'reaction/node_modules/**',
];

if (process.argv.includes('--watch')) {
  args.push('--watch')
}

// TODO: We don't need this as we're cloning projects side-by-side and setting
// relay --src root one level below project, where reaction lives.

// Use this flag if linking node modules
// if (process.argv.includes('--no-watchman')) {
//   args.push('--no-watchman')
// }

const proc = spawn(
  path.resolve(__dirname, '../node_modules/.bin/relay-compiler'),
  args,
  { stdio: 'inherit' }
)

proc.on('close', code => {
  process.exit(code)
})

function ensureRequirementsMet() {
  const requirements = [
    {
      test: () => '../../reaction',
      log: () => {
        console.log(
          chalk.red('[scripts/relayCompiler] ERROR:'),
          chalk.white(
            'Cannot find local copy of Reaction, which must be cloned and',
            'setup alongside Force. See https://github.com/artsy/reaction for',
            'setup instructions.'
          )
        )
      },
      runCommand: () => process.exit(1),
    },
    {
      test: () => '../data/schema.graphql',
      log: () => {
        console.log(
          '[scripts/relayCompiler] Running `yarn sync-schema` to download GraphQL schema from ' +
            `from ${process.env.METAPHYSICS_ENDPOINT}...`
        )
      },
      runCommand: () => execSync('yarn sync-schema'),
    },
    {
      test: () => '../../.watchmanconfig',
      log: () => {
        console.log(
          '[scripts/relayCompiler] .watchmanconfig missing. Creating from scratch...'
        )
      },
      runCommand: () => execSync('cd ../ && touch .watchmanconfig'),
    },
  ]

  requirements.forEach(requirement => {
    const { test, log, runCommand } = requirement
    if (!fs.existsSync(path.join(__dirname, test()))) {
      log()
      runCommand()
    }
  })
}
