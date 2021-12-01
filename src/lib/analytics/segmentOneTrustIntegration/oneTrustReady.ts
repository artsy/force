export function oneTrustReady() {
  console.log("oneTrustReady called")
  // OneTrust is ready when window.OnetrustActiveGroups contains at least C0001.
  if (
    typeof window.OnetrustActiveGroups === "string" &&
    window.OnetrustActiveGroups.split(",").includes("C0001")
  ) {
    return true
  }
  return false
}
