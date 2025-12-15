/**
 * Creates a responsive array for the single and dual-column layout breakpoints.
 */
export const responsiveColumnsProps = <T>(
  singleColumn: T,
  dualColumn: T,
): [T, T, T] => {
  return [singleColumn, singleColumn, dualColumn]
}
