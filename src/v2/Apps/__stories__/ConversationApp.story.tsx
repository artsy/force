import { MockRouter } from "v2/DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { conversationRoutes } from "../Conversation/routes"

storiesOf("Apps/Conversation", module).add("Conversations list", () => {
  return (
    <MockRouter
      routes={conversationRoutes}
      initialRoute="/user/conversations"
      context={{
        user: {
          id: process.env.USER_ID,
          accessToken: process.env.USER_ACCESS_TOKEN,
          lab_features: ["User Conversations View"],
        },
      }}
    />
  )
})
