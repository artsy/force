import * as React from "react"
import { data as sd } from "sharify"
import { useAppendStylesheet } from "./Hooks/useAppendStylesheet"
import { useLoadScript } from "./Hooks/useLoadScript"

export const EnableRecaptcha: React.FC = () => {
  useAppendStylesheet({
    id: "google-recaptcha-css",
    body: ".grecaptcha-badge { visibility: hidden; }",
  })

  useLoadScript({
    id: "google-recaptcha-js",
    src: `https://www.google.com/recaptcha/api.js?render=${sd.RECAPTCHA_KEY}`,
  })

  return null
}
