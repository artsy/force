import { find } from "lodash"

export const getSelectedBid = ({
  initialSelectedBid,
  displayIncrements,
}: {
  initialSelectedBid: string
  displayIncrements: Array<{ value: string; text: string }>
}): string => {
  let selectedIncrement: { value: string }

  if (!initialSelectedBid) {
    selectedIncrement = displayIncrements[0]
  } else {
    const bid = Number(initialSelectedBid)
    const foundIncrement = find(displayIncrements, i => Number(i.value) === bid)
    selectedIncrement = foundIncrement || displayIncrements[0]
  }

  return selectedIncrement.value
}
