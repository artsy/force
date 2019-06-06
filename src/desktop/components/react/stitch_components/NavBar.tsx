import React from "react"
import styled from "styled-components"
import { NavBar as ReactionNavBar } from "reaction/Components/NavBar"
import { data as sd } from "sharify"

import {
  SystemContextProvider,
  SystemContextProps,
} from "@artsy/reaction/dist/Artsy"
import { StagingBanner } from "./StagingBanner"

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
  searchQuery?: string
}

export const NavBar: React.FC<NavBarProps> = ({
  notificationCount,
  searchQuery,
  user,
}) => {
  const showStagingBanner = sd.APPLICATION_NAME === "force-staging"

  return (
    <SystemContextProvider
      mediator={mediator}
      notificationCount={notificationCount}
      searchQuery={searchQuery}
      user={user}
    >
      <NavBarContainer>
        {showStagingBanner && <StagingBanner />}
        <ReactionNavBar />
      </NavBarContainer>
    </SystemContextProvider>
  )
}
