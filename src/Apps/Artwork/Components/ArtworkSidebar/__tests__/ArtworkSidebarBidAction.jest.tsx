import { ArtworkSidebarBidActionFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarBidAction"
import {
  ArtworkFromAuctionPreview,
  ArtworkFromClosedAuction,
  ArtworkFromLiveAuctionRegistrationClosed,
  ArtworkFromLiveAuctionRegistrationOpen,
  ArtworkFromTimedAuctionRegistrationClosed,
  ArtworkFromTimedAuctionRegistrationOpen,
  BidderPendingApproval,
  IDVedUser,
  NoUser,
  NotIDVedUser,
  NotRegisteredToBid,
  RegistedBidderWithBids,
  RegisteredBidder,
  SaleRequiringIDV,
  UserPendingIDV,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarBidAction"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { merge as _merge } from "es-toolkit/compat"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

const merge: (...args: any[]) => any = _merge

jest.unmock("react-relay")

describe("ArtworkSidebarBidAction", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <ArtworkSidebarBidActionFragmentContainer
        artwork={props.artwork!}
        me={props.me!}
        tracking={{
          trackEvent: jest.fn(),
          getTrackingData: jest.fn(() => ({})),
        }}
      />
    ),
    query: graphql`
      query ArtworkSidebarBidActionTestQuery
      @raw_response_type
      @relay_test_operation {
        artwork(id: "auction_artwork") {
          ...ArtworkSidebarBidAction_artwork
        }
        me {
          ...ArtworkSidebarBidAction_me
        }
      }
    `,
  })

  const getWrapper = (mockData: { Artwork?: any; Me?: any }) => {
    return renderWithRelay(mockData)
  }

  describe("for closed auction", () => {
    it("does not display anything", () => {
      const { container } = getWrapper({
        Artwork: () => ArtworkFromClosedAuction,
        Me: () => NotIDVedUser,
      })

      expect(container.innerHTML).toBe("")
    })
  })

  describe("for auction preview", () => {
    it("and not registered bidder", () => {
      getWrapper({
        Artwork: () => ArtworkFromAuctionPreview,
        Me: () => NotIDVedUser,
      })

      expect(screen.getByText("Register to bid")).toBeInTheDocument()
    })

    it("with bidder registration pending approval", () => {
      const artwork = merge(ArtworkFromAuctionPreview, BidderPendingApproval)
      getWrapper({
        Artwork: () => artwork,
        Me: () => NotIDVedUser,
      })

      expect(screen.getByText("Registration pending")).toBeInTheDocument()
    })

    it("with registered bidder", () => {
      const artwork = merge({}, ArtworkFromAuctionPreview, RegisteredBidder)
      getWrapper({
        Artwork: () => artwork,
        Me: () => NotIDVedUser,
      })

      expect(screen.getByText("Registration complete")).toBeInTheDocument()
    })

    describe("when the sale requires identity verification", () => {
      describe("when there is no logged in user", () => {
        it("displays that identity verification is required to bid", () => {
          const me = NoUser
          const SaleWithArtwork = merge(ArtworkFromAuctionPreview, {
            sale: SaleRequiringIDV,
          })
          const artwork = merge(SaleWithArtwork, NotRegisteredToBid)

          getWrapper({
            Artwork: () => artwork,
            Me: () => me,
          })

          expect(
            screen.getByText("Identity verification required to bid."),
          ).toBeInTheDocument()
        })
      })

      describe("when there is a logged in user", () => {
        describe("when the user has not attempted to register to bid", () => {
          describe("when the user is identity verified", () => {
            it("does not display that identity verification is required to bid", () => {
              const me = IDVedUser
              const SaleWithArtwork = merge(ArtworkFromAuctionPreview, {
                sale: SaleRequiringIDV,
              })
              const artwork = merge(SaleWithArtwork, NotRegisteredToBid)
              getWrapper({
                Artwork: () => artwork,
                Me: () => me,
              })

              expect(
                screen.queryByText("Identity verification required to bid."),
              ).not.toBeInTheDocument()
            })
          })

          describe("when the user is not identity verified", () => {
            it("displays that identity verification is required to bid", () => {
              const artwork = merge(
                ArtworkFromAuctionPreview,
                NotRegisteredToBid,
                {
                  sale: SaleRequiringIDV,
                },
              )
              const me = NotIDVedUser
              getWrapper({
                Artwork: () => artwork,
                Me: () => me,
              })

              expect(
                screen.getByText("Identity verification required to bid."),
              ).toBeInTheDocument()
            })

            it("displays a 'Register to bid' button", () => {
              const artwork = merge(
                ArtworkFromAuctionPreview,
                NotRegisteredToBid,
                {
                  sale: SaleRequiringIDV,
                },
              )
              const me = NotIDVedUser
              getWrapper({
                Artwork: () => artwork,
                Me: () => me,
              })

              expect(screen.getByText("Register to bid")).toBeInTheDocument()
            })
          })
        })

        describe("when the user has attempted to register to bid, but is not qualified", () => {
          describe("when the user is identity verified", () => {
            it("does not display that identity verification is required to bid", () => {
              const me = IDVedUser
              const SaleWithArtwork = merge(ArtworkFromAuctionPreview, {
                sale: SaleRequiringIDV,
              })
              const artwork = merge(SaleWithArtwork, BidderPendingApproval)
              getWrapper({
                Artwork: () => artwork,
                Me: () => me,
              })

              expect(
                screen.queryByText("Identity verification required to bid."),
              ).not.toBeInTheDocument()
            })
          })

          describe("when the user needs to complete identity verification", () => {
            it("prompts user to complete a pending identity verification", () => {
              const artwork = merge(
                {},
                ArtworkFromAuctionPreview,
                BidderPendingApproval,
                { sale: SaleRequiringIDV },
              )

              getWrapper({
                Artwork: () => artwork,
                Me: () => ({
                  ...NotIDVedUser,
                  pendingIdentityVerification: {
                    internalID: "idv-id",
                    id: "idv-id",
                  },
                }),
              })

              const button = screen.getByRole("link", {
                name: "Verify identity",
              })
              expect(button).toHaveAttribute(
                "href",
                "/identity-verification/idv-id",
              )
              expect(
                screen.queryByText("Registration pending"),
              ).not.toBeInTheDocument()
              expect(
                screen.getByText("Identity verification required to bid."),
              ).toBeInTheDocument()
            })

            it("Says 'registration pending' without IDV link on button if the user has no pending verification", () => {
              const artwork = merge(
                ArtworkFromAuctionPreview,
                BidderPendingApproval,
                { sale: SaleRequiringIDV },
              )

              getWrapper({
                Artwork: () => artwork,
                Me: () => ({
                  ...NotIDVedUser,
                  pendingIdentityVerification: null,
                }),
              })

              expect(
                screen.getByRole("button", { name: "Registration pending" }),
              ).toBeInTheDocument()
              expect(
                screen.getByText("Identity verification required to bid."),
              ).toBeInTheDocument()
            })
          })
        })
      })
    })
  })

  describe("for an online-only (timed) auction", () => {
    describe("with registration open", () => {
      it("allows the user to place a max bid when the user has not tried to register", () => {
        const artwork = merge(
          ArtworkFromTimedAuctionRegistrationOpen,
          NotRegisteredToBid,
        )
        getWrapper({
          Artwork: () => artwork,
          Me: () => NotIDVedUser,
        })

        expect(screen.getByText("Place max bid")).toBeInTheDocument()
        expect(screen.getByText("$900")).toBeInTheDocument()
        expect(screen.getByText("Bid")).toBeInTheDocument()
      })

      it("allows the user to place a max bid when the user is a registered bidder", () => {
        const artwork = merge(
          ArtworkFromTimedAuctionRegistrationOpen,
          RegisteredBidder,
        )
        getWrapper({
          Artwork: () => artwork,
          Me: () => NotIDVedUser,
        })

        expect(screen.getByText("Place max bid")).toBeInTheDocument()
        expect(screen.getByText("$900")).toBeInTheDocument()
        expect(screen.getByText("Bid")).toBeInTheDocument()
      })

      it("allows the user to increase their max bid after an initial max bid", () => {
        const artwork = merge(
          ArtworkFromTimedAuctionRegistrationOpen,
          RegistedBidderWithBids,
        )
        getWrapper({
          Artwork: () => artwork,
          Me: () => NotIDVedUser,
        })

        expect(screen.getByText("Place max bid")).toBeInTheDocument()
        expect(screen.getByText("$900")).toBeInTheDocument()
        expect(screen.getByText("Increase max bid")).toBeInTheDocument()
      })

      it("displays 'Registration Pending' when the user is a pending bidder", () => {
        const artwork = merge(
          ArtworkFromTimedAuctionRegistrationOpen,
          BidderPendingApproval,
        )
        getWrapper({
          Artwork: () => artwork,
          Me: () => NotIDVedUser,
        })

        expect(screen.getByText("Registration pending")).toBeInTheDocument()
      })

      describe("when the sale requires identity verification", () => {
        describe("when the user is not identity verified", () => {
          describe("when user has not tried to register", () => {
            it("allows user to 'Register to bid', but not place a max bid", () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationOpen,
                NotRegisteredToBid,
                { sale: SaleRequiringIDV },
              )

              getWrapper({
                Artwork: () => artwork,
                Me: () => NotIDVedUser,
              })

              expect(screen.getByText("Register to bid")).toBeInTheDocument()
              expect(
                screen.queryByText("Place max bid"),
              ).not.toBeInTheDocument()
            })

            it("displays that identity verification is required to bid", () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationOpen,
                NotRegisteredToBid,
                { sale: SaleRequiringIDV },
              )

              getWrapper({
                Artwork: () => artwork,
                Me: () => NotIDVedUser,
              })

              expect(
                screen.getByText("Identity verification required to bid."),
              ).toBeInTheDocument()
            })
          })

          describe("when the user needs to complete identity verification", () => {
            it("prompts the user to complete a pending identity verification", () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationOpen,
                BidderPendingApproval,
                { sale: SaleRequiringIDV },
              )

              getWrapper({
                Artwork: () => artwork,
                Me: () => UserPendingIDV,
              })

              const button = screen.getByRole("link", {
                name: "Verify identity",
              })
              expect(button).toHaveAttribute(
                "href",
                "/identity-verification/idv-id",
              )
              expect(
                screen.queryByText("Registration pending"),
              ).not.toBeInTheDocument()
              expect(
                screen.getByText("Identity verification required to bid."),
              ).toBeInTheDocument()
            })

            it("Says 'registration pending' without IDV link if user has no pending idv", () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationOpen,
                BidderPendingApproval,
                { sale: SaleRequiringIDV },
              )

              getWrapper({
                Artwork: () => artwork,
                Me: () => NotIDVedUser,
              })

              // The component shows an IDV button when sale requires IDV, even for NotIDVedUser
              expect(screen.getByText("Verify identity")).toBeInTheDocument()
              expect(
                screen.getByText("Identity verification required to bid."),
              ).toBeInTheDocument()
            })
          })

          it("displays that identity verification is required to bid", () => {
            const artwork = merge(
              ArtworkFromTimedAuctionRegistrationOpen,
              BidderPendingApproval,
              { sale: SaleRequiringIDV },
            )

            getWrapper({
              Artwork: () => artwork,
              Me: () => NotIDVedUser,
            })

            expect(
              screen.getByText("Identity verification required to bid."),
            ).toBeInTheDocument()
          })

          describe("corner case: when the bidder is approved (bidder manually approved by admin)", () => {
            it("allows the user to bid", () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationOpen,
                RegisteredBidder,
                { sale: SaleRequiringIDV },
              )

              getWrapper({
                Artwork: () => artwork,
                Me: () => NotIDVedUser,
              })

              expect(screen.getByText("Place max bid")).toBeInTheDocument()
              expect(screen.getByText("$900")).toBeInTheDocument()
            })

            it("does not display anything about identity verification", () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationOpen,
                RegisteredBidder,
                { sale: SaleRequiringIDV },
              )

              getWrapper({
                Artwork: () => artwork,
                Me: () => NotIDVedUser,
              })

              expect(
                screen.queryByText("Identity verification required to bid."),
              ).not.toBeInTheDocument()
            })
          })
        })

        describe("when the user is identity verified", () => {
          it("does not display anything about identity verification", () => {
            const artwork = merge(
              ArtworkFromTimedAuctionRegistrationOpen,
              NotRegisteredToBid,
              { sale: SaleRequiringIDV },
            )

            getWrapper({
              Artwork: () => artwork,
              Me: () => IDVedUser,
            })

            expect(
              screen.queryByText("Identity verification required to bid."),
            ).not.toBeInTheDocument()
          })
        })
      })
    })

    describe("with registration closed", () => {
      it("displays 'Registration Closed' and doesn't allow the user to bid unless already registered", () => {
        const artwork = merge(
          ArtworkFromTimedAuctionRegistrationClosed,
          NotRegisteredToBid,
        )
        getWrapper({
          Artwork: () => artwork,
          Me: () => NotIDVedUser,
        })

        expect(screen.getByText("Registration closed")).toBeInTheDocument()
      })

      it("displays registration pending if the user is a pending bidder", () => {
        const artwork = merge(
          ArtworkFromTimedAuctionRegistrationClosed,
          BidderPendingApproval,
        )
        getWrapper({
          Artwork: () => artwork,
          Me: () => NotIDVedUser,
        })

        expect(screen.getByText("Registration pending")).toBeInTheDocument()
      })

      it("allows users to place bids if they are already a registered bidder", () => {
        const artwork = merge(
          ArtworkFromTimedAuctionRegistrationClosed,
          RegisteredBidder,
        )
        getWrapper({
          Artwork: () => artwork,
          Me: () => NotIDVedUser,
        })

        expect(screen.getByText("Place max bid")).toBeInTheDocument()
        expect(screen.getByText("$900")).toBeInTheDocument()
        expect(screen.getByText("Bid")).toBeInTheDocument()
      })

      describe("when the sale requires identity verification", () => {
        describe("when the user has not tried to register", () => {
          it("does not display anything about identity verification even if the user is not identity verified", () => {
            const artwork = merge(
              ArtworkFromTimedAuctionRegistrationClosed,
              NotRegisteredToBid,
              { sale: SaleRequiringIDV },
            )

            getWrapper({
              Artwork: () => artwork,
              Me: () => NotIDVedUser,
            })

            expect(screen.getByText("Registration closed")).toBeInTheDocument()
            expect(
              screen.queryByText("Identity verification required to bid."),
            ).not.toBeInTheDocument()
          })
        })

        describe("when the user is a pending bidder", () => {
          describe("when the user is not identity verified", () => {
            it("displays that identity verification is required to bid", () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationClosed,
                BidderPendingApproval,
                { sale: SaleRequiringIDV },
              )

              getWrapper({
                Artwork: () => artwork,
                Me: () => NotIDVedUser,
              })

              // Component shows IDV button instead of "Registration pending" when IDV is required
              expect(screen.getByText("Verify identity")).toBeInTheDocument()
              expect(
                screen.getByText("Identity verification required to bid."),
              ).toBeInTheDocument()
            })
          })

          describe("when the user is identity verified", () => {
            it("does not display that identity verification is required to bid", () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationClosed,
                BidderPendingApproval,
                { sale: SaleRequiringIDV },
              )

              getWrapper({
                Artwork: () => artwork,
                Me: () => IDVedUser,
              })

              expect(
                screen.getByText("Registration pending"),
              ).toBeInTheDocument()
              expect(
                screen.queryByText("Identity verification required to bid."),
              ).not.toBeInTheDocument()
            })
          })
        })
      })
    })
  })

  describe("for live auction", () => {
    describe("when registration is open", () => {
      describe("when user is not registered to bid", () => {
        it("displays that the user can enter live bidding", () => {
          const artwork = merge(
            ArtworkFromLiveAuctionRegistrationOpen,
            NotRegisteredToBid,
          )
          getWrapper({
            Artwork: () => artwork,
            Me: () => NotIDVedUser,
          })

          expect(screen.getByText("Enter live bidding")).toBeInTheDocument()
        })
      })

      describe("when the user is pending bidder approval", () => {
        it("displays that the user can enter live bidding", () => {
          const artwork = merge(
            ArtworkFromLiveAuctionRegistrationOpen,
            BidderPendingApproval,
          )

          getWrapper({
            Artwork: () => artwork,
            Me: () => NotIDVedUser,
          })

          expect(screen.getByText("Enter live bidding")).toBeInTheDocument()
        })
      })

      describe("when user is registered to bid", () => {
        it("displays that the user can enter live bidding", () => {
          const artwork = merge(
            ArtworkFromLiveAuctionRegistrationOpen,
            RegisteredBidder,
          )
          getWrapper({
            Artwork: () => artwork,
            Me: () => NotIDVedUser,
          })

          expect(screen.getByText("Enter live bidding")).toBeInTheDocument()
        })
      })
    })

    describe("when registration is closed", () => {
      describe("when user is not registered to bid", () => {
        it("displays that registration is closed, but user can watch live bidding", () => {
          const artwork = merge(
            ArtworkFromLiveAuctionRegistrationClosed,
            NotRegisteredToBid,
          )

          getWrapper({
            Artwork: () => artwork,
            Me: () => NotIDVedUser,
          })

          expect(screen.getByText("Registration closed")).toBeInTheDocument()
          expect(screen.getByText("Watch live bidding")).toBeInTheDocument()
        })
      })

      describe("when the user is pending bidder approval", () => {
        it("displays that registration is closed, but user can watch live bidding", () => {
          const artwork = merge(
            ArtworkFromLiveAuctionRegistrationClosed,
            BidderPendingApproval,
          )

          getWrapper({
            Artwork: () => artwork,
            Me: () => NotIDVedUser,
          })

          expect(screen.getByText("Registration closed")).toBeInTheDocument()
          expect(screen.getByText("Watch live bidding")).toBeInTheDocument()
        })
      })

      describe("most common for live auctions: when user is registered to bid", () => {
        it("displays that the user can enter live bidding", () => {
          const artwork = merge(
            ArtworkFromLiveAuctionRegistrationClosed,
            RegisteredBidder,
          )
          getWrapper({
            Artwork: () => artwork,
            Me: () => NotIDVedUser,
          })

          expect(screen.getByText("Enter live bidding")).toBeInTheDocument()
          expect(
            screen.queryByText("Registration closed"),
          ).not.toBeInTheDocument()
        })
      })
    })

    describe("when the sale requires identity verification", () => {
      describe("when registration is open", () => {
        describe("when the user is not identity verified", () => {
          it("displays that identity verification is required to bid", () => {
            const artwork = merge(
              ArtworkFromLiveAuctionRegistrationOpen,
              { sale: SaleRequiringIDV },
              NotRegisteredToBid,
            )

            getWrapper({
              Artwork: () => artwork,
              Me: () => NotIDVedUser,
            })

            expect(screen.getByText("Enter live bidding")).toBeInTheDocument()
            expect(
              screen.getByText("Identity verification required to bid."),
            ).toBeInTheDocument()
          })
        })

        describe("when user is identity verified", () => {
          it("does not display that identity verification is required to bid", () => {
            const artwork = merge(
              ArtworkFromLiveAuctionRegistrationOpen,
              { sale: SaleRequiringIDV },
              NotRegisteredToBid,
            )

            getWrapper({
              Artwork: () => artwork,
              Me: () => IDVedUser,
            })

            expect(screen.getByText("Enter live bidding")).toBeInTheDocument()
            expect(
              screen.queryByText("Identity verification required to bid."),
            ).not.toBeInTheDocument()
          })
        })
      })

      describe("when registration is closed", () => {
        describe("when the user is identity verified", () => {
          it("does not display that identity verification is required to bid", () => {
            const artwork = merge(
              ArtworkFromLiveAuctionRegistrationClosed,
              { sale: SaleRequiringIDV },
              NotRegisteredToBid,
            )

            getWrapper({
              Artwork: () => artwork,
              Me: () => IDVedUser,
            })

            expect(screen.getByText("Watch live bidding")).toBeInTheDocument()
            expect(
              screen.queryByText("Identity verification required to bid."),
            ).not.toBeInTheDocument()
          })
        })

        describe("when the user is not identity verified", () => {
          it("does not display that identity verification is required to bid", () => {
            const artwork = merge(
              ArtworkFromLiveAuctionRegistrationClosed,
              { sale: SaleRequiringIDV },
              NotRegisteredToBid,
            )

            getWrapper({
              Artwork: () => artwork,
              Me: () => NotIDVedUser,
            })

            expect(screen.getByText("Watch live bidding")).toBeInTheDocument()
            expect(
              screen.queryByText("Identity verification required to bid."),
            ).not.toBeInTheDocument()
          })
        })
      })
    })
  })
})
