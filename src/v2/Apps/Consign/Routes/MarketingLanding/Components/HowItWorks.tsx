import { Column, GridColumns, ResponsiveBox, Text, Image } from "@artsy/palette"
import { resized } from "v2/Utils/resized"

const imageHeight = 320
const imageWidth = 450
const resizeParams = { width: imageWidth, height: imageHeight, quality: 100 }

const howItWorksImage1 = resized(
  "https://files.artsy.net/images/swa-how-it-works-1.jpg",
  resizeParams
)

const howItWorksImage2 = resized(
  "https://files.artsy.net/images/swa-how-it-works-2.jpg",
  resizeParams
)

const howItWorksImage3 = resized(
  "https://files.artsy.net/images/swa-how-it-works-3.jpg",
  resizeParams
)

export const HowItWorks = () => (
  <>
    <Text mb={4} variant="lg-display">
      How It Works
    </Text>

    <GridColumns gridRowGap={[4, 2]}>
      <Column span={4}>
        <HowItWorksCard
          src={howItWorksImage1.src}
          srcSet={howItWorksImage1.srcSet}
          text="Submit images of an artwork in your collection, along with relevant details, like the artist, time period, and medium."
          title="Upload photos"
          step="01"
        />
      </Column>

      <Column span={4}>
        <HowItWorksCard
          src={howItWorksImage2.src}
          srcSet={howItWorksImage2.srcSet}
          text="If your artwork is accepted, our specialists will give you a price estimate and the best sales option: at auction, via private sale, or as a direct listing on Artsy."
          title="Get a sales option"
          step="02"
        />
      </Column>

      <Column span={4}>
        <HowItWorksCard
          src={howItWorksImage3.src}
          srcSet={howItWorksImage3.srcSet}
          text="We’ll find the best buyer for your work and arrange shipping and secure payment when it sells."
          title="Sell your artwork"
          step="03"
        />
      </Column>
    </GridColumns>
  </>
)

const HowItWorksCard = ({ src, title, step, text, srcSet }) => (
  <>
    <ResponsiveBox
      mb={[1, 2]}
      aspectWidth={imageWidth}
      aspectHeight={imageHeight}
      maxWidth="100%"
    >
      <Image
        lazyLoad
        alt=""
        width="100%"
        height="100%"
        src={src}
        srcSet={srcSet}
      />
    </ResponsiveBox>
    <Text mb={0.5} variant="xs" color="blue100">
      {step}
    </Text>
    <Text mb={0.5} variant={["lg-display", "xl"]}>
      {title}
    </Text>
    <Text variant="sm">{text}</Text>
  </>
)
