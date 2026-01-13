import { Column, GridColumns, Message, Spacer } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import type * as React from "react"

export const IdentityVerificationError: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <>
      <MetaTags
        title="Artsy | ID Verification"
        pathname="/identity-verification/error"
      />

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
