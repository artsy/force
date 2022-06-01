import { MetaTags } from "v2/Components/MetaTags"
import { Text } from "@artsy/palette"

export const ArtAppraisalsApp: React.FC = () => {
  return (
    <>
      <MetaTags title="Art Appraisals" description="todo" />

      <>
        <Text variant="xl" as="h1">
          Art Appraisals
        </Text>
      </>
    </>
  )
}
