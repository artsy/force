import React, { FC, useEffect } from "react"
import { MetaTags } from "v2/Components/MetaTags"
import { useRouter } from "v2/System/Router/useRouter"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { Column, GridColumns, Spacer, Text } from "@artsy/palette"

export const NewForYouApp: FC = () => {
  const featureFlagEnabled = useFeatureFlag("new_for_you")
  const { router } = useRouter()

  useEffect(() => {
    if (!featureFlagEnabled) {
      router.replace("/")
    }
  })

  return (
    <>
      <Spacer mt={2} />
      <MetaTags title="New For You" />
      <GridColumns>
        <Column span={6}>
          <Text variant="xl" mt={4}>
            New Works For You
          </Text>
        </Column>
        <Column span={6}>
          <Text variant={"md"} mt={6}>
            Description Here Explaining Stuff
          </Text>
        </Column>
      </GridColumns>
      <Spacer mt={4} />
    </>
  )
}
