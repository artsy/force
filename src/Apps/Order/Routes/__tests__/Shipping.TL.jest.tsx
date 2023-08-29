describe("Shipping", () => {
  describe("with partner shipping", () => {
    describe("with no saved address", () => {
      it("shows an active offer stepper if it's an offer order", async () => {})

      it("does not render fulfillment selection if artwork is not available for pickup", async () => {})

      it("disables country select if artwork only ships domestically and is not in the EU", async () => {})

      it("enables country select if artwork only ships domestically and is in the EU", async () => {})

      it("sets shipping on order and saves address on user", async () => {})

      it("sets shipping on order but does not save address if save address is not checked", async () => {})

      it("routes to payment screen after mutation completes", async () => {})

      it("shows the button spinner while loading the mutation", async () => {})

      it("shows an error when there is an error from the server", async () => {})

      it("shows an error when there is a network error", async () => {})

      it("shows an error when there is a missing_country error from the server", async () => {})

      it("shows an error when there is a missing_region error from the server", async () => {})

      it("pre-populates address form for order with already persisted shipping info", async () => {})

      it("resets shipping for order with already persisted shipping info", async () => {})

      describe("form validations", () => {
        it("does not submit an empty form", async () => {})

        it("does not submit an incomplete form", async () => {})

        it("requires some fields", async () => {})

        it("requires a phone number", async () => {})

        it("allows a missing postal code if the selected country is not US or Canada", async () => {})

        it("allows a missing state/province if the selected country is not US or Canada", async () => {})

        it("only shows validation erros on touched inputs before submission", async () => {})

        it("shows all validation erros including untouched inputs after submission", async () => {})
      })

      describe("address verification", () => {
        describe("with US enabled and international disabled", () => {
          it("triggers the flow for US address after clicking continue", async () => {})

          it("does not triggers the flow for international address after clicking continue", async () => {})
        })

        describe("with US disabled and international enabled", () => {
          it("does not triggers tthe flow for US address after clicking continue", async () => {})

          it("triggers the flow for international address after clicking continue", async () => {})
        })

        it("triggers basic form validation before address verification", async () => {})
      })
    })

    describe("with saved addresses", () => {
      it("does not show the new address form", async () => {})

      it("lists the addresses and renders the add address option", async () => {})

      it("sets shipping with the first saved address and phone number when user submits the form directly", async () => {})

      it("sets shipping with the selected saved address and phone number", async () => {})

      describe("address verification", () => {
        describe("with address verification enabled", () => {
          it("does not trigger the flow", async () => {})
        })
      })

      describe("editing address", () => {
        it("opens a modal with the address prepopulated", async () => {})

        it("updates the address after submitting the modal form", async () => {})
      })
    })
  })

  describe("with Artsy shipping", () => {
    describe("with no saved address", () => {
      it("sets shipping on order, selects shipping quote, and save address on user", async () => {})

      it("shows an error if Arta doesn't return shipping quotes", async () => {})

      it("saves address only once", async () => {})

      it("removes previously saved address if save address is not selected", async () => {})
    })

    describe("with saved addresses", () => {
      describe("Artsy shipping international", () => {
        describe("with artwork located in the US", () => {
          it("sets shipping on order if the collector is in the EU", async () => {})

          it("does not set shipping on order if the collector is in the US", async () => {})
        })

        describe("with artwork located in Germany", () => {
          it("does not set shipping on order if the collector is in the EU", async () => {})

          it("sets shipping on order if the collector is in the US", async () => {})
        })
      })

      describe("Artsy shipping domestic", () => {
        describe("with artwork located in Germany", () => {
          it("sets shipping on order if the collector is in Germany", async () => {})

          it("does not set shipping on order if the collector is in the US", async () => {})
        })

        describe("with artwork located in the US", () => {
          it("does not show shipping quote if the collector is in the EU", async () => {})

          describe("with the collector in the US", () => {
            it("sets shipping", async () => {})

            it("shows shipping quotes after committing set shipping mutation", async () => {})

            it("selects the first quote and enables the submit button", async () => {})

            it("keeps the submit button enabled after selecting a shipping quote", async () => {})

            it("commits selectShippingOption mutation twice with correct input", async () => {})

            it("routes to payment screen after selectShippingOption mutation completes", async () => {})

            it("reloads shipping quotes after editing the selected address", async () => {})

            it("does not reload shipping quotes after editing a non-selected address", async () => {})
          })
        })
      })
    })
  })

  describe("with pickup", () => {
    it("shows an empty phone number input", async () => {})

    it("sets pickup on order", async () => {})

    it("does not submit an incomplete form", async () => {})
  })
})
