import { Spacer } from "@artsy/palette"
import { HowMyCollectionWorks } from "./HowMyCollectionWorks"
import { MyCollectionAppDownload } from "./MyCollectionAppDownload"
import { MyCollectionBenefits } from "./MyCollectionBenefits"

export const EmptyMyCollectionPage: React.FC = () => {
  return (
    <>
      <MyCollectionAppDownload />
      <Spacer my={12} />
      <MyCollectionBenefits />
      <Spacer my={12} />
      <HowMyCollectionWorks />
    </>
  )
}
