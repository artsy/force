// Some tools read the legacy TypeScript compiler API (ts.Extension,
// ts.parseJsonConfigFileContent, ts.transpileModule, ...), which
// typescript@7's native compiler package no longer exposes — requiring it
// crashes them. Known cases: @swc-node/register (boots the dev/prod server;
// only parses tsconfig.json for SWC) and danger (transpiles dangerfile.ts).
// Until they ship TS 7 support, preload this file (node -r / NODE_OPTIONS)
// so that require("typescript") resolves to the TS 5 compiler API, installed
// as the "typescript5" alias package. Type-checking (yarn type-check) still
// runs on typescript@7.
const Module = require("module")

const ts5 = require("typescript5")
const ts7Path = require.resolve("typescript")

const shim = new Module(ts7Path)
shim.exports = ts5
shim.loaded = true
require.cache[ts7Path] = shim
