import { Join, Spacer } from "@artsy/palette"
import { useSystemContext } from "System"
import { useFeatureFlag } from "System/useFeatureFlag"
import { HowMyCollectionWorks } from "./HowMyCollectionWorks"
import { MyCollectionAppDownload } from "./MyCollectionAppDownload"
import { MyCollectionBenefits } from "./MyCollectionBenefits"
import { MyCollectionEmptyState } from "./MyCollectionEmptyState"

export interface EmptyMyCollectionPageProps {
  loggedOutState?: boolean
}

export const EmptyMyCollectionPage: React.FC = () => {
  const enableMyCollectionPhase3 = useFeatureFlag("my-collection-web-phase-3")
  const { isLoggedIn } = useSystemContext()

  return (
    <Join separator={<Spacer y={6} />}>
      {enableMyCollectionPhase3 ? (
        <MyCollectionEmptyState loggedOutState={!isLoggedIn} />
      ) : (
        <MyCollectionAppDownload />
      )}
      <MyCollectionBenefits />
      <HowMyCollectionWorks />
    </Join>
  )
}
