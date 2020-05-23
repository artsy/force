import { paginationProps } from "v2/Apps/__tests__/Fixtures/Pagination"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { Pagination } from "../Pagination"

storiesOf("Styleguide/Components", module).add("Pagination", () => {
  const { cursor, callbacks } = paginationProps

  return (
    <React.Fragment>
      <Section title="Responsive">
        <Pagination hasNextPage pageCursors={cursor as any} {...callbacks} />
      </Section>
    </React.Fragment>
  )
})
