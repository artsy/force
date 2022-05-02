import {
  Column,
  GridColumns,
  Join,
  Spacer,
  Text,
  Image,
  Box,
} from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

const reasons = [
  {
    title: "Earn more",
    text:
      "We charge less than traditional auction houses and dealers, meaning you’ll net more once your work sells.",
  },
  {
    title: "Reach a global network",
    text:
      "We connect your work with the most interested buyers from over 2.5 million art lovers in 190 countries.",
  },
  {
    title: "Tap into our expertise",
    text: (
      <>
        <RouterLink to="/meet-the-specialists">Our specialists</RouterLink>{" "}
        guide you through everything you need to know and will handle it all,
        from pricing to shipping.
      </>
    ),
  },
]

export const WhySellWithArtsy = () => (
  <GridColumns gridRowGap={[4, 2]}>
    <Column span={[12, 6]}>
      <Box maxWidth={620}>
        <Join separator={<Spacer mt={4} />}>
          <Text variant="lg">Why Sell with Artsy</Text>

          {reasons.map(reason => (
            <TextSection title={reason.title} text={reason.text} />
          ))}
        </Join>
      </Box>
    </Column>
    <Column span={[12, 6]}>
      <Image
        height={[420, 520, 720]}
        width="100%"
        style={{ objectFit: "contain" }}
        src="https://files.artsy.net/images/swa-why-sell-with-artsy.jpg"
        mr={4}
      />
    </Column>
  </GridColumns>
)

const TextSection = ({ title, text }) => (
  <Box>
    <Text variant="xl">{title}</Text>
    <Text variant="sm">{text}</Text>
  </Box>
)
