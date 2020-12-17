import {
  AuctionIcon,
  FairIcon,
  InstitutionIcon,
  MapPinIcon,
  NoImageIcon,
  PageIcon,
  PublicationIcon,
  TagIcon,
  UserSingleIcon,
} from "@artsy/palette"
import React, { SFC } from "react"

const iconMapping = {
  Article: PublicationIcon,
  Artist: UserSingleIcon,
  Auction: AuctionIcon,
  City: MapPinIcon,
  Fair: FairIcon,
  Institution: InstitutionIcon,
  Page: PageIcon,
  Tag: TagIcon,
}

interface FallbackIcon {
  entityType: string
}

export const FallbackIcon: SFC<FallbackIcon> = ({ entityType }) => {
  const Icon = iconMapping[entityType] || NoImageIcon

  return <Icon height={28} width={28} opacity={0.4} />
}
