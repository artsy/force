import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Flex, FullBleed, THEME } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { Sticky } from "Components/Sticky"
import { RouterLink } from "System/Components/RouterLink"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

export const SubmissionHeader: React.FC = () => {
  const context = useSellFlowContext()
  const isLastStep = context?.state?.step
  const submissionID = context?.state?.submissionID
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)
  const saveAndExitMobile = submissionID && isMobile

  return (
    <Sticky withoutHeaderOffset>
      {() => {
        return (
          <FullBleed backgroundColor="white100">
            <AppContainer>
              <HorizontalPadding>
                <Flex
                  flexDirection="row"
                  justifyContent={saveAndExitMobile ? "end" : "space-between"}
                  alignItems={"center"}
                  py={isMobile ? 1 : 4}
                >
                  {!isMobile && (
                    <RouterLink to={"/sell"} display="block">
                      <ArtsyLogoIcon display="block" />
                    </RouterLink>
                  )}
                  {submissionID ? (
                    <RouterLink
                      to={"/sell"}
                      display="block"
                      textDecoration={isMobile ? "none" : "underline"}
                    >
                      Save & Exit
                    </RouterLink>
                  ) : (
                    <RouterLink to={"/sell"} display="block">
                      {isMobile && !!isLastStep ? <CloseIcon /> : "Exit"}
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
