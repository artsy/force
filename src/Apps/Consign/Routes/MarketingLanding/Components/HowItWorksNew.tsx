import { Button, Column, GridColumns, Text } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"

const reasons = [
  {
    index: "01",
    title: "Submit your artwork",
    text: "Upload images and artwork details via our online submission tool.",
  },
  {
    index: "02",
    title: "Get an assigned expert",
    text:
      "Our specialists will review your submission and provide a price estimate.",
  },
  {
    index: "03",
    title: "Be guided at every step",
    text:
      "Our specialists will review your submission and provide a price estimate.",
  },
  {
    index: "04",
    title: "Sell your work",
    text:
      "Once your work sells, our logistics team will handle artwork shipping and payment.",
  },
]
export const HowItWorksNew: React.FC = () => {
  return (
    <>
      <Text mb={[0.5, 1]} variant={["lg-display", "xxl"]}>
        How it works
      </Text>
      <Text mb={[2, 6]} variant={["xs", "sm"]}>
        Submit your artwork to discover if Artsy currently has a market for your
        work
      </Text>
      <GridColumns gridRowGap={10} alignItems="flex-start">
        {reasons.map(i => (
          <RowItem index={i.index} title={i.title} text={i.text} />
        ))}
      </GridColumns>
      <GridColumns>
        <Column span={2}>
          <Button
            mt={[4, 6]}
            width={"100%"}
            // @ts-ignore
            as={RouterLink}
            variant="primaryBlack"
            to="/sell/submission"
            onClick={event => {
              /* track event */
            }}
          >
            Start Selling
          </Button>
        </Column>
      </GridColumns>
    </>
  )
}

interface RowItemProps {
  index: string
  title: string
  text: string
}
const RowItem: React.FC<RowItemProps> = ({ index, title, text }) => {
  return (
    <Column span={3} mb={[2, 0]}>
      <Text mt={[0.5, 2]} variant={["lg-display", "xxl"]}>
        {index}
      </Text>
      <Text mt={[0.5, 2]} variant={["md", "xl"]}>
        {title}
      </Text>
      <Text mt={1} variant={["xs", "sm"]}>
        {text}
      </Text>
    </Column>
  )
}
