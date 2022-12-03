import { Column, GridColumns, Message, Spacer } from "@artsy/palette"
import * as React from "react"
import { MetaTags } from "Components/MetaTags"

export const Error: React.FC = () => {
  return (
    <>
      <MetaTags title="Artsy | ID Verification" />

      <Spacer y={4} />

      <GridColumns>
        <Column span={[12, 8, 6]} start={[1, 3, 4]}>
          <Message variant="error" title="Your verification has failed">
            We were unable to complete your identity verification. For
            assistance, please contact Artsy verification support at{" "}
            <a href="mailto:verification@artsy.net">verification@artsy.net</a>.
          </Message>
        </Column>
      </GridColumns>
    </>
  )
}
