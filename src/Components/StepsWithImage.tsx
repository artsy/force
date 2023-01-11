import {
  Column,
  GridColumns,
  ResponsiveBox,
  Text,
  Image,
  ColumnSpan,
} from "@artsy/palette"

const imageHeight = 320
const imageWidth = 450

export type StepsWithImageDataType = {
  src: string
  srcSet: string
  text?: string
  title?: string
  step?: string
}

interface Props {
  sectionTitle?: string
  data: Array<StepsWithImageDataType>
}

export const StepsWithImage: React.FC<Props> = props => {
  const { data, sectionTitle } = props
  if (!data.length) {
    return null
  }

  const columnSpan = Math.ceil(12 / data.length)
  return (
    <>
      {sectionTitle && (
        <Text mb={4} variant="lg-display">
          {sectionTitle}
        </Text>
      )}

      <GridColumns gridRowGap={[4, 2]}>
        {data.map((step, index) => {
          return (
            <Column span={columnSpan as ColumnSpan} key={step.src + index}>
              <StepCard
                src={step.src}
                srcSet={step.srcSet}
                text={step.text}
                title={step.title}
                step={!step.step ? "0" + (index + 1) : step.step}
              />
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}

const StepCard: React.FC<StepsWithImageDataType> = ({
  src,
  title,
  step,
  text,
  srcSet,
}) => (
  <>
    <ResponsiveBox
      mb={[1, 2]}
      aspectWidth={imageWidth}
      aspectHeight={imageHeight}
      maxWidth="100%"
    >
      <Image
        lazyLoad
        alt={`step ${step} image`}
        width="100%"
        height="100%"
        src={src}
        srcSet={srcSet}
      />
    </ResponsiveBox>
    <Text mb={0.5} variant="xs" color="blue100">
      {step}
    </Text>
    {title && (
      <Text mb={0.5} variant={["lg-display", "xl"]}>
        {title}
      </Text>
    )}

    {text && <Text variant="sm">{text}</Text>}
  </>
)
