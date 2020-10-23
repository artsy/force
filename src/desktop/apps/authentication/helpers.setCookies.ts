import Cookies from "cookies-js"

export const setCookies = options => {
  const { afterSignUpAction, destination } = options

  if (afterSignUpAction) {
    Cookies.set("afterSignUpAction", JSON.stringify(afterSignUpAction))
  }

  if (destination) {
    Cookies.set("destination", destination, {
      expires: 60 * 60 * 24,
    })
  }
}
