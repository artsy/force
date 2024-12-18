import { Text } from "@artsy/palette"

export const SubmissionStepTitle: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  return (
    <Text
      variant={["lg-display", "xl"]}
      mb={2}
      data-testid="submission-step-title"
    >
      {children}
    </Text>
  )
}
