import {
  BriefcaseIcon,
  Flex,
  IconProps,
  MapPinIcon,
  MuseumIcon,
  Text,
} from "@artsy/palette"
import { FC, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { CollectorProfileHeaderInfo_me$data } from "__generated__/CollectorProfileHeaderInfo_me.graphql"

const MOBILE_ICON_SIZE = 14
const DESKTOP_ICON_SIZE = 18

interface CollectorProfileHeaderInfoProps {
  me: CollectorProfileHeaderInfo_me$data
}

const CollectorProfileHeaderInfo: FC<CollectorProfileHeaderInfoProps> = ({
  me,
}) => {
  const { location, profession, otherRelevantPositions } = me

  return (
    <Flex flexWrap="wrap">
      {!!location?.display && (
        <InfoField type="Location" value={location.display} />
      )}
      {!!profession && <InfoField type="Profession" value={profession} />}
      {!!otherRelevantPositions && (
        <InfoField
          type="OtherRelevantPositions"
          value={otherRelevantPositions}
        />
      )}
    </Flex>
  )
}

export const CollectorProfileHeaderInfoFragmentContainer = createFragmentContainer(
  CollectorProfileHeaderInfo,
  {
    me: graphql`
      fragment CollectorProfileHeaderInfo_me on Me {
        location {
          display
        }
        profession
        otherRelevantPositions
      }
    `,
  }
)

interface InfoFieldProps {
  type: "Location" | "Profession" | "OtherRelevantPositions"
  value: string
}

const InfoField: FC<InfoFieldProps> = ({ type, value }) => {
  let Icon: FC<IconProps> = Fragment

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
          <Icon
            fill="black60"
            width={MOBILE_ICON_SIZE}
            height={MOBILE_ICON_SIZE}
          />
        </Media>

        <Media style={{ display: "flex" }} greaterThanOrEqual="sm">
          <Icon
            fill="black60"
            width={DESKTOP_ICON_SIZE}
            height={DESKTOP_ICON_SIZE}
          />
        </Media>

        <Text variant={["xs", "sm-display"]} color="black60" px={0.5}>
          {value}
        </Text>
      </Flex>
    </>
  )
}
