import { Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditProfileYourGalleryIntro_me$data } from "__generated__/SettingsEditProfileYourGalleryIntro_me.graphql"

interface SettingsEditProfileYourGalleryIntroProps {
  me: SettingsEditProfileYourGalleryIntro_me$data
}

// TODO: remove this when introducing the new collector profile
const SettingsEditProfileYourGalleryIntro: FC<SettingsEditProfileYourGalleryIntroProps> = ({
  me,
}) => {
  return (
    <>
      <Text variant={["md", "lg"]} mb={4}>
        Your Gallery Intro
      </Text>

      <Text variant="xs" mb={1}>
        Preview
      </Text>

      <Text variant={["md", "lg"]} color="black60">
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
