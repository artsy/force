import { ContactInformationFormModel } from "Apps/Consign/Routes/SubmissionFlow/ContactInformation/Components/ContactInformationForm"
import { Photo } from "Components/PhotoUpload/Utils/fileUtils"
import { COUNTRY_CODES } from "Utils/countries"
import { ContactInformation_me$data } from "__generated__/ContactInformation_me.graphql"
import { ContactInformation_submission$data } from "__generated__/ContactInformation_submission.graphql"
import { UploadPhotos_submission$data } from "__generated__/UploadPhotos_submission.graphql"
import { findKey } from "lodash"

export type SubmissionAsset = NonNullable<
  UploadPhotos_submission$data["assets"]
>[0]

const DEFAULT_COUNTRY_CODE = "us"

export const getContactInformationFormInitialValues = (
  me: ContactInformation_me$data,
  submission: ContactInformation_submission$data | null
): ContactInformationFormModel => {
  let phoneNumber = submission?.userPhone ?? me?.phone ?? ""

  const userRegionCode = me?.phoneNumber?.regionCode ?? ""

  const countryCode =
    submission?.userPhone?.split(" ")?.[0].replace("+", "") ||
    COUNTRY_CODES[userRegionCode.toLocaleUpperCase()]

  const phoneNumberCountryCode =
    findKey(COUNTRY_CODES, v => v === countryCode)?.toLowerCase() ||
    me?.phoneNumber?.regionCode ||
    DEFAULT_COUNTRY_CODE

  if (countryCode) {
    phoneNumber = phoneNumber.replace(`+${countryCode}`, "")
  }

  return {
    name: submission?.userName || me?.name || "",
    email: submission?.userEmail || me?.email || "",
    phoneNumber,
    phoneNumberCountryCode,
  }
}

export const shouldRefetchPhotoUrls = (photos: Photo[]) => {
  return photos.some(photo => !!photo.assetId && !photo.url && !photo.file)
}

export const getPhotoUrlFromAsset = (asset: SubmissionAsset) => {
  return (
    (asset?.imageUrls as any)?.thumbnail || (asset?.imageUrls as any)?.square
  )
}
