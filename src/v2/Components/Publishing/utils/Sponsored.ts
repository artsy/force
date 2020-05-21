export const isEditorialSponsored = (sponsor: {}) => {
  return [
    "partner_condensed_logo",
    "partner_dark_logo",
    "partner_light_logo",
    "partner_logo_link",
    "pixel_tracking_code",
  ].some(editorialProperty => sponsor && sponsor[editorialProperty] != null)
}
