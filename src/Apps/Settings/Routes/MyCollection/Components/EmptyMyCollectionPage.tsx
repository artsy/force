import { Join, Spacer } from "@artsy/palette"
import { HowMyCollectionWorks } from "./HowMyCollectionWorks"
import { MyCollectionBenefits } from "./MyCollectionBenefits"
import { MyCollectionEmptyState } from "./MyCollectionEmptyState"

export const EmptyMyCollectionPage: React.FC = () => {
  return (
    <Join separator={<Spacer y={[6, 12]} />}>
      <MyCollectionEmptyState />
      <MyCollectionBenefits />
      <HowMyCollectionWorks />
    </Join>
  )
}
