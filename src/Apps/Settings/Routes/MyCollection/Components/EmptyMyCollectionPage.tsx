import { Join, Spacer } from "@artsy/palette"
import { HowMyCollectionWorks } from "./HowMyCollectionWorks"
import { MyCollectionAppDownload } from "./MyCollectionAppDownload"
import { MyCollectionBenefits } from "./MyCollectionBenefits"

export const EmptyMyCollectionPage: React.FC = () => {
  return (
    <Join separator={<Spacer my={12} />}>
      <MyCollectionAppDownload />
      <MyCollectionBenefits />
      <HowMyCollectionWorks />
    </Join>
  )
}
