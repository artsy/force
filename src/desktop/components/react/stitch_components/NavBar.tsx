import React from "react"
import styled from "styled-components"
import { NavBar as ReactionNavBar } from "v2/Components/NavBar"
import { FlashBannerQueryRenderer as FlashBanner } from "v2/Components/FlashBanner"
import { data as sd } from "sharify"
import { SystemContextProps, SystemContextProvider } from "v2/Artsy"
import { StagingBanner } from "./StagingBanner"
import { mediator } from "lib/mediator"

const NavBarContainer = styled.div`
  z-index: 990;
  width: 100%;
  top: 0;
  left: 0;

  /* FIXME: Overwrite main force navbar style. Once main bar is totally removed
     and no longer controlled by an ENV var we can remove this. */
  border-bottom: none !important;
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
      <NavBarContainer id="main-layout-header">
        {showStagingBanner && <StagingBanner />}
        <ReactionNavBar />
        <FlashBanner />
      </NavBarContainer>
    </SystemContextProvider>
  )
}
