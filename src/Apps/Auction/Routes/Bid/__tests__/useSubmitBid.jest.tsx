import { renderHook } from "@testing-library/react-hooks"
import { useCreateTokenAndSubmit } from "Apps/Auction/Hooks/useCreateTokenAndSubmit"
import { useBidderPosition } from "Apps/Auction/Queries/useBidderPosition"
import { useCreateBidderPosition } from "Apps/Auction/Queries/useCreateBidderPosition"
import { useRouter } from "System/Hooks/useRouter"
import {
  useSubmitBid,
  UseSubmitBidProps,
} from "Apps/Auction/Routes/Bid/useSubmitBid"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { useToasts } from "@artsy/palette"

jest.mock("@artsy/palette")
jest.mock("Apps/Auction/Hooks/useAuctionTracking")
jest.mock("Apps/Auction/Hooks/useCreateTokenAndSubmit")
jest.mock("Apps/Auction/Queries/useCreateBidderPosition")
jest.mock("Apps/Auction/Queries/useBidderPosition")
jest.mock("System/Hooks/useRouter")
jest.mock("Apps/Auction/Components/Form/Utils/errorMessages", () => ({
  errorMessageForBidding: x => x,
}))

describe("useSubmitBid", () => {
  const mockUseAuctionTracking = useAuctionTracking as jest.Mock
  const mockUseCreateTokenAndSubmit = useCreateTokenAndSubmit as jest.Mock
  const mockUseCreateBidderPosition = useCreateBidderPosition as jest.Mock
  const mockUseBidderPosition = useBidderPosition as jest.Mock
  const mockUseRouter = useRouter as jest.Mock
  const mockUseToasts = useToasts as jest.Mock

  const values = {
    selectedBid: 1000,
    address: {
      phoneNumber: "+1 (123) 456-7890",
    },
  }

  const helpers = {
    setFieldError: jest.fn(),
    setStatus: jest.fn(),
    setSubmitting: jest.fn(),
  }

  const defaultProps = ({
    artwork: {
      slug: "artwork-slug",
      internalID: "artworkID",
    },
    bidderID: "bidderID",
    me: {},
    relay: jest.fn(),
    requiresPaymentInformation: false,
    sale: {
      internalID: "saleID",
      slug: "test-sale",
    },
    onSuccess: jest.fn(),
  } as unknown) as UseSubmitBidProps

  const defaultBidderPosition = {
    position: {
      internalID: "positionID",
    },
    status: "WINNING",
  }

  const setupHook = async (props = {}) => {
    const { result } = renderHook(() =>
      useSubmitBid({
        ...defaultProps,
        ...props,
      })
    )

    if (result.error) {
      throw result.error
    }

    const submitBid = result.current.submitBid as any

    // eslint-disable-next-line no-useless-catch
    try {
      await submitBid(values, helpers)
    } catch (error) {
      throw error
    }
  }

  beforeEach(() => {
    jest.useFakeTimers()

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        confirmBid: jest.fn(),
        maybeTrackNewBidder: jest.fn(),
        registrationSubmitted: jest.fn(),
      },
    }))

    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {
            redirectTo: "foo",
          },
        },
      },
      router: {
        push: jest.fn(),
      },
    }))

    mockUseCreateBidderPosition.mockImplementation(() => ({
      submitMutation: jest.fn(() => ({
        createBidderPosition: {
          result: defaultBidderPosition,
        },
      })),
    }))

    mockUseBidderPosition.mockImplementation(() => ({
      fetchBidderPosition: jest.fn(() => ({
        me: {
          bidderPosition: defaultBidderPosition,
        },
      })),
    }))

    mockUseCreateTokenAndSubmit.mockImplementation(() => ({
      createToken: jest.fn(),
    }))

    mockUseToasts.mockImplementation(() => ({
      sendToast: jest.fn(),
    }))
  })

  afterEach(() => {})

  it("sets status to null when bid initially being set", async () => {
    await setupHook()
    expect(helpers.setStatus).toHaveBeenCalledWith(null)
  })

  describe("create token", () => {
    it("creates a token if user does not have payment info", async () => {
      const spy = jest.fn()
      mockUseCreateTokenAndSubmit.mockImplementation(() => ({
        createToken: spy,
      }))

      await setupHook({
        requiresPaymentInformation: true,
      })

      expect(spy).toHaveBeenCalled()
    })

    it("handles error if token fails", async () => {
      mockUseCreateTokenAndSubmit.mockImplementation(() => ({
        createToken: jest.fn().mockRejectedValue("error"),
      }))

      await expect(async () => {
        await setupHook({
          requiresPaymentInformation: true,
        })
      }).rejects.toEqual("error")

      expect(helpers.setStatus).toHaveBeenCalledWith("SUBMISSION_FAILED")
    })
  })

  describe("creating bidder position", () => {
    it("creates a bidder position", async () => {
      const spy = jest.fn(() => ({
        createBidderPosition: {
          result: defaultBidderPosition,
        },
      }))

      mockUseCreateBidderPosition.mockImplementation(() => ({
        submitMutation: spy,
      }))

      await setupHook()

      expect(spy).toHaveBeenCalledWith({
        variables: {
          input: {
            maxBidAmountCents: 1000,
            artworkID: "artworkID",
            saleID: "saleID",
          },
        },
      })
    })

    it("handles error", async () => {
      mockUseCreateBidderPosition.mockImplementation(() => ({
        submitMutation: jest.fn().mockRejectedValue("error"),
      }))

      await expect(async () => {
        await setupHook()
      }).rejects.toEqual("error")

      expect(helpers.setStatus).toHaveBeenCalledWith("SUBMISSION_FAILED")
    })
  })

  it("calls track new bidder", async () => {
    const spy = jest.fn()

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        confirmBid: jest.fn(),
        maybeTrackNewBidder: spy,
      },
    }))

    await setupHook()

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        bidderID: "bidderID",
        me: defaultProps.me,
        isRegistrationTracked: { current: false },
        result: { position: { internalID: "positionID" }, status: "WINNING" },
        sale: defaultProps.sale,
      })
    )
  })

  describe("checkBidStatus", () => {
    describe("status handling", () => {
      describe("SUCCESS", () => {
        it("handles errors", async () => {
          mockUseCreateBidderPosition.mockImplementation(() => ({
            submitMutation: () => ({
              createBidderPosition: {
                result: {
                  ...defaultBidderPosition,
                  status: "SUCCESS",
                },
              },
            }),
          }))

          mockUseBidderPosition.mockImplementation(() => ({
            fetchBidderPosition: jest.fn().mockRejectedValue("error"),
          }))

          await setupHook()

          expect(helpers.setSubmitting).toHaveBeenCalledWith(false)
          expect(helpers.setStatus).toHaveBeenCalledWith("SUBMISSION_FAILED")
        })

        it("calls getBidderPosition and sets submitting to true", async () => {
          mockUseCreateBidderPosition.mockImplementation(() => ({
            submitMutation: () => ({
              createBidderPosition: {
                result: defaultBidderPosition,
              },
            }),
          }))

          await setupHook()
          expect(helpers.setSubmitting).toHaveBeenCalledWith(true)
        })
      })

      describe("PENDING", () => {
        it("if polling, waits and then calls getBidderPosition again", async () => {
          mockUseCreateBidderPosition.mockImplementation(() => ({
            submitMutation: () => ({
              createBidderPosition: {
                result: {
                  ...defaultBidderPosition,
                  status: "PENDING",
                },
              },
            }),
          }))

          await setupHook()
          expect(helpers.setSubmitting).toHaveBeenCalledWith(true)
        })

        // eslint-disable-next-line jest/no-disabled-tests
        it.skip("if polling max met, set error status", async () => {
          // todo
        })
      })

      describe("WINNING", () => {
        it("redirects to /artwork/id", async () => {
          const confirmBidSpy = jest.fn()
          const pushSpy = jest.fn()

          mockUseRouter.mockImplementation(() => ({
            match: {
              location: {
                query: {
                  redirectTo: null,
                },
              },
            },
            router: {
              push: pushSpy,
            },
          }))

          mockUseAuctionTracking.mockImplementation(() => ({
            tracking: {
              maybeTrackNewBidder: jest.fn(),
              confirmBid: confirmBidSpy,
            },
          }))

          await setupHook()

          expect(confirmBidSpy).toHaveBeenCalledWith(
            expect.objectContaining({
              bidderID: "bidderID",
              positionID: "positionID",
            })
          )

          expect(pushSpy).toHaveBeenCalledWith("/artwork/artwork-slug")
        })

        it("redirects to custom url, if provided", async () => {
          const pushSpy = jest.fn()

          mockUseRouter.mockImplementation(() => ({
            match: {
              location: {
                query: {
                  redirectTo: "some-redirect-url",
                },
              },
            },
            router: {
              push: pushSpy,
            },
          }))

          await setupHook()

          expect(pushSpy).toHaveBeenCalledWith("some-redirect-url")
        })

        it("sends a toast", async () => {
          const spy = jest.fn()

          mockUseToasts.mockImplementation(() => ({
            sendToast: spy,
          }))

          await setupHook()
          jest.runAllTimers()

          expect(spy).toHaveBeenCalledWith({
            variant: "success",
            message: "Bid successfully placed.",
          })
        })
      })

      describe("OUTBID", () => {
        it("sets a field error on the selectedBid component and submitting to false", async () => {
          mockUseCreateBidderPosition.mockImplementation(() => ({
            submitMutation: () => ({
              createBidderPosition: {
                result: {
                  ...defaultBidderPosition,
                  status: "OUTBID",
                },
              },
            }),
          }))

          await setupHook()

          expect(helpers.setFieldError).toHaveBeenCalledWith(
            "selectedBid",
            "OUTBID"
          )
          expect(helpers.setSubmitting).toHaveBeenCalledWith(false)
        })
      })

      describe("RESERVE_NOT_MET", () => {
        it("sets a field error on selected bid component and submitting to false", async () => {
          mockUseCreateBidderPosition.mockImplementation(() => ({
            submitMutation: () => ({
              createBidderPosition: {
                result: {
                  ...defaultBidderPosition,
                  status: "RESERVE_NOT_MET",
                },
              },
            }),
          }))

          await setupHook()

          expect(helpers.setFieldError).toHaveBeenCalledWith(
            "selectedBid",
            "RESERVE_NOT_MET"
          )
          expect(helpers.setSubmitting).toHaveBeenCalledWith(false)
        })
      })

      describe("BIDDER_NOT_QUALIFIED", () => {
        it("redirects to confirm-registration for user to register", async () => {
          const pushSpy = jest.fn()

          mockUseRouter.mockImplementation(() => ({
            match: {
              location: {
                query: {
                  redirectTo: null,
                },
              },
            },
            router: {
              push: pushSpy,
            },
          }))

          mockUseCreateBidderPosition.mockImplementation(() => ({
            submitMutation: () => ({
              createBidderPosition: {
                result: {
                  ...defaultBidderPosition,
                  status: "BIDDER_NOT_QUALIFIED",
                },
              },
            }),
          }))

          await setupHook()

          expect(pushSpy).toHaveBeenCalledWith(
            "/auction/test-sale/confirm-registration"
          )
        })
      })

      describe("ERROR", () => {
        it("redirects to confirm-registration if messageHeader=bid not placed", async () => {
          const pushSpy = jest.fn()

          mockUseRouter.mockImplementation(() => ({
            match: {
              location: {
                query: {
                  redirectTo: null,
                },
              },
            },
            router: {
              push: pushSpy,
            },
          }))

          mockUseCreateBidderPosition.mockImplementation(() => ({
            submitMutation: () => ({
              createBidderPosition: {
                result: {
                  ...defaultBidderPosition,
                  status: "ERROR",
                  messageHeader: "Bid not placed",
                },
              },
            }),
          }))

          await setupHook()

          expect(pushSpy).toHaveBeenCalledWith(
            "/auction/test-sale/confirm-registration"
          )
        })

        it("if no messageHeader, sets status to SUBMISSION_FAILED", async () => {
          mockUseCreateBidderPosition.mockImplementation(() => ({
            submitMutation: () => ({
              createBidderPosition: {
                result: {
                  ...defaultBidderPosition,
                  status: "ERROR",
                },
              },
            }),
          }))

          await setupHook()

          expect(helpers.setStatus).toHaveBeenCalledWith("SUBMISSION_FAILED")
          expect(helpers.setSubmitting).toHaveBeenCalledWith(false)
        })
      })

      describe("default fallback case", () => {
        it("sets a status and submitting to false", async () => {
          mockUseCreateBidderPosition.mockImplementation(() => ({
            submitMutation: () => ({
              createBidderPosition: {
                result: {
                  ...defaultBidderPosition,
                  status: "SOME_OTHER_STATUS",
                },
              },
            }),
          }))

          await setupHook()

          expect(helpers.setStatus).toHaveBeenCalledWith("SOME_OTHER_STATUS")
          expect(helpers.setSubmitting).toHaveBeenCalledWith(false)
        })
      })
    })
  })
})
