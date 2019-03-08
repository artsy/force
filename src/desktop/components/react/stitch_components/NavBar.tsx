import React from "react"
import styled from "styled-components"
import { NavBar as ReactionNavBar } from "reaction/Components/NavBar"

import {
  SystemContextProvider,
  SystemContextProps,
} from "@artsy/reaction/dist/Artsy"

const mediator = require("desktop/lib/mediator.coffee")

const NavBarContainer = styled.div`
  position: fixed;
  z-index: 990;
  width: 100%;
  top: 0;
  left: 0;
`

interface NavBarProps {
  user: SystemContextProps["user"]
  notificationCount: number
}

export const NavBar: React.FC<NavBarProps> = ({ notificationCount, user }) => {
  return (
    <SystemContextProvider
      mediator={mediator}
      notificationCount={notificationCount}
      user={user}
    >
      <NavBarContainer>
        <ReactionNavBar />
      </NavBarContainer>
    </SystemContextProvider>
  )
}
