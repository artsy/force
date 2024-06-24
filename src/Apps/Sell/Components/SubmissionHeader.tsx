import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Flex, FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { Sticky } from "Components/Sticky"
import { RouterLink } from "System/Components/RouterLink"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { Media } from "Utils/Responsive"

export const SubmissionHeader: React.FC = () => {
  const context = useSellFlowContext()
  const isLastStep = context?.state?.isLastStep
  const submissionID = context?.state?.submissionID
  const isSubmissionCompleted = isLastStep && submissionID

  return (
    <Sticky withoutHeaderOffset>
      {() => {
        return (
          <FullBleed backgroundColor="white100">
            <AppContainer>
              <HorizontalPadding>
                <Flex
                  flexDirection="row"
                  justifyContent={[
                    submissionID ? "end" : "space-between",
                    "space-between",
                  ]}
                  alignItems="center"
                  py={[1, 4]}
                >
                  <Media greaterThan="xs">
                    <RouterLink to={"/sell"} display="block">
                      <ArtsyLogoIcon display="block" />
                    </RouterLink>
                  </Media>
                  {submissionID ? (
                    <RouterLink
                      to={"/sell"}
                      display="block"
                      textDecoration={["none", "underline"]}
                    >
                      Save & Exit
                    </RouterLink>
                  ) : (
                    <RouterLink
                      to={"/sell"}
                      display="block"
                      textDecoration={["none", "underline"]}
                    >
                      <Media at="xs">
                        {isSubmissionCompleted && "Exit"}
                        {!submissionID && <CloseIcon />}
                      </Media>

                      <Media greaterThan="xs">
                        {isSubmissionCompleted || !submissionID ? "Exit" : ""}
                      </Media>
                    </RouterLink>
                  )}
                </Flex>
              </HorizontalPadding>
            </AppContainer>
          </FullBleed>
        )
      }}
    </Sticky>
  )
}
