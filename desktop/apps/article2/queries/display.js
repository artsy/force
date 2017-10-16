export const display = `
  display {
    name
    canvas {
      ...DisplayUnit
    }
    panel {
      ...DisplayUnit
    }
  }
`
export const displayFragment = `
  fragment DisplayUnit on DisplayUnit {
    assets {
      url
    }
    body
    disclaimer
    headline
    layout
    link {
      text
      url
    }
    logo
    name
  }
`
