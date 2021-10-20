import { Component } from "react";
import sharify from "sharify"
const sd = sharify.data

export class SiftContainer extends Component {
  componentDidMount() {
    if (sd.THIRD_PARTIES_DISABLED || !sd.SIFT_BEACON_KEY) {
      return
    }

    if (document.getElementById("sift-beacon")) {
      return
    }
    const script = document.createElement("script")
    script.id = "sift-beacon"
    script.async = true
    script.textContent = `
      var _sift = window._sift = window._sift || [];
      _sift.push(['_setAccount', '${sd.SIFT_BEACON_KEY}']);
      _sift.push(['_setUserId', '${
        sd.CURRENT_USER ? sd.CURRENT_USER.id : ""
      }']);
      _sift.push(['_setSessionId', '${sd.SESSION_ID}']);
      _sift.push(['_trackPageview']);

      (function() {
        function ls() {
          var e = document.createElement('script');
          e.src = 'https://cdn.sift.com/s.js';
          document.body.appendChild(e);
        }
        if (window.attachEvent) {
          window.attachEvent('onload', ls);
        } else {
          window.addEventListener('load', ls, false);
        }
      })();
    `
    document.body.appendChild(script)
  }

  render() {
    return null
  }
}
