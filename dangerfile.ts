import { warn, danger } from 'danger'

// Warn about creating new JS files
const jsFiles = danger.git.created_files.filter(f => f.endsWith('.js'))
if (jsFiles.length) {
  const files = danger.github.utils.fileLinks(jsFiles)
  warn(
    `Please don't include .js files, we want to be using TypeScript found: ${files}.`
  )
}
