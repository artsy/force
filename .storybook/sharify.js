const crypto = require("crypto")
const fs = require("fs")
const os = require("os")
const path = require("path")

module.exports = data => {
  const blob = JSON.stringify(data)
  const blobHash = crypto
    .createHash("md5")
    .update(blob)
    .digest("hex")
  const pathname = path.join(os.tmpdir(), `${blobHash}.js`)
  fs.writeFileSync(pathname, `module.exports = { data: ${blob} }`, {
    encoding: "utf8",
  })
  return pathname
}
