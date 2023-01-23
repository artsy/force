import { Join, Spacer } from "@artsy/palette"
import { useFeatureFlag } from "System/useFeatureFlag"
import { HowMyCollectionWorks } from "./HowMyCollectionWorks"
import { MyCollectionAppDownload } from "./MyCollectionAppDownload"
import { MyCollectionBenefits } from "./MyCollectionBenefits"
import { MyCollectionEmptyState } from "./MyCollectionEmptyState"

export const EmptyMyCollectionPage: React.FC = () => {
  const enableMyCollectionPhase3 = useFeatureFlag("my-collection-web-phase-3")

  return (
    <Join separator={<Spacer y={[6, 12]} />}>
      {enableMyCollectionPhase3 ? (
        <MyCollectionEmptyState />
      ) : (
        <MyCollectionAppDownload />
      )}
      <MyCollectionBenefits />
      <HowMyCollectionWorks />
    </Join>
  )
}
