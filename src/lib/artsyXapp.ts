import artsyXapp from "@artsy/xapp"

const { API_URL, CLIENT_ID, CLIENT_SECRET } = process.env

export function initializeArtsyXapp(startServerCallback) {
  console.log("\n[Force] Initializing artsyXapp...")

  /**
   * If we can't get an xapp token, start the server but retry every 30 seconds.
   * Until an xapp token is fetched, the `ARTSY_XAPP_TOKEN` sharify value will
   * not be present, and any requests made via the Force server (or a user's
   * browser) directly to gravity will fail.
   e
   * When an xapp token is fetched, any subsequent requests to Force will have
   * `ARTSY_XAPP_TOKEN` set and direct gravity requests will resolve.
   */
  artsyXapp.on("error", err => {
    startServerCallback()

    console.error(`
Force could not fetch an xapp token. This can be
due to \`API_URL\`, \`CLIENT_ID\` and \`CLIENT_SECRET\` not being set, but
also could be gravity being down. Retrying...`)
    console.error(err)

    setTimeout(() => {
      artsyXapp.init({ id: CLIENT_ID, secret: CLIENT_SECRET, url: API_URL })
    }, 30000)
  })

  // Get an xapp token
  artsyXapp.init(
    { id: CLIENT_ID, secret: CLIENT_SECRET, url: API_URL },
    error => {
      if (error) {
        console.error(error)
      }
      if (!error) {
        console.log("[Force] Successfully fetched xapp token.")
        startServerCallback()
      }
    }
  )
}
