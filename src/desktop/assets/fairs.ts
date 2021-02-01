import $ from "jquery"
import { data as sd } from "sharify"

if (sd.FAIR_ORGANIZER) {
  $(require("../apps/fair_organizer/client/index.coffee").init)
}
