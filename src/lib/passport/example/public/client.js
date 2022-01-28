;(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        let a = typeof require == "function" && require
        if (!u && a) return a(o, !0)
        if (i) return i(o, !0)
        let f = new Error("Cannot find module '" + o + "'")
        throw ((f.code = "MODULE_NOT_FOUND"), f)
      }
      let l = (n[o] = { exports: {} })
      t[o][0].call(
        l.exports,
        function (e) {
          let n = t[o][1][e]
          return s(n ? n : e)
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      )
    }
    return n[o].exports
  }
  var i = typeof require == "function" && require
  for (let o = 0; o < r.length; o++) s(r[o])
  return s
})(
  {
    1: [
      function (require, module, exports) {
        const sd = require("sharify").data

        $(function () {
          if (sd.CURRENT_USER) {
            $("body").append(
              "<br><br>your email from the client-side!<br> " +
                sd.CURRENT_USER.email
            )
            $("[href*=sign_out]").click(function (e) {
              e.preventDefault()
              $.ajax({
                url: "/users/sign_out",
                type: "DELETE",
                success() {
                  return (window.location = "/")
                },
                error(xhr, status, error) {
                  return alert(error)
                },
              })
            })
            $("[href*=delete]").click(function (e) {
              if (!confirm("Are you sure?")) {
                return e.preventDefault()
              }
            })
          } else {
            $("#trust button").click(() =>
              $.ajax({
                type: "POST",
                url: `${sd.ARTSY_URL}/api/v1/me/trust_token`,
                headers: { "x-access-token": $("#trust input").val().trim() },
                error(e) {
                  alert("Error!")
                  return console.warn(e)
                },
                success({ trust_token }) {
                  return (window.location = `http://${location.host}?trust_token=${trust_token}`)
                },
              })
            )
          }
        })
      },
      { sharify: 2 },
    ],
    2: [
      function (require, module, exports) {
        // Middleware that injects the shared data and sharify script
        module.exports = function (req, res, next) {
          // Clone the "constant" sharify data for the request so
          // request-level data isn't shared across the server potentially
          // exposing sensitive data.
          let data = {}
          for (let key in module.exports.data) {
            data[key] = module.exports.data[key]
          }

          // Inject a sharify object into locals for `= sharify.data` and `= sharify.script()`
          res.locals.sharify = {
            data: data,
            script: function () {
              return (
                '<script type="text/javascript">' +
                "window.__sharifyData = " +
                //There are tricky rules about safely embedding JSON within HTML
                //see http://stackoverflow.com/a/4180424/266795
                JSON.stringify(data)
                  .replace(/</g, "\\u003c")
                  .replace(/-->/g, "--\\>")
                  .replace(/\u2028/g, "\\u2028")
                  .replace(/\u2029/g, "\\u2029") +
                ";</script>"
              )
            },
          }

          // Alias the sharify short-hand for convience
          res.locals.sd = res.locals.sharify.data

          next()
        }

        // The shared hash of data
        module.exports.data = {}

        // When required on the client via browserify, run this snippet that reads the
        // sharify.script data and injects it into this module.
        let bootstrapOnClient = (module.exports.bootstrapOnClient = function () {
          if (typeof window != "undefined" && window.__sharifyData) {
            module.exports.data = window.__sharifyData
            // Conveniently expose globals so client-side templates can access
            // the `sd` and `sharify.data` just like the server.
            if (!window.sharify) window.sharify = module.exports
            if (!window.sd) window.sd = window.__sharifyData
          }
        })
        bootstrapOnClient()
      },
      {},
    ],
  },
  {},
  [1]
)
