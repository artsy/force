import { scrollIntoView } from "Utils/scrollHelpers"

export function scrollToTop() {
  scrollIntoView({
    selector: "#scrollTo--artistContentArea",
    behavior: "smooth",
    offset: 150,
  })
}
