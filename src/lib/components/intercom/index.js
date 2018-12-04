import { data as sd } from "sharify"

export const intercom = function(appID, userData = null) {
  window.intercomSettings = {
    app_id: appID,
  }

  // Logged-in user w/ identity verification
  if (userData) {
    window.intercomSettings.name = userData.name
    window.intercomSettings.email = userData.email
    window.intercomSettings.user_hash = userData.userHash
  }
  var w = window
  var ic = w.Intercom
  if (typeof ic === "function") {
    ic("reattach_activator")
    ic("update", intercomSettings)
  } else {
    var d = document
    var i = function() {
      i.c(arguments)
    }
    i.q = []
    i.c = function(args) {
      i.q.push(args)
    }
    w.Intercom = i
    function l() {
      var s = d.createElement("script")
      s.type = "text/javascript"
      s.async = true
      s.src = `https://widget.intercom.io/widget/${appID}`
      var x = d.getElementsByTagName("script")[0]
      x.parentNode.insertBefore(s, x)
    }
    if (w.attachEvent) {
      w.attachEvent("onload", l)
    } else {
      w.addEventListener("load", l, false)
    }
  }
}
