/**
 * Initialize ServiceWorker generated from WorkboxPlugin.GenerateSW webpack plugin
 */

export const setupServiceWorkers = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("[system] ServiceWorker registered: ", registration)
        })
        .catch(registrationError => {
          console.log(
            "[system] ServiceWorker registration failed: ",
            registrationError
          )
        })
    })
  }
}
