import { MetaTags } from "Components/MetaTags"
import { RouterLink } from "System/Components/RouterLink"
import {
  Button,
  Column,
  GridColumns,
  Message,
  Spacer,
  Text,
} from "@artsy/palette"
import type * as React from "react"

export const Processing: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <MetaTags title="Artsy | ID Verification" />

      <Spacer y={4} />

      <GridColumns>
        <Column span={[12, 8, 6]} start={[1, 3, 4]}>
          <Text as="h1" variant="xl">
            Your verification is processing
          </Text>

          <Spacer y={2} />

          <Message
            variant="info"
            title="Thank you for completing identity verification."
          >
            Your verification is processing and may take up to 5 minutes to
            complete. In the meantime, you can still browse on Artsy.
          </Message>

          <Spacer y={2} />

          <Button
            width="100%"
            // @ts-expect-error
            as={RouterLink}
            to="/"
          >
            Return home
          </Button>
        </Column>
      </GridColumns>
    </>
  )
}
