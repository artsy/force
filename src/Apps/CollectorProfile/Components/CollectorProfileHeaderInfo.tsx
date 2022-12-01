import {
  BriefcaseIcon,
  Flex,
  IconProps,
  MapPinIcon,
  MuseumIcon,
  Text,
} from "@artsy/palette"
import { FC, Fragment } from "react"
import { Media } from "Utils/Responsive"

interface CollectorProfileHeaderInfoProps {
  type: "Location" | "Profession" | "OtherRelevantPositions"
  value: string
}

const M_ICON_SIZE = 14
const D_ICON_SIZE = 18

export const CollectorProfileHeaderInfo: FC<CollectorProfileHeaderInfoProps> = ({
  type,
  value,
}) => {
  let Icon: FC<IconProps> = Fragment

  if (!value) {
    return null
  }

  switch (type) {
    case "Location":
      Icon = MapPinIcon
      break
    case "Profession":
      Icon = BriefcaseIcon
      break
    case "OtherRelevantPositions":
      Icon = MuseumIcon
      break
  }

  return (
    <>
      <Flex flexDirection="row" alignItems="center" pr={0.5} pb={0.5}>
        <Media style={{ display: "flex" }} lessThan="sm">
          <Icon fill="black60" width={M_ICON_SIZE} height={M_ICON_SIZE} />
        </Media>

        <Media style={{ display: "flex" }} greaterThanOrEqual="sm">
          <Icon fill="black60" width={D_ICON_SIZE} height={D_ICON_SIZE} />
        </Media>

        <Text variant={["xs", "sm-display"]} color="black60" px={0.5}>
          {value}
        </Text>
      </Flex>
    </>
  )
}
