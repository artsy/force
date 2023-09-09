describe("Status", () => {
  describe("offers", () => {
    it("should should have a title containing status", () => {})

    describe("submitted", () => {
      it("should say order submitted and have message box", () => {})

      it("should say order submitted and have message to continue to inbox on Eigen", () => {})

      it("should not show a note section if none exists", () => {})
    })

    describe("in review", () => {
      it("should say order submitted and have message box", () => {})

      it("should say order submitted and have message to continue to inbox on Eigen", () => {})
    })

    describe("approved", () => {
      it("should say confirmed and have message box", () => {})
    })

    describe("processing", () => {
      it("should say confirmed and have message box", () => {})
    })

    describe("processing approval", () => {
      describe("with wire payment method", () => {
        it("should say 'Thank you, your offer has been accepted' and have message box", () => {})

        it("renders Message with alert variant and 'please proceed' message", () => {})

        it("renders the alert Message with correct messages", () => {})

        it("renders content for Artsy's bank details", () => {})
      })

      describe("with non-wire payment methods", () => {
        it("should say 'Offer accepted. Payment processing.' and have message box", () => {})

        it("renders description", () => {})

        it("does not render an alert message", () => {})
      })
    })

    describe("in transit", () => {
      it("should say confirmed, have message box and the tracking URL", () => {})

      it("should display non linked tracking number if no Url", () => {})

      it("should display note about shipping when tracking is not available", () => {})
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", () => {})
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", () => {})
    })

    describe("buyer rejected", () => {
      it("should say that offer was declined", () => {})
    })

    describe("seller rejected", () => {
      it("should say that offer was declined", () => {})
    })

    describe("seller lapsed", () => {
      it("should say that offer expired", () => {})
    })

    describe("buyer lapsed", () => {
      it("should say that offer expired", () => {})
    })

    describe("refunded", () => {
      it("should say that order was canceled", () => {})
    })

    describe("canceled after accept", () => {
      it("should say that order was canceled", () => {})
    })
  })

  describe("orders", () => {
    it("should should have a title containing status", () => {})

    describe("submitted", () => {
      it("should say order submitted and have message box", () => {})
    })

    describe("approved", () => {
      it("should say confirmed", () => {})

      it("should render correct title for Private Sale orders", () => {})

      it("should render correct description for Private Sale orders", () => {})

      it("should render help email in description for Private Sale orders", () => {})
    })

    describe("processing approval", () => {
      describe("with wire payment method", () => {
        it("should render correct title and have message box", () => {})

        it("should render correct title for wire private sale orders", () => {})

        it("renders Message with alert variant and 'please proceed' message", () => {})

        it("should render correct instruction for wire private sale orders", () => {})

        it("should not render any description for wire private sale orders", () => {})

        it("renders the alert Message with correct messages", () => {})

        it("renders correct Artsy bank details for orders in USD", () => {})

        it("renders correct Artsy bank details for orders in GBP", () => {})

        it("renders correct Artsy bank details for orders in EUR", () => {})
      })

      describe("with non-wire payment methods", () => {
        it("should say 'Your order is confirmed. Payment processing.' and have message box", () => {})

        it("should render correct title for private sale orders", () => {})

        it("renders description", () => {})

        it("should render correct description for private sale orders", () => {})

        it("does not render an alert message", () => {})
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", () => {})
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", () => {})
    })

    describe("canceled (ship)", () => {
      it("should say that order was canceled", () => {})
    })

    describe("canceled (pickup)", () => {
      it("should say that order was canceled", () => {})
    })

    describe("refunded", () => {
      it("should say that order was canceled", () => {})
    })
  })
})
