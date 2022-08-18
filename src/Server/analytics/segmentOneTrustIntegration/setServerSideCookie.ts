import cookies from "cookies-js"

export function setServerSideCookie() {
  const OptanonAlertBoxClosed = encodeURIComponent(
    cookies.get("OptanonAlertBoxClosed")
  )
  const OptanonConsent = encodeURIComponent(cookies.get("OptanonConsent"))

  fetch(
    `/set-tracking-preferences?OptanonAlertBoxClosed=${OptanonAlertBoxClosed}&OptanonConsent=${OptanonConsent}`
  )
}
