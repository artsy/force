import $ from "jquery"
import { data as sd } from "sharify"

const JSONPageEditor = require("../components/json_page/client/editor.coffee")

$(() => {
  const editor = new JSONPageEditor({
    $el: $(".js-json-page-editor"),
    data: sd.JSON_PAGE_DATA,
    paths: sd.PATHS,
  })
  return editor.setup()
})
