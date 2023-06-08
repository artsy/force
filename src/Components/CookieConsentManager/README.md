# Cookie Consent Manager

| Region               | URL      | Behavior      |
| -------------------- | -------- | ------------- |
| US (sans California) | /        | Don't display |
| EU                   | /?geo=eu | Opt-in        |
| California           | /?geo=ca | Opt-out       |
| Brazil               | /?geo=br | Out-out       |

## Overview

- We use Segment's `ConsentManagerBuilder` to load Segment integrations.
  - It will automatically handle any integrations which are enabled through Segment
  - For other things that introduce 3rd party cookies we include them as custom preferences then use the provider to expose those preferences and block or enable those features.
- We use timezone information to determine initial opt-in/out preferences and whether or not to display the banner to users
- We log an event for auditing to Segment when preferences are saved, it includes the tracking preferences as the `value`.

### Custom integrations

Currently we manually block and integrate YouTube/Vimeo embeds and our editorial ads.

In `categories.ts` add an entry to the `CUSTOM_DESTINATIONS` array, corresponding with your integration.

```ts
export const CUSTOM_DESTINATIONS: Destination[] = [
  // ...
  {
    category: "targeting",
    description: "A description of what it does",
    id: "MyCustomIntegration",
    name: "MyCustomIntegration",
    website: "https://www.mycustomintegration.com/",
    creationName: "MyCustomIntegration",
  },
]
```

Then, where that content is rendered, gate access to it using the `isDestinationAllowed` function:

```tsx
const { isDestinationAllowed, openConsentManager } = useCookieConsentManager()

return (
  <>
    {isDestinationAllowed("MyCustomIntegration") ? (
      <MyCustomIntegration />
    ) : (
      <Button onClick={openConsentManager}>Manage Cookies</Button>
    )}
  </>
)
```
