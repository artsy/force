import { getENV } from "Utils/getENV"

export const isDevelopment = getENV("NODE_ENV") === "development"

export const isServer = typeof window === "undefined"

export const isTouch =
  !isServer && ("ontouchstart" in window || "onmsgesturechange" in window)
