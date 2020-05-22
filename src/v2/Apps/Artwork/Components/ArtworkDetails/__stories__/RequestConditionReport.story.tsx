import { Box } from "@artsy/palette"
import { MockRelayRenderer } from "v2/DevTools"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { Section } from "v2/Utils/Section"
import { RequestConditionReportFragmentContainer } from "../RequestConditionReport"

// TODO: Extract network creation/masking from MockRelayRenderer
//
// Context
//
// When multiple stories re-use the same GraphQL query, only the first to render
// receives properly un-masked data. The others pull from a global react-relay
// query cache without the same un-masking logic defined.
//
// This means that it's not safe to have multiple query renderers on the same
// storybook page.
//
// We should investigate re-using the same network across instances of
// MockRelayRenderer. One way might be extract the network creation and allow it
// to be passed in as a MockRelayRenderer prop.
//
// #dev-help thread: https://artsy.slack.com/archives/CP9P4KR35/p1579881138013100
import {
  FailureQuery,
  SuccessQuery,
  UnauthenticatedQuery,
} from "./RequestConditionReportQueries"

const MockRequestConditionReport = ({ query, me, conditionReportRequest }) => {
  return (
    <MockRelayRenderer
      Component={RequestConditionReportFragmentContainer}
      mockData={{
        me,
        artwork: { saleArtwork: { internalID: "sale-artwork-id" } },
      }}
      mockMutationResults={{
        requestConditionReport: { conditionReportRequest },
      }}
      variables={{ artworkID: "artwork-id" }}
      query={query}
    />
  )
}

storiesOf("Apps/Artwork/Components/ArtistDetails", module).add(
  "RequestConditionReport",
  () => {
    return (
      <>
        <Section title="RequestConditionReport / authenticated / success">
          <Box width="100%">
            <MockRequestConditionReport
              me={{ internalID: "id", email: "user@example.com" }}
              conditionReportRequest={{ internalID: "id" }}
              query={SuccessQuery}
            />
          </Box>
        </Section>
        <Section title="RequestConditionReport / authenticated / failure">
          <Box width="100%">
            <MockRequestConditionReport
              me={{ internalID: "id", email: "user@example.com" }}
              conditionReportRequest={null}
              query={FailureQuery}
            />
          </Box>
        </Section>
        <Section title="RequestConditionReport / unauthenticated">
          <Box width="100%">
            <MockRequestConditionReport
              me={null}
              conditionReportRequest={null}
              query={UnauthenticatedQuery}
            />
          </Box>
        </Section>
      </>
    )
  }
)
