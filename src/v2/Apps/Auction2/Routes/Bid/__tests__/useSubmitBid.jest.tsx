describe("useSubmitBid", () => {
  it("sets status to null when bid initially being set", () => {
    //
  })

  describe("create token", () => {
    it("creates a token if user does not have payment info", () => {
      //
    })

    it("handles error if token fails", () => {
      //
    })
  })

  describe("creating bidder position", () => {
    it("creates a bidder position", () => {
      //
    })

    it("handles error", () => {
      //
    })
  })

  it("calls track new bidder", () => {
    //
  })

  describe("checkBidStatus", () => {
    it("checks bid status", () => {
      //
    })

    it("handles error", () => {
      //
    })

    describe("status handling", () => {
      describe("SUCCESS", () => {
        it("calls getBidderPosition", () => {
          //
        })
      })

      describe("PENDING", () => {
        it("if polling, waits and then calls getBidderPosition again", () => {
          //
        })

        it("if polling max met, set error status", () => {
          //
        })
      })

      describe("WINNING", () => {
        it("redirects to /artwork/id", () => {
          //
        })

        it("redirects to custom url, if provided", () => {
          //
        })

        it("sends a toast", () => {
          //
        })
      })

      describe("OUTBID", () => {
        it("sets a field error on the selectedBid component", () => {
          //
        })

        it("sets submitting to false", () => {
          //
        })
      })

      describe("RESERVE_NOT_MET", () => {
        it("sets a field error on selected bid component", () => {
          //
        })

        it("sets submitting to false", () => {
          //
        })
      })

      describe("BIDDER_NOT_QUALIFIED", () => {
        it("redirects to confirm-registration for user to register", () => {
          //
        })
      })

      describe("ERROR", () => {
        it("redirects to confirm-registration if messageHeader = bid not placed", () => {
          //
        })
      })

      describe("default fallback case", () => {
        it("sets a status", () => {
          //
        })

        it("sets submitting to false", () => {
          //
        })
      })
    })
  })
})
