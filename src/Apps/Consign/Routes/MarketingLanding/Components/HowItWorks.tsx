import {
  StepsWithImage,
  StepsWithImageDataType,
} from "Components/StepsWithImage"
import { resized } from "Utils/resized"

const imageHeight = 320
const imageWidth = 450
const resizeParams = { width: imageWidth, height: imageHeight, quality: 100 }

export const HowItWorks = () => {
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

  const data: StepsWithImageDataType[] = [
    {
      src: howItWorksImage1.src,
      srcSet: howItWorksImage1.srcSet,
      text:
        "Submit images of an artwork in your collection, along with relevant details, like the artist, time period, and medium.",
      title: "Upload photos",
      step: "01",
    },
    {
      src: howItWorksImage2.src,
      srcSet: howItWorksImage2.srcSet,
      text:
        "If your artwork is accepted, our specialists will give you a price estimate and the best sales option: at auction, via private sale, or as a direct listing on Artsy.",
      title: "Get a sales option",
      step: "02",
    },
    {
      src: howItWorksImage3.src,
      srcSet: howItWorksImage3.srcSet,
      text:
        "We’ll find the best buyer for your work and arrange shipping and secure payment when it sells.",
      title: "Sell your artwork",
      step: "03",
    },
  ]

  return <StepsWithImage sectionTitle="How It Works" data={data} />
}
