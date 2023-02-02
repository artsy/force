import {
  StepsWithImageBlack,
  StepsWithImageBlackDataType,
} from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/StepWithImageBlack"
import { resized } from "Utils/resized"

const imageWidth = 600

export const HowWeSell = () => {
  const howItWorksImage1 = resized(
    "https://files.artsy.net/images/auctions-swa-landing-page.jpg",
    { width: imageWidth, height: 392, quality: 100 }
  )

  const howItWorksImage2 = resized(
    "https://files.artsy.net/images/privat-sales-swa-landing-page.png",
    { width: imageWidth, height: 317, quality: 100 }
  )

  const howItWorksImage3 = resized(
    "https://files.artsy.net/images/online-storefront-swa-landing-page.png",
    { width: imageWidth, height: 358, quality: 100 }
  )

  const data: StepsWithImageBlackDataType[] = [
    {
      src: howItWorksImage1.src,
      srcSet: howItWorksImage1.srcSet,
      text:
        "We maximize your profitability by selecting the right auction partner for your work from our network in 190 countries.",
      title: "Auctions",
      imageHeight: 392,
    },
    {
      src: howItWorksImage2.src,
      srcSet: howItWorksImage2.srcSet,
      text:
        "Our bespoke process will match your work to potential buyers through an exclusive network of collectors.",
      title: "Private Sales",
      imageHeight: 317,
    },
    {
      src: howItWorksImage3.src,
      srcSet: howItWorksImage3.srcSet,
      text:
        "We list your work directly on Artsy.net, the world’s largest online art marketplace, reaching over 3 million art lovers daily.",
      title: "Online storefront",
      imageHeight: 358,
    },
  ]

  return (
    <StepsWithImageBlack
      useBlackBackground
      sectionTitle="How we sell your work"
      sectionSubtitle="We create a tailored strategy to find the optimal sales method for your artwork."
      data={data}
    />
  )
}
