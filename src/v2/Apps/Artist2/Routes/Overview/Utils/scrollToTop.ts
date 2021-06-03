import { scrollIntoView } from "v2/Utils/scrollHelpers"

export function scrollToTop() {
  scrollIntoView({
    selector: "#scrollTo--artist2ContentArea",
    behavior: "smooth",
    offset: 150,
  })
}
