import { Column, GridColumns, Text } from "@artsy/palette"

const reasons = [
  {
    index: "01",
    title: "Submit your artwork",
    text:
      "Upload artwork images and details through our online tool. Our specialists will let you know if we currently have market demand.",
  },
  {
    index: "02",
    title: "Meet your expert",
    text:
      "If your artwork is accepted, you’re matched with a specialist to guide you on pricing, sales options, and vetting potential buyers.",
  },
  {
    index: "03",
    title: "Get a sales option",
    text:
      "You’ll get a tailored sales strategy with a price estimate and we select the best sales option for your work, either auction, private sale or direct listing on Artsy.",
  },
  {
    index: "04",
    title: "Sell your work",
    text:
      "Your artwork stays with you until it sells. Meanwhile, our logistics team handles everything, from organizing shipping to getting your payment to you.",
  },
]
export const HowItWorksNew: React.FC = () => {
  return (
    <>
      <Text mb={[2, 6]} variant={["lg-display", "xxl"]}>
        How it works
      </Text>
      <GridColumns gridRowGap={10} alignItems="flex-start">
        {reasons.map(i => (
          <RowItem index={i.index} title={i.title} text={i.text} />
        ))}
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
