import React from "react"
import {
  EarnMoreIcon,
  Box,
  CircleWhiteCheckIcon,
  Text,
  UserWithChartIcon,
  Button,
  breakpoints,
  GridColumns,
  Column,
  Separator,
} from "@artsy/palette"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"

export const SellArtDifferently: React.FC = () => {
  const { desktop, mobile } = useNavBarHeight()

  return (
    <>
      <GridColumns gridRowGap={6}>
        <Column span={4}>
          <Section
            icon={<EarnMoreIcon width={50} height={50} />}
            text="Earn More"
            description="We offer low fees, a global network of online bidders, and multiple sales options so you get the most out of your auction experience."
          />
        </Column>

        <Column span={4}>
          <Section
            icon={<CircleWhiteCheckIcon width={50} height={50} />}
            text="Keep It Simple"
            description="Sell fast, risk-free, and in most cases, you keep your artwork until it sells. We’ll guide you at every step—we’re just a tap away in our app."
          />
        </Column>

        <Column span={4}>
          <Section
            icon={<UserWithChartIcon width={50} height={50} />}
            text="Be Empowered"
            description="Our data advantage and industry expertise enhance your sale with informed pricing, transparency, and precision marketing."
          />
        </Column>

        <Column span={8} start={3} textAlign="center">
          <Text pb={3} variant="xl" mb={4}>
            Are you an artist? <br />
            See our FAQ about selling your own work with Artsy.
          </Text>

          <Button
            onClick={() => {
              scrollIntoView({
                selector: "#jump--faq",
                offset:
                  window.innerWidth <= parseInt(breakpoints.xs, 10)
                    ? mobile
                    : desktop,
              })
            }}
          >
            Learn more
          </Button>
        </Column>
      </GridColumns>

      <Separator mt={4} />
    </>
  )
}

const Section: React.FC<{
  icon: React.ReactNode
  text: string
  description: string
}> = ({ icon, text, description }) => {
  return (
    <Box textAlign="center">
      {icon}

      <Text variant="lg" mt={1}>
        {text}
      </Text>

      <Text variant="sm" color="black60" mt={1} mx="auto" maxWidth="40ch">
        {description}
      </Text>
    </Box>
  )
}
