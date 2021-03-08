export const computeLandingPages = appUrl => {
  const urls = [
    { loc: appUrl, priority: 1 },
    { loc: appUrl + "/about", priority: 1 },
    { loc: appUrl + "/artists", priority: 1 },
    { loc: appUrl + "/categories" },
    { loc: appUrl + "/collect", priority: 1 },
    { loc: appUrl + "/login" },
    { loc: appUrl + "/press/in-the-media" },
    { loc: appUrl + "/press/press-releases" },
    { loc: appUrl + "/privacy" },
    { loc: appUrl + "/security" },
    { loc: appUrl + "/shows", priority: 1 },
    { loc: appUrl + "/signup" },
    { loc: appUrl + "/terms" },
  ]

  return urls
}
