import { Column, GridColumns, Text } from "@artsy/palette"
import { DollarCircleIcon } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/DollarCircleIcon"
import { StarCircleIcon } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/StarCircleIcon"
import { GlobeNetworkCircleIcon } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/GlobeNetworkCircleIcon"

import { ReactElement } from "react"
import { Media } from "Utils/Responsive"

const reasons = [
  {
    icon: (
      <>
        <Media greaterThan="xs">
          <DollarCircleIcon height={50} width={50} />
        </Media>
        <Media at="xs">
          <DollarCircleIcon height={30} width={30} />
        </Media>
      </>
    ),
    title: "Earn more from your sale",
    text:
      "With lower fees than traditional auction houses and dealers, you take home more of the final sale price.",
  },
  {
    icon: (
      <>
        <Media greaterThan="xs">
          <StarCircleIcon height={50} width={50} />
        </Media>
        <Media at="xs">
          <StarCircleIcon height={30} width={30} />
        </Media>
      </>
    ),
    title: "Tap into our expertise",
    text:
      "Our team has a wealth of experience in the secondary art market. A dedicated specialist will be with you every step of the way.",
  },
  {
    icon: (
      <>
        <Media greaterThan="xs">
          <GlobeNetworkCircleIcon height={50} width={50} />
        </Media>
        <Media at="xs">
          <GlobeNetworkCircleIcon height={30} width={30} />
        </Media>
      </>
    ),
    title: "Reach a global network",
    text:
      "With the world’s largest network of collectors, we match your work with the most interested buyers in over 190 countries.",
  },
]

export const Highlights: React.FC = () => {
  return (
    <GridColumns gridColumnGap={[0, 2, 4]} alignItems="fex-start">
      {reasons.map(i => (
        <RowItem icon={i.icon} title={i.title} text={i.text} />
      ))}
    </GridColumns>
  )
}

interface RowItemProps {
  icon: ReactElement
  title: string
  text: string
}
const RowItem: React.FC<RowItemProps> = ({ icon, title, text }) => {
  return (
    <Column span={4} mb={[2, 0]}>
      {icon}
      <Text mt={[0.5, 2]} variant={["md", "lg-display", "xl"]}>
        {title}
      </Text>
      <Text mt={[0.5, 1]} variant={["xs", "sm"]}>
        {text}
      </Text>
    </Column>
  )
}
