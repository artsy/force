import { Join, Spacer } from "@artsy/palette"
import { useFeatureFlag } from "System/useFeatureFlag"
import { HowMyCollectionWorks } from "./HowMyCollectionWorks"
import { MyCollectionAppDownload } from "./MyCollectionAppDownload"
import { MyCollectionBenefits } from "./MyCollectionBenefits"
import { MyCollectionEmptyState } from "./MyCollectionEmptyState"

export interface EmptyMyCollectionPageProps {
  loggedOutState?: boolean
}

export const EmptyMyCollectionPage: React.FC<EmptyMyCollectionPageProps> = ({
  loggedOutState,
}) => {
  const enableMyCollectionPhase3 = useFeatureFlag("my-collection-web-phase-3")

  return (
    <Join separator={<Spacer my={6} />}>
      {enableMyCollectionPhase3 ? (
        <MyCollectionEmptyState loggedOutState={loggedOutState} />
      ) : (
        <MyCollectionAppDownload />
      )}
      <MyCollectionBenefits />
      <HowMyCollectionWorks />
    </Join>
  )
}
