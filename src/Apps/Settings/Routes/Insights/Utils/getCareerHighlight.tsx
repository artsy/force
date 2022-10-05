import {
  FairIcon,
  GroupIcon,
  IconProps,
  MuseumIcon,
  PublicationIcon,
  SoloIcon,
} from "@artsy/palette"
import { FC, Fragment } from "react"

export type CareerHighlightKind =
  | "SOLO_SHOW"
  | "GROUP_SHOW"
  | "COLLECTED"
  | "REVIEWED"
  | "BIENNIAL"
  | "ACTIVE_SECONDARY_MARKET"

export const getCareerHighlight = (
  type: CareerHighlightKind,
  count: number
) => {
  let label: string = ""
  let Icon: FC<IconProps> = Fragment

  // plural
  const pl = count > 1
  const ending = pl ? "s" : ""
  const article = pl ? "" : "a "

  switch (type) {
    case "BIENNIAL":
      label = `${
        pl ? "Artists were" : "Artist was"
      } included in ${article}major biennial${ending}.`
      Icon = FairIcon
      break
    case "COLLECTED":
      label = `${
        pl ? "Artists are" : "Artist is"
      } collected by ${article}major institution${ending}.`
      Icon = MuseumIcon
      break
    case "GROUP_SHOW":
      label = `${
        pl ? "Artists were" : "Artist was"
      } in a group show at ${article}major institution${ending}.`
      Icon = GroupIcon
      break
    case "REVIEWED":
      label = `${
        pl ? "Artists were" : "Artist was"
      } reviewed by ${article}major art publication${ending}.`
      Icon = PublicationIcon
      break

    case "SOLO_SHOW":
      label = `${
        pl ? "Artists" : "Artist"
      } had a solo show at ${article}major institution${ending}.`
      Icon = SoloIcon
      break
    /*
    case "": // TODO: Collected by artists
      label = `${pl ? "Artists are" : "Artist is"} collected by ${article}major private collector${ending}.`
      Icon = ArtworkIcon
      break
    case "": // TODO: Major prize - TBD
      label = `${pl ? "Artists were" : "Artist was"} awarded ${article}major prize${ending}.`
      Icon = CertificateIcon
      break
    */
  }

  return { label, Icon }
}
