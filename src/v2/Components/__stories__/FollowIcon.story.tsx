import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { FollowIcon } from "../FollowIcon"

storiesOf("Styleguide/Components", module).add("FollowIcon", () => {
  return (
    <React.Fragment>
      <Section title="Object is already followed">
        <FollowIcon isFollowed />
      </Section>
      <Section title="Object is NOT followed">
        <FollowIcon isFollowed={false} />
      </Section>
      <Section title="Default">
        <FollowIcon />
      </Section>
    </React.Fragment>
  )
})
