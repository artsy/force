import {
  StepsWithImage,
  StepsWithImageDataType,
} from "Components/StepsWithImage"
import { resized } from "Utils/resized"

const imageHeight = 320
const imageWidth = 450
const resizeParams = { width: imageWidth, height: imageHeight, quality: 100 }

const howItWorksImage1 = resized(
  "https://files.artsy.net/images/my-coll-how-it-works-step-1.jpg",
  resizeParams
)

const howItWorksImage2 = resized(
  "https://files.artsy.net/images/my-coll-how-it-works-step-2.jpg",
  resizeParams
)

const howItWorksImage3 = resized(
  "https://files.artsy.net/images/my-coll-how-it-works-step-3.jpg",
  resizeParams
)

const DATA: Array<StepsWithImageDataType> = [
  {
    title: "Add your artworks",
    text: "Upload images and details about your artworks to My Collection.",
    src: howItWorksImage2.src,
    srcSet: howItWorksImage2.srcSet,
  },
  {
    title: "Check for insights",
    text:
      "Get free insights into the markets and careers of the artists in your collection.",
    src: howItWorksImage1.src,
    srcSet: howItWorksImage1.srcSet,
  },
  {
    title: "Sell with Ease",
    text:
      "Our team of experts will give you a free price estimate on eligible artworks and find you the right buyer.",
    src: howItWorksImage3.src,
    srcSet: howItWorksImage3.srcSet,
  },
]

export const HowMyCollectionWorks = () => (
  <StepsWithImage sectionTitle="How It Works" data={DATA} />
)
