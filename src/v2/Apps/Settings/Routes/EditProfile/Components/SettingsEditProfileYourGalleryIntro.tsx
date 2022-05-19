import { Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditProfileYourGalleryIntro_me } from "v2/__generated__/SettingsEditProfileYourGalleryIntro_me.graphql"

interface SettingsEditProfileYourGalleryIntroProps {
  me: SettingsEditProfileYourGalleryIntro_me
}

// TODO: remove this when introducing the new collector profile
const SettingsEditProfileYourGalleryIntro: FC<SettingsEditProfileYourGalleryIntroProps> = ({
  me,
}) => {
  return (
    <>
      <Text variant="lg-display" mb={4}>
        Your Gallery Intro
      </Text>

      <Text variant="xs" textTransform="uppercase" mb={1}>
        Preview
      </Text>

      <Text variant="lg-display" color="black60">
        {me.inquiryIntroduction}
      </Text>
    </>
  )
}

export const SettingsEditProfileYourGalleryIntroFragmentContainer = createFragmentContainer(
  SettingsEditProfileYourGalleryIntro,
  {
    me: graphql`
      fragment SettingsEditProfileYourGalleryIntro_me on Me {
        inquiryIntroduction
      }
    `,
  }
)
