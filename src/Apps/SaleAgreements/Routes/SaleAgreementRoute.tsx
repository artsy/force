import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { PageHTML } from "Apps/Page/Components/PageHTML"
import { MetaTags } from "Components/MetaTags"
import { TopContextBar } from "Components/TopContextBar"
import type { SaleAgreementRoute_saleAgreement$key } from "__generated__/SaleAgreementRoute_saleAgreement.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface SaleAgreementRouteProps {
  saleAgreement: SaleAgreementRoute_saleAgreement$key
}

export const SaleAgreementRoute: FC<
  React.PropsWithChildren<SaleAgreementRouteProps>
> = ({ saleAgreement }) => {
  const data = useFragment(saleAgreementFragment, saleAgreement)

  if (!data) {
    return null
  }

  return (
    <>
      <MetaTags
        title={`${data.sale.name} | Supplemental Conditions of Sale | Artsy`}
      />

      <TopContextBar displayBackArrow href="/supplemental-cos">
        All Supplemental Conditions of Sale
      </TopContextBar>

      <Spacer y={4} />

      <Text variant="xl" as="h1">
        {data.sale.name}
      </Text>

      <Text variant="lg" color="mono60">
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
