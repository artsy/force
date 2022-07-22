export const selectProps = {
  options: [
    {
      text: "Price",
      value: "price",
    },
    {
      text: "Most Recent",
      value: "mostRecent",
    },
    {
      text: "Estimate",
      value: "estimate",
    },
  ],
  selected: "price",
  onSelect: x => x,
}
