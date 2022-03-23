// account creation, auction registration, bid placed, inquiry made,
// gallery contacted, offer made, purchase
function findConversionRoute(pathname: string | null) {
  if (!pathname) {
    console.log("AppShell::idConversionRoute: pathname is undefined")
    return false
  }
  console.log("AppShell::idConversionRoute: pathname", pathname)
  const conversionRoutes: RegExp[] = [
    /\/signup/g,
    /(\/auction\/)([a-z]|[0-9]|\-)+(\/bid\/)([a-z]|[0-9]|\-)+\?(sort=)([a-z]|\_)+\&(bid\=)([0-9]+)/g,
    /(\/auction\/)([a-z]|[0-9]|\-)+(\/register)/g,
    /(\/orders\/)([0-9]|[a-z]|\-)+(\/status)/g,
  ]

  const matchFound = conversionRoutes.find(route => {
    console.log("AppShell::idConversionRoute: comparing", route, "to", pathname)
    return pathname.match(route)
  })

  console.log("AppShell::idConversionRoute: matchFound:", matchFound)
  return Boolean(matchFound)
}

function appendMntnConversionPixelByRoute(
  pathname: string | null
): HTMLScriptElement | undefined {
  let script: HTMLScriptElement | undefined = undefined
  if (findConversionRoute(pathname)) {
    script = document.createElement("script")

    script.id = "mntn_conversion"
    script.src = "../../System/Analytics/MNTN/conversionPixelScript.js"
    script.async = true
    script.type = "javascript/text"

    document.body.appendChild(script)
  }
  return script
}

export { appendMntnConversionPixelByRoute as appendMntnConversionPixel }
