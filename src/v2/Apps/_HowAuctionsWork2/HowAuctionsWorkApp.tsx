import { Column, GridColumns, Image, Spacer, Text } from "@artsy/palette"
import { MetaTags } from "v2/Components/MetaTags"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useScrollTo } from "v2/Utils/Hooks/useScrollTo"

export const HowAuctionsWorkApp: React.FC = () => {
  const { scrollTo } = useScrollTo({
    selectorOrRef: "#download-app-banner",
    behavior: "smooth",
  })

  return (
    <>
      <MetaTags
        title="How Artsy Auctions Work"
        description="Auctions on Artsy provide the opportunity to participate in sales
            happening all over the world from the comfort of your own home. On
            Artsy, you can watch a live auction and place bids in advance or in
            real time, or you can bid in our curated timed auctions. Bidding
            with Artsy is simple, with just a few easy steps."
        pathname="/how-auctions-work"
      />

      <Section
        left={
          <>
            <Text variant={["xl", "xxl"]} my={2}>
              How Artsy Auctions Work
            </Text>
            <Content>
              Auctions on Artsy provide the opportunity to participate in sales
              happening all over the world from the comfort of your own home. On
              Artsy, you can watch a live auction and place bids in advance or
              in real time, or you can bid in our curated timed auctions.
              Bidding with Artsy is simple, with just a few easy steps.
            </Content>

            <Spacer py={1} />

            <Header>1. Register to Bid</Header>
            <Content>
              To place bids in an auction on Artsy, the first step is to
              register to bid. Each sale has a separate registration on the
              auctions dedicated sale page. If you have already registered with
              us before, ensure that you are logged in and click “Register to
              Bid” for a one-step registration. When you register, take note of
              the type of auction you've registered for and see applicable steps
              below for Live or Timed bidding processes. Registration for most
              live sales closes 24 hours in advance of the sale, so make sure to
              register early!
            </Content>
          </>
        }
        right={
          <Image
            width="100%"
            height="auto"
            src="https://artsy-media-uploads.s3.amazonaws.com/5YxrPB8GCjFuSvbHFbKlGA/Group%204.jpg"
          />
        }
      />

      <Section
        left={
          <Image
            width="100%"
            height="auto"
            src="https://artsy-media-uploads.s3.amazonaws.com/pPSAC76n8aTuNR4CVCXR6A/browse.jpg"
          />
        }
        right={
          <>
            <Header>2. Browse & Request Additional Info</Header>
            <Content>
              When you see a lot you want to bid on, you can view more
              information by clicking the thumbnail. You can also connect with
              an Artsy specialist by clicking “Ask a Specialist” for any
              additional questions.
              <Spacer my={2} />
              <RouterLink
                to="#"
                textDecoration="underline"
                mt={1}
                onClick={event => {
                  event.preventDefault()
                  scrollTo()
                }}
              >
                Download Artsy for iPad or iPhone
              </RouterLink>
            </Content>
          </>
        }
      />

      <Section
        left={
          <>
            <Header>3. Live Bidding</Header>
            <Content>
              If you are bidding in a live auction, you can place a maximum bid
              anytime before the lot is up for auction. Artsy will execute your
              bid(s) in the room on your behalf up to, but not beyond, the
              defined amount. You can also tune in live as the auction unfolds
              through Artsy’s Digital Saleroom that will become available on the
              specific auction page when the sale begins. Our system will tell
              you if you are winning by indicating that the current amount in
              the room is going to your paddle number.
            </Content>
          </>
        }
        right={
          <Image
            width="100%"
            height="auto"
            src="https://artsy-media-uploads.s3.amazonaws.com/7CoZk03SCuz1_6NWI156Eg/Group%207.png"
          />
        }
      />

      <Section
        left={<Image src="" width="100%" height={500} />}
        right={
          <>
            <Header>4. Timed Bidding</Header>
            <Content>
              If you are bidding in an timed auction, you can place a maximum
              bid and the system will bid on your behalf based on our bidding
              increments below at the lowest competitive price. Pricing
              increases (up to - but not beyond - your maximum bid) as other
              users bid on the work. Please note that maximum bid amounts are
              only executed if there is a competing bidder up to that amount.
            </Content>
          </>
        }
      />

      <Section
        left={
          <>
            <Header>5. Win</Header>
            <Content>
              All winning bidders will get a confirmation email at the close of
              the auction, and auction houses will reach out to you directly
              about next steps within shortly following the sale.
            </Content>
          </>
        }
        right={
          <Image
            width="100%"
            height="auto"
            src="https://artsy-media-uploads.s3.amazonaws.com/H9jAQnMdvBnWiQZ2a_BfpQ/win.jpg"
          />
        }
      />
    </>
  )
}

const Section: React.FC<{ left: JSX.Element; right: JSX.Element }> = ({
  left,
  right,
}) => {
  return (
    <GridColumns mt={2} alignItems="center" mb={4}>
      <Column span={6}>{left}</Column>
      <Column span={6}>{right}</Column>
    </GridColumns>
  )
}

const Header: React.FC = ({ children }) => {
  return (
    <Text variant={["lg", "xl"]} mb={2}>
      {children}
    </Text>
  )
}

const Content: React.FC = ({ children }) => {
  return <Text variant="sm">{children}</Text>
}
