import { getENV } from "Utils/getENV"

export const warnInDevelopment = (...args: Parameters<typeof console.warn>) => {
  if (getENV("NODE_ENV") === "development") {
    console.warn(...args)
  }
}
