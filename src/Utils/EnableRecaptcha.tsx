import { getENV } from "Utils/getENV"
import type * as React from "react"
import { useAppendStylesheet } from "./Hooks/useAppendStylesheet"
import { useLoadScript } from "./Hooks/useLoadScript"

export const EnableRecaptcha: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  useRecaptcha()

  return null
}

export const useRecaptcha = () => {
  useAppendStylesheet({
    id: "google-recaptcha-css",
    body: ".grecaptcha-badge { visibility: hidden; }",
  })

  useLoadScript({
    id: "google-recaptcha-js",
    src: `https://www.google.com/recaptcha/api.js?render=${getENV(
      "RECAPTCHA_KEY",
    )}`,
  })
}
