import { scrollIntoView } from "v2/Utils/scrollHelpers"

export function scrollToTop() {
  scrollIntoView({
    selector: "#scrollTo--artistContentArea",
    behavior: "smooth",
    offset: 150,
  })
}
