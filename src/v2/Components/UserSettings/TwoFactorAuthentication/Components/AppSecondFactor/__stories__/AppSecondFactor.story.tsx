import { Box, Theme } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import {
  CreateAppSecondFactorMutationSuccessResponse,
  DisabledQueryResponse,
  EnableAppSecondFactorMutationSuccessResponse,
  UpdateAppSecondFactorMutationSuccessResponse,
} from "v2/Components/UserSettings/TwoFactorAuthentication/__tests__/fixtures"
import { MockRelayRenderer } from "v2/DevTools"
import { merge } from "lodash"
import { AppSecondFactorFragmentContainer } from "../"

const MockAppSecondFactor = ({ mockData, mockMutationResults, query }) => {
  return (
    <MockRelayRenderer
      mockMutationResults={mockMutationResults}
      Component={AppSecondFactorFragmentContainer}
      mockData={mockData}
      query={query}
    />
  )
}

storiesOf(
  "Components/UserSettings/TwoFactorAuthentication/Components/AppSecondFactor",
  module
).add("Success", () => {
  const mockMutationResults = merge(
    CreateAppSecondFactorMutationSuccessResponse,
    UpdateAppSecondFactorMutationSuccessResponse,
    EnableAppSecondFactorMutationSuccessResponse
  )

  return (
    <Theme>
      <Box maxWidth="800px">
        <MockAppSecondFactor
          mockData={DisabledQueryResponse}
          mockMutationResults={mockMutationResults}
          query={graphql`
            query AppSecondFactorStorySuccessQuery {
              me {
                ...AppSecondFactor_me
              }
            }
          `}
        />
      </Box>
    </Theme>
  )
})
