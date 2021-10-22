import * as React from "react";
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

const iconMapping = {
  Auction: AuctionIcon,
  Article: PublicationIcon,
  Artist: UserSingleIcon,
  City: MapPinIcon,
  Fair: FairIcon,
  Institution: InstitutionIcon,
  Page: PageIcon,
  Tag: TagIcon,
}

interface FallbackIconProps {
  entityType: string
}

export const FallbackIcon: React.FC<FallbackIconProps> = ({ entityType }) => {
  const Icon = iconMapping[entityType] || NoImageIcon

  return <Icon height={28} width={28} opacity={0.4} />
}
