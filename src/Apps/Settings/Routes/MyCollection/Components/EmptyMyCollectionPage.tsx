import { Join, Spacer } from "@artsy/palette"
import { HowMyCollectionWorks } from "./HowMyCollectionWorks"
import { MyCollectionAppDownload } from "./MyCollectionAppDownload"
import { MyCollectionBenefits } from "./MyCollectionBenefits"

export const EmptyMyCollectionPage: React.FC = () => {
  return (
    <Join separator={<Spacer my={6} />}>
      <MyCollectionAppDownload />
      <MyCollectionBenefits />
      <HowMyCollectionWorks />
    </Join>
  )
}
