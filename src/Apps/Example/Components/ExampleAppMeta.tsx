import { Meta, Title } from "react-head"
import { data as sd } from "sharify"

export const ExampleAppMeta = () => {
  return (
    <>
      <Title>Example App | Artsy</Title>
      <Meta property="og:title" content="Example App" />
      <Meta name="description" content="Fill this with a proper description" />
      <Meta
        property="og:description"
        content="Fill this with a proper description"
      />
      <Meta
        property="twitter:description"
        content="Fill this with a proper description"
      />
      <Meta property="og:url" href={`${sd.APP_URL}/example`} />
      <Meta property="og:type" href={`${sd.FACEBOOK_APP_NAMESPACE}:example`} />
    </>
  )
}
