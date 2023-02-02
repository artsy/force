import {
  Column,
  GridColumns,
  ResponsiveBox,
  Text,
  Image,
  ColumnSpan,
  Box,
} from "@artsy/palette"

const defaultImageHeight = 320
const defeultImageWidth = 450

export type StepsWithImageBlackDataType = {
  src: string
  srcSet: string
  text?: string
  title?: string
  useBlackBackground?: boolean
  imageHeight?: number
}

interface Props {
  sectionTitle?: string
  sectionSubtitle?: string
  useBlackBackground?: boolean

  data: Array<StepsWithImageBlackDataType>
}

export const StepsWithImageBlack: React.FC<Props> = props => {
  const { sectionTitle, sectionSubtitle, data } = props
  if (!data.length) {
    return null
  }

  const columnSpan = Math.ceil(12 / data.length)

  return (
    <Box
      mx={-4}
      px={2}
      py={[4, 6, 12]}
      backgroundColor="black100"
      flexDirection="column"
    >
      {sectionTitle && (
        <Text mb={[1, 2]} variant={["lg-display", "xxl"]} color="white100">
          {sectionTitle}
        </Text>
      )}
      {sectionSubtitle && (
        <Text mb={[2, 4, 6]} variant={["xs", "sm"]} color="white100">
          {sectionSubtitle}
        </Text>
      )}

      <GridColumns gridRowGap={[4, 2]} backgroundColor="black100">
        {data.map((step, index) => {
          return (
            <Column span={columnSpan as ColumnSpan} key={step.src + index}>
              <StepCard
                src={step.src}
                srcSet={step.srcSet}
                text={step.text}
                title={step.title}
                imageHeight={step.imageHeight}
              />
            </Column>
          )
        })}
      </GridColumns>

      {/* <Rail
        title=""
        showProgress={false}
        alignItems={"flex-start"}
        getItems={() =>
          data.map((step, index) => {
            return (
              <StepCard
                src={step.src}
                srcSet={step.srcSet}
                text={step.text}
                title={step.title}
                imageHeight={step.imageHeight}
              />
            )
          })
        }
      /> */}
    </Box>
  )
}

const StepCard: React.FC<StepsWithImageBlackDataType> = ({
  src,
  title,
  text,
  srcSet,
  // imageHeight,
}) => (
  <>
    <ResponsiveBox
      mb={[1, 2]}
      aspectWidth={defeultImageWidth}
      aspectHeight={defaultImageHeight}
      maxWidth="100%"
      display="flex"
      alignItems="flex-end"
    >
      <Image
        lazyLoad
        alt={`${title} image`}
        width="100%"
        src={src}
        srcSet={srcSet}
        style={{
          display: "block",
        }}
        /*  height={imageHeight} */
      />
    </ResponsiveBox>
    {title && (
      <Text mb={0.5} variant={["md", "xl"]} color="white100">
        {title}
      </Text>
    )}

    {text && (
      <Text variant={["xs", "sm"]} color="white100">
        {text}
      </Text>
    )}
  </>
)
