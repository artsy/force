// @swc-node/register reads the legacy TypeScript compiler API (ts.Extension,
// ts.parseJsonConfigFileContent, ...) at load time, which typescript@7's
// native compiler package no longer exposes — requiring it crashes the server
// boot. Until @swc-node ships TS 7 support, preload this file (node -r) before
// @swc-node/register so that require("typescript") resolves to the TS 5
// compiler API (installed as the "typescript5" alias package). @swc-node only
// uses it to parse tsconfig.json and map options for SWC — the actual
// transpilation is done by SWC itself, and type-checking (yarn type-check)
// still runs on typescript@7.
const Module = require("module")

const ts5 = require("typescript5")
const ts7Path = require.resolve("typescript")

const shim = new Module(ts7Path)
shim.exports = ts5
shim.loaded = true
require.cache[ts7Path] = shim
