import React from "react"
import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { test } from "../index"

jest.mock("../AuctionInfoDesktop", () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn().mockImplementation(() => ({
    render: () => <div />,
  })),
}))

jest.mock("../AuctionInfoMobile", () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn().mockImplementation(() => ({
    render: () => <div />,
  })),
}))

const AuctionInfoDesktop = require("../AuctionInfoDesktop").default
const AuctionInfoMobile = require("../AuctionInfoMobile").default

xdescribe("auction/components/layout/auction_info/AuctionInfoContainer.test", () => {
  beforeEach(() => {
    AuctionInfoDesktop.mockClear()
    AuctionInfoMobile.mockClear()
  })

  describe("<AuctionInfoContainer />", () => {
    it("renders mobile mode if isMobile", () => {
      expect(AuctionInfoDesktop).not.toBeCalled()
      expect(AuctionInfoMobile).toBeCalled()
    })

    it("renders desktop mode if isMobile is false", () => {
      expect(AuctionInfoDesktop).toBeCalled()
      expect(AuctionInfoMobile).not.toBeCalled()
    })
  })
})
