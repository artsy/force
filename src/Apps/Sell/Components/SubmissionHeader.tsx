import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import { Flex, FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { Sticky } from "Components/Sticky"
import { RouterLink } from "System/Router/RouterLink"

export const SubmissionHeader: React.FC = () => {
  const context = useSellFlowContext()

  const submissionID = context?.state?.submissionID

  return (
    <Sticky withoutHeaderOffset>
      {() => {
        return (
          <FullBleed backgroundColor="white100">
            <AppContainer>
              <HorizontalPadding>
                <Flex
                  flexDirection="row"
                  justifyContent="space-between"
                  minHeight={[70, 90]}
                  alignItems="center"
                >
                  <RouterLink to={"/sell"} display="block">
                    <ArtsyLogoIcon display="block" />
                  </RouterLink>

                  {submissionID ? (
                    <RouterLink to={"/sell"} display="block">
                      Save & Exit
                    </RouterLink>
                  ) : (
                    <RouterLink to={"/sell"} display="block">
                      Exit
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
