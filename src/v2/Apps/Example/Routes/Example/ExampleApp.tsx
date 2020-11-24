import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { Meta, Title } from "react-head"
import { ExampleApp_system } from "v2/__generated__/ExampleApp_system.graphql"
import { data as sd } from "sharify"

export interface ExampleAppProps {
  system: ExampleApp_system
}

const ExampleApp: React.FC<ExampleAppProps> = ({ system, children }) => {
  const { month, day, year } = system.time

  return (
    <AppContainer>
      <Title>Example App | Artsy</Title>
      <Meta property="og:title" content="Example App" />
      <Meta name="description" content="Fill this with a proper description" />
      <Meta
        property="og:description"
        content="Fill this with a proper description"
      />
      <Meta
        property="twitter:description"
        content="Fill this with a proper description"
      />
      <Meta property="og:url" href={`${sd.APP_URL}/example`} />
      <Meta property="og:type" href={`${sd.FACEBOOK_APP_NAMESPACE}:example`} />
      <div>
        Today is {month} {day}, {year}
      </div>
      <div>{children}</div>
    </AppContainer>
  )
}

export const ExampleAppFragmentContainer = createFragmentContainer(ExampleApp, {
  system: graphql`
    fragment ExampleApp_system on System {
      time {
        day
        month
        year
      }
    }
  `,
})
