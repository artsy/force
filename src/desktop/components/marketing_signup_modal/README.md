# Marketing Signup Modal

A modal that pops up after 3 seconds when a logged out user from outside Artsy lands on the containing page.

![](https://cloud.githubusercontent.com/assets/1022172/20072470/8735dfe4-a4f6-11e6-9364-6e05c42bf304.jpg)

## Usage

This uses config variables to determine where it's applied. Use `hokusai [staging|production] env [get|set] MARKETING_SIGNUP_MODALS` to add a new campaign to the array of existing modals.

Examples

```
MARKETING_SIGNUP_MODALS=[
  {
    slug: "ca3",
    copy: "Discover and Buy Works from Art Fairs",
    image: "http://files.artsy.net/images/art-fair.jpg",
  }
]
```

## Implementation

This is implemented globally in our main_layout and fair_layout component by adding the view client-side and checking against the config variables added to sharify.
