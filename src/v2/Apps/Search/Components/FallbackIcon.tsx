import { AuctionIcon } from "@artsy/palette/dist/svgs/AuctionIcon"
import { FairIcon } from "@artsy/palette/dist/svgs/FairIcon"
import { InstitutionIcon } from "@artsy/palette/dist/svgs/InstitutionIcon"
import { MapPinIcon } from "@artsy/palette/dist/svgs/MapPinIcon"
import { NoImageIcon } from "@artsy/palette/dist/svgs/NoImageIcon"
import { PageIcon } from "@artsy/palette/dist/svgs/PageIcon"
import { PublicationIcon } from "@artsy/palette/dist/svgs/PublicationIcon"
import { TagIcon } from "@artsy/palette/dist/svgs/TagIcon"
import { UserSingleIcon } from "@artsy/palette/dist/svgs/UserSingleIcon"
import React, { SFC } from "react"

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

interface FallbackIcon {
  entityType: string
}

export const FallbackIcon: SFC<FallbackIcon> = ({ entityType }) => {
  const Icon = iconMapping[entityType] || NoImageIcon

  return <Icon height={28} width={28} opacity={0.4} />
}
