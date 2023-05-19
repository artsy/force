import { Box, Column, GridColumns, Text } from "@artsy/palette"
import { ReactElement } from "react"

const reasons = [
  {
    icon: (
      <Box width={[30, 50]} height={[30, 50]}>
        <img
          src="https://files.artsy.net/images/DollarCircleIcon_1.svg"
          width="100%"
          height="100%"
          alt=""
        />
      </Box>
    ),
    title: "Earn more from your sale",
    text:
      "With lower fees than traditional auction houses and dealers, you take home more of the final sale price.",
  },
  {
    icon: (
      <Box width={[30, 50]} height={[30, 50]}>
        <img
          src="https://files.artsy.net/images/StarCircleIcon_1.svg"
          width="100%"
          height="100%"
          alt=""
        />
      </Box>
    ),
    title: "Tap into our expertise",
    text:
      "Our team has a wealth of experience in the secondary art market. A dedicated specialist will be with you every step of the way.",
  },
  {
    icon: (
      <Box width={[30, 50]} height={[30, 50]}>
        <img
          src="https://files.artsy.net/images/GlobeNetworkCircleIcon_1.svg"
          width="100%"
          height="100%"
          alt=""
        />
      </Box>
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
    // FIXME: Remove external margins
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
