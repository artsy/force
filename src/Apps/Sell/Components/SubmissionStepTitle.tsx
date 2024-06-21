import { Text } from "@artsy/palette"

export const SubmissionStepTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Text variant={["lg-display", "xl"]} mb={2}>
      {title}
    </Text>
  )
}
