import { regexp } from "@betterer/regexp"

export default {
  // Add tests here ☀️
  "strictNullCheck migration": regexp(
    /@ts-expect-error\s+STRICT_NULL_CHECK/
  ).include("**/*.ts(x)?"),
}
