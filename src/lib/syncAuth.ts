import $ from "jquery"
import { data as sd } from "sharify"

/**
 * Checks if a logged in user's session has expired and logs the user out if it
 * has.
 */
export default function syncAuth() {
  if (sd.CURRENT_USER) {
    $.ajax({
      url: `${sd.API_URL}/api/v1/me`,
      // success: ensureFreshUser, # this can cause an endless reload
      statusCode: {
        401: () => {
          $.ajax({
            method: "DELETE",
            url: "/users/sign_out",
            complete() {
              return window.location.reload()
            },
          })
        },
      },
    })
  }
}
