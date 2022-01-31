import { Sans, Toggle } from "@artsy/palette"
import { AuctionFAQ_Query$rawResponse } from "v2/__generated__/AuctionFAQ_Query.graphql"
import { renderRelayTree } from "v2/DevTools"
import { graphql } from "react-relay"
import { AuctionFAQFragmentContainer } from "../AuctionFAQ"

jest.unmock("react-relay")

const viewerMockResponse: AuctionFAQ_Query$rawResponse["viewer"] = {
  bidding: {
    id: "opaque-bidding-id",
    content:
      "How do I Register for an Auction?\n\nAll bidders need to register by completing an online form and providing all required information, such as their full name, contact information, and credit card details. Auction Houses often require additional vetting of bidders and may prevent registration in advance of a sale. Check the instructions for the sale you are interested in and register early. We will communicate the status of your registration via the email and contact information you provide.\n\n## How do I place a bid?\n\nBidding on Artsy is easy with our automatic bidding system. Select your bid amount as long as it is greater than or equal to the next minimum bid shown on the bidding screen, then click the “Bid” button. This will automatically place a bid for you at the next increment and save the amount you entered (if higher) as your “Maximum Bid.” \n\n## What is a Maximum Bid?\n\nIf you enter a bid amount higher than the next minimum bid, the amount you enter is treated as your “Maximum Bid.” Entering a Maximum Bid does not necessarily mean you will pay that price, and you may pay less. As the auction progresses, our system will bid automatically for you against other bidders, according to our automatic bidding increments (see below), up to (but not exceeding) your Maximum Bid, only as much as necessary to maintain your position as highest bidder.  If two bidders attempt to enter the same Maximum Bid, the first bidder to enter that amount will be the winner. \n\n## What are Bidding Increments?\n\nOur automatic bidding increments determine the next minimum bid that can be placed. They are based on the current bid of each item and increase at the following intervals, when the current bid is:\n\nUnder $1,000:  $50  \n$1,000 - $1,999: $100  \n$2,000 - $4,999: $250  \n$5,000 - $9,999: $500  \n$10,000 - $19,999: $1,000  \n$20,000 - $49,999: $2,000   \n$50,000 - $99,999: $5,000  \nAt or above $100,000: $10,000\n\nNote: Our usual bidding increments are listed above, but depending on the auction, we will default to the bidding increments of our auction house partners.\n\n## What is a Reserve Price?\n\nA reserve price (also known as a \"reserve\") is the confidential minimum price below which the item may not be sold in the auction. If an item has a reserve, this will be indicated on the bidding screen where you enter your bid. When you bid on an item with a reserve, if your Maximum Bid meets or exceeds the reserve, your bid will be increased to meet the reserve (according to our automatic bidding increments), and bidding will continue from there. If an item is offered with a reserve, Artsy will be authorized to bid on the seller's behalf, up to the amount of the reserve. Some live sales may have unknown reserves and we will try to represent them as accurately as we can during the live sale. In live sales, the auctioneer's decision is the final one.",
  },
  buyersPremiumTaxesAndFees: {
    id: "opaque-taxes-fees-id",
    content:
      "What is a buyer’s premium?\nA buyer’s premium is an additional charge the winning bidder pays on top of the item's hammer price. If an item has a buyer's premium, this will be indicated on the bidding screen where you enter your bid, along with the rate of the buyer's premium. The buyer's premium is calculated as a percentage of the item's hammer price.\n\n## What about taxes?\nBuyers are responsible for paying all sales and use taxes, VAT and any other taxes that apply to their purchases. Applicable taxes will be added to the winning bidder’s invoice after the auction. \n",
  },
  paymentsAndShipping: {
    id: "opaque-payment-shipping-id",
    content:
      "How does payment work after an auction?\nWinning bidders will receive an email after the auction with instructions for how to checkout and pay for purchased items. Depending on the sale, either Artsy or the seller will collect payment from the buyer, and buyers will be notified accordingly upon conclusion of the auction.\n\n## How does shipping work?\nAfter an auction, the buyer will be connected with the seller to arrange shipping. Normally buyers may choose between a common carrier (like FedEx) and a specialist fine art shipper. Shipping costs are the responsibility of the buyer.\n",
  },
  emailsAndAlerts: {
    id: "opaque-emails-alerts-id",
    content:
      "Bidders will receive an email to confirm when their bid has been received, and an email to notify them when they are outbid. After the auction, winning bidders will also receive an email to notify them of their winning bid. Please be sure to register with a valid email address and to check your email frequently during an auction to make sure you receive all relevant updates.  ",
  },
  conditionsOfSale: {
    id: "considitions-of-sale-id",
    content:
      "CONDITIONS OF SALE\n\nOur standard [Conditions of Sale](/conditions-of-sale) contain important terms, conditions and information that apply to all bidders. By bidding in an auction on Artsy, you are accepting our [Conditions of Sale](/conditions-of-sale). Please read them carefully before bidding. \n",
  },
}

const viewerEmptyMockResponse: AuctionFAQ_Query$rawResponse["viewer"] = {
  bidding: {
    id: "opaque-bidding-id",
    content: null,
  },
  buyersPremiumTaxesAndFees: {
    id: "opaque-taxes-fees-id",
    content: null,
  },
  paymentsAndShipping: {
    id: "opaque-payment-shipping-id",
    content: null,
  },
  emailsAndAlerts: {
    id: "opaque-emails-alerts-id",
    content: null,
  },
  conditionsOfSale: {
    id: "considitions-of-sale-id",
    content: null,
  },
}

describe("AuctionFAQ", () => {
  const getWrapper = async (
    mockResponse: AuctionFAQ_Query$rawResponse["viewer"]
  ) => {
    return await renderRelayTree({
      Component: AuctionFAQFragmentContainer,
      query: graphql`
        query AuctionFAQ_Query @raw_response_type @relay_test_operation {
          viewer {
            ...AuctionFAQ_viewer
          }
        }
      `,
      mockData: {
        viewer: mockResponse,
      } as AuctionFAQ_Query$rawResponse,
    })
  }

  it("renders content correctly", async () => {
    const wrapper = await getWrapper(viewerMockResponse)
    const biddingContent = wrapper.find(Toggle).at(0).find(Sans)
    biddingContent.simulate("click")
    wrapper.update()
    expect(wrapper.text()).toContain("How do I Register for an Auction?")
  })

  it("hides toggles if no content", async () => {
    const wrapper = await getWrapper(viewerEmptyMockResponse)
    const togglesLength = wrapper.find(Toggle).length
    expect(togglesLength).toBe(0)
  })
})
