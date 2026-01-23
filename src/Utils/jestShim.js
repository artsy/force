import { TextDecoder, TextEncoder } from "util"
import { randomUUID } from "crypto"

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Polyfill crypto.randomUUID for jsdom test environment
if (!global.crypto) {
  global.crypto = {}
}
if (!global.crypto.randomUUID) {
  global.crypto.randomUUID = randomUUID
}
