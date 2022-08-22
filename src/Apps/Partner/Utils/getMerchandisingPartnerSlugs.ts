import { getENV } from "Utils/getENV"

export const getMerchandisingPartnerSlugs = () => {
  const slugs = getENV("ARTSY_MERCHANDISING_PARTNER_SLUGS")

  if (typeof slugs === "string") {
    return slugs.split(",")
  }

  return []
}
