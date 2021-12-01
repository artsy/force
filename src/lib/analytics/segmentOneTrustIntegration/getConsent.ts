import { getOneTrustConsent } from "./getOneTrustConsent"

export async function getConsent() {
  console.log("getConsent called")

  const oneTrustConsent = await getOneTrustConsent()

  if (oneTrustConsent === "") {
    // failed getting OneTrust consent, return C0001 as we have implicit consent for Strictly Necessary things.
    return "C0001"
  } else {
    return oneTrustConsent
  }
}
