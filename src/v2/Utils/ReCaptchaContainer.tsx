import React from "react"
import sharify from "sharify"
const sd = sharify.data

export class ReCaptchaContainer extends React.Component {
  componentDidMount() {
    if (sd.EIGEN || !sd.RECAPTCHA_KEY) {
      return
    }

    if (document.getElementById("google-recaptcha")) {
      return
    }
    const css = document.createElement("style")
    css.setAttribute("type", "text/css")
    css.textContent = ".grecaptcha-badge { visibility: hidden; }"
    document.body.appendChild(css)

    const script = document.createElement("script")
    script.id = "google-recaptcha"
    script.async = true
    script.src = `https://www.google.com/recaptcha/api.js?render=${sd.RECAPTCHA_KEY}`
    document.body.appendChild(script)
  }

  render() {
    return null
  }
}
