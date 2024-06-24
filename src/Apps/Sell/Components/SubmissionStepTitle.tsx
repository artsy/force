import { Text } from "@artsy/palette"

export const SubmissionStepTitle: React.FC = ({ children }) => {
  return (
    <Text variant={["lg-display", "xl"]} mb={2}>
      {children}
    </Text>
  )
}
