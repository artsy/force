import { Column, GridColumns, Text, Box, Image, Spacer } from "@artsy/palette"
import { resized } from "Utils/resized"

const DATA: { value: string; title: string }[] = [
  {
    value: "3M+",
    title: "registered users worldwide",
  },
  {
    value: "3,000",
    title: "miles average transaction distance",
  },
  {
    value: "190",
    title: "countries in our network",
  },
]

export const CollectorsOverview: React.FC = () => {
  const image = resized(
    "https://files.artsy.net/images/world-map-with-circles.jpg",
    { width: 1277, height: 634, quality: 100 }
  )

  return (
    <>
      <Text mb={[2, 4, 6]} variant={["lg-display", "xl", "xxl"]}>
        Reach a global network of collectors
      </Text>
      <GridColumns gridColumnGap={[0, 2, 6]} gridRowGap={[0, 2, 6]}>
        <Column span={4}>
          <GridColumns
            gridColumnGap={[2, 0, 6]}
            gridRowGap={[2, 2, 6]}
            display="flex"
            alignItems={["flex-start", "center"]}
          >
            {DATA.map((i, index) => (
              <Column flexDirection="column" span={[6, 8]} key={index}>
                <Box>
                  <Text variant={["xl", "xxl", "xxxl"]}>{i.value}</Text>
                  <Text variant={["xs", "sm", "lg-display"]}>{i.title}</Text>
                </Box>
              </Column>
            ))}
          </GridColumns>
          <Spacer y={[2, 0]} />
        </Column>
        <Column
          span={8}
          justifyContent={["center", "flex-end", "flex-end"]}
          alignItems="center"
          display="flex"
        >
          <Box maxWidth="100%">
            <Image
              src={image.src}
              srcSet={image.srcSet}
              width="100%"
              height="100%"
              lazyLoad
              alt="World Map"
              style={{
                display: "block",
              }}
            />
          </Box>
        </Column>
      </GridColumns>
    </>
  )
}
