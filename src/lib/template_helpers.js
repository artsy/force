export function buildBodyClass(sd, baseClass) {
  const classes = []

  if (baseClass) {
    classes.push(baseClass)
  }

  if (sd.APPLICATION_NAME === "force-staging") {
    classes.push("force-staging")
  }

  // Flags that show up in Sharify data
  const flagMap = {
    MICROSITE: "is-microsite",
    EIGEN: "body-eigen",
    IS_RESPONSIVE: "body-responsive",
  }

  Object.keys(flagMap).forEach(flag => {
    const foundFlag = Boolean(sd[flag])

    if (foundFlag) {
      classes.push(flagMap[flag])
    }
  })

  const bodyClass = classes.join(" ")
  return bodyClass
}
