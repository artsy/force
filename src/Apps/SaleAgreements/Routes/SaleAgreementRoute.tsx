import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { PageHTML } from "Apps/Page/Components/PageHTML"
import { TopContextBar } from "Components/TopContextBar"
import { useFlag } from "@unleash/proxy-client-react"
import type { SaleAgreementRoute_saleAgreement$key } from "__generated__/SaleAgreementRoute_saleAgreement.graphql"
import { HttpError } from "found"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface SaleAgreementRouteProps {
  saleAgreement: SaleAgreementRoute_saleAgreement$key
}

export const SaleAgreementRoute: FC<
  React.PropsWithChildren<SaleAgreementRouteProps>
> = ({ saleAgreement }) => {
  const data = useFragment(saleAgreementFragment, saleAgreement)
  const showSupplementalCosPage = useFlag("sapphire_supplemental-cos")

  if (!showSupplementalCosPage) {
    throw new HttpError(404)
  }

  if (!data) {
    return null
  }

  return (
    <>
      <TopContextBar displayBackArrow href="/supplemental-cos">
        All Supplemental Conditions of Sale
      </TopContextBar>

      <Spacer y={4} />
      <Text variant="xl" as="h1">
        {data.sale.name}
      </Text>

      <Text variant="lg" color="black60">
        {data.displayStartAt} - {data.displayEndAt}
      </Text>

      <Spacer y={4} />

      <GridColumns>
        <Column span={8} start={3}>
          <PageHTML
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          />
        </Column>
      </GridColumns>
    </>
  )
}

const saleAgreementFragment = graphql`
  fragment SaleAgreementRoute_saleAgreement on SaleAgreement {
    internalID
    content(format: HTML) @required(action: NONE)
    displayStartAt(format: "MMM Do, YYYY", timezone: "UTC")
    displayEndAt(format: "MMM Do, YYYY", timezone: "UTC")
    sale @required(action: NONE) {
      internalID
      name
    }
  }
`
