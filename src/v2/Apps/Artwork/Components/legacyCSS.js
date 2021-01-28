export const legacyCSS = `
.loading-spinner,
.loading-spinner-white {
  background: #000;
  width: 25px;
  height: 6px;
  position: absolute;
  top: calc(50% - 6px / 2);
  left: calc(50% - 25px / 2);
  animation: spin 1s infinite linear;
}
.loading-spinner-small,
.loading-spinner-small-white {
  background: #000;
  width: 20px;
  height: 4px;
  position: absolute;
  top: calc(50% - 4px / 2);
  left: calc(50% - 20px / 2);
  animation: spin 1s infinite linear;
}
.loading-spinner-white {
  background: #fff;
}
.loading-spinner-small-white {
  background: #fff;
}
.loading-ellipsis > span {
  letter-spacing: 2px;
}
.loading-ellipsis > span:nth-child(1) {
  animation: fade 1s infinite;
  animation-delay: 0.2s;
}
.loading-ellipsis > span:nth-child(2) {
  animation: fade 1s infinite;
  animation-delay: 0.4s;
}
.loading-ellipsis > span:nth-child(3) {
  animation: fade 1s infinite;
  animation-delay: 0.6s;
}
@-moz-keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
@-o-keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
@-moz-keyframes fade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes fade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-o-keyframes fade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.confirmation-modal {
  padding: 60px 60px 30px 60px;
}
.confirmation-modal__title {
  text-align: center;
  font-size: 30px;
  line-height: 1.25;
}
.confirmation-modal__message {
  font-size: 17px;
  line-height: 1.5;
  margin: 31px 0;
}
.confirmation-modal__actions > .avant-garde-button-white {
  border-color: transparent;
  color: #666;
}
.hover-pulldown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.hover-pulldown > a {
  text-decoration: none;
}
.hover-pulldown:not(.mlh-hamburger):not(.mlh-notification):not(.mlh-user-name):not(.artist-page-cta-overlay__feed__pulldown):before {
  display: block;
  position: absolute;
  content: "";
  top: 75%;
  left: 50%;
  margin-left: -4px;
  background: transparent;
  border: 4px solid transparent;
  border-top-color: #000;
  border-top-width: 6px;
}
.hover-pulldown:after {
  display: block;
  position: absolute;
  content: "";
  top: 100%;
  left: 50%;
  margin-left: -10px;
  background: transparent;
  border: 10px solid transparent;
  border-bottom-color: #000;
  border-bottom-width: 15px;
  visibility: hidden;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
}
.hover-pulldown[data-mode="touch"]:after,
.hover-pulldown[data-mode="touch"] .hover-pulldown-menu {
  -webkit-transition: none;
  -moz-transition: none;
  -o-transition: none;
  -ms-transition: none;
  transition: none;
}
.hover-pulldown[data-mode="touch"] .hover-pulldown-menu {
  margin-top: 24px;
}
.hover-pulldown[data-mode="hover"]:hover:not(.nohover):after,
.hover-pulldown[data-state="active"]:after,
.hover-pulldown[data-mode="hover"]:hover:not(.nohover) .hover-pulldown-menu,
.hover-pulldown[data-state="active"] .hover-pulldown-menu {
  opacity: 1;
  -ms-filter: none;
  filter: none;
  visibility: visible;
}
.hover-pulldown[data-state="static"]:after,
.hover-pulldown[data-state="static"] .hover-pulldown-static {
  opacity: 1;
  -ms-filter: none;
  filter: none;
  visibility: visible;
}
.hover-pulldown[data-state="static"][data-mode="hover"] .hover-pulldown-menu {
  -webkit-transition-delay: 0.25s;
  -moz-transition-delay: 0.25s;
  -o-transition-delay: 0.25s;
  -ms-transition-delay: 0.25s;
  transition-delay: 0.25s;
}
.hover-pulldown[data-anchor="right"] .hover-pulldown-menu,
.hover-pulldown[data-anchor="right"] .hover-pulldown-static {
  left: inherit;
  right: 0px;
}
.mlh-pulldown-top-link {
  display: none;
}
.mlh-pulldown-top-link-persistent {
  display: block;
}
@media (max-width: 900px) {
  .mlh-top-nav-link.magazine {
    display: none;
  }
  .mlh-pulldown-top-link.magazine {
    display: block;
  }
}
@media (max-width: 1200px) {
  .mlh-top-nav-link.galleries {
    display: none;
  }
  .mlh-pulldown-top-link.galleries {
    display: block;
  }
}
@media (max-width: 1425px) {
  .mlh-top-nav-link.fairs {
    display: none;
  }
  .mlh-pulldown-top-link.fairs {
    display: block;
  }
}
.hover-pulldown-menu > * {
  overflow-x: hidden;
}
.hover-pulldown-menu > *::-webkit-scrollbar {
  background-color: #000;
  width: 8px;
}
.hover-pulldown-menu > *::-webkit-scrollbar-corner {
  display: none;
}
.hover-pulldown-menu > *::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #333;
}
.hover-pulldown-menu,
.hover-pulldown-static {
  visibility: hidden;
  position: absolute;
  z-index: 800;
  width: 250px;
  left: 50%;
  top: 100%;
  margin-top: 25px;
  margin-left: -125px;
  padding: 25px 0 30px 0;
  text-align: left;
  background-color: #000;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
}
.hover-pulldown-menu .hpm-header,
.hover-pulldown-static .hpm-header {
  display: block;
  padding: 14.5px 30px;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11px;
  line-height: 1;
  color: #fff;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
}
.hover-pulldown-menu a,
.hover-pulldown-static a,
.hover-pulldown-static > span {
  padding: 11px 30px;
  line-height: 1;
  text-transform: none;
  letter-spacing: 0;
  color: #fff;
  text-decoration: none;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 18px;
}
.hover-pulldown-menu a:not(.mlh-pulldown-top-link),
.hover-pulldown-static a:not(.mlh-pulldown-top-link),
.hover-pulldown-static > span:not(.mlh-pulldown-top-link) {
  display: block;
}
.hover-pulldown-menu a:hover,
.hover-pulldown-static a:hover,
.hover-pulldown-static > span:hover {
  background-color: #333;
}
.hover-pulldown-menu .mlh-pulldown-top-link,
.hover-pulldown-static .mlh-pulldown-top-link,
.hover-pulldown-menu .mlh-pulldown-top-link-persistent,
.hover-pulldown-static .mlh-pulldown-top-link-persistent {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
}
.hover-pulldown-menu > hr,
.hover-pulldown-static > hr {
  height: 2px;
  margin: 19px 30px;
  background-color: #333;
}
.hover-pulldown-menu:before,
.hover-pulldown-static:before {
  display: block;
  position: absolute;
  content: "";
  height: 30px;
  right: 0;
  bottom: 100%;
  left: 0;
}
.hover-pulldown-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 790;
  height: 100vh;
}
@media (min-width: 550px) {
  .body-transparent-header-white .hover-pulldown {
    color: #fff;
  }
  .body-transparent-header-white .hover-pulldown svg {
    fill: #fff;
  }
  .body-transparent-header-white
    .hover-pulldown:not(.mlh-hamburger):not(.mlh-notification):not(.mlh-user-name):before {
    border-top-color: #fff;
  }
}
.hover-pulldown-static {
  padding: 25px 0;
}
.hover-pulldown-static > span {
  white-space: normal;
  line-height: 1.2;
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
}
.hover-pulldown-static > span:hover {
  background-color: transparent;
}
.hover-pulldown-static.is-fade-out > span {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
#hpm-bundles {
  overflow-y: scroll;
  max-height: 280px;
}
#hpm-bundles > a {
  padding: 0 0 0 30px;
}
.bundle-item {
  padding: 11px 0;
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 18px;
  line-height: 1;
  text-transform: none;
  letter-spacing: 0;
  color: #fff;
  text-decoration: none;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.bundle-item:hover {
  background-color: #333;
}
.bundle-image {
  width: 40px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;
}
.bundle-text {
  width: 170px;
  padding-left: 10px;
  display: inline-block;
  vertical-align: middle;
}
.bundle-information {
  display: inline-block;
  vertical-align: middle;
  height: 31px;
}
.bundle-message,
.bundle-date {
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #999;
}
.bundle-actors {
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #f8f8f8;
  max-width: 160px;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.bundle-read-status {
  border-radius: 50%;
  background-color: #6e1fff;
  width: 10px;
  height: 10px;
  float: right;
  margin-top: 10px;
}
.notice-message {
  position: relative;
  height: 59px;
  text-align: center;
  background-color: #fdefd1;
  border-bottom: 1px solid #fbe0a5;
}
.notice-message > span {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 17px;
  line-height: 1.5;
}
.notice-message-close {
  position: absolute;
  top: 50%;
  right: 0;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  padding: 20px;
  font-size: 25px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.25);
}
#main-layout-footer {
  padding: 20px 0;
  background-color: #fff;
  zoom: 1;
}
#main-layout-footer:before,
#main-layout-footer:after {
  content: "";
  display: table;
}
#main-layout-footer:after {
  clear: both;
}
.mlf .mlf-upper {
  margin-bottom: 10px;
}
.mlf .mlf-upper,
.mlf .mlf-lower {
  zoom: 1;
  padding: 20px 0;
  border-top: 1px solid #e5e5e5;
}
.mlf .mlf-upper:before,
.mlf .mlf-lower:before,
.mlf .mlf-upper:after,
.mlf .mlf-lower:after {
  content: "";
  display: table;
}
.mlf .mlf-upper:after,
.mlf .mlf-lower:after {
  clear: both;
}
.mlf .mlf-lower {
  position: relative;
}
.mlf .mlf-lower .main-layout-container {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
}
.mlf .mlf-upper-column,
.mlf .mlf-upper-column-aside {
  float: left;
  padding-right: 20px;
}
.mlf .mlf-upper-column h4,
.mlf .mlf-upper-column-aside h4 {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: bold;
  margin-bottom: 10px;
}
@media (min-width: 768px) {
  .mlf .mlf-upper-column h4,
  .mlf .mlf-upper-column-aside h4 {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
  }
}
.mlf .mlf-upper-column a,
.mlf .mlf-upper-column-aside a {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: normal;
  padding: 10px 0;
  display: block;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-decoration: none;
}
@media (min-width: 768px) {
  .mlf .mlf-upper-column a,
  .mlf .mlf-upper-column-aside a {
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
  }
}
.mlf .mlf-upper-column-aside {
  width: 28%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: end;
  -moz-box-pack: end;
  -o-box-pack: end;
  -ms-flex-pack: end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
  padding-right: 10px;
}
.mlf .mlf-upper-column {
  width: 18%;
}
@media screen and (max-width: 1024px) {
  .mlf .mlf-upper-column-aside {
    width: 25%;
  }
  .mlf .mlf-upper-column {
    width: 18%;
  }
}
.mlf #main-layout-footer-internal {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  font-weight: normal;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
@media (min-width: 768px) {
  .mlf #main-layout-footer-internal {
    font-size: 12px;
    line-height: 1.5;
    font-weight: normal;
  }
}
.mlf #main-layout-footer-internal,
.mlf #main-layout-footer-internal a {
  color: #666;
  text-decoration: none;
}
.mlf #main-layout-footer-internal a,
.mlf #main-layout-footer-internal span {
  display: -webkit-inline-box;
  display: -moz-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-box;
  display: inline-flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  text-decoration: none;
  margin-right: 10px;
}
.mlf #main-layout-footer-internal a:last-child,
.mlf #main-layout-footer-internal span:last-child {
  margin-right: 0;
}
.mlf #main-layout-footer-logo {
  display: inline-block;
  font-size: 30px;
  margin-right: 20px;
}
.mlf #main-layout-footer-external {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  position: relative;
  margin-left: auto;
}
.mlf .mlf-links {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.mlf .mlf-links > *:first-child {
  margin-left: 10px;
}
.mlf .mlf-social {
  display: block;
}
.mlf .mlf-icon-instagram,
.mlf .mlf-icon-wechat {
  width: 20px;
  margin: 7px 5px 0 5px;
  height: 20px;
}
.mlf .mlf-wechat-qr-code-container {
  display: none;
}
.mlf .mlf-icon-wechat:hover .mlf-wechat-qr-code-container {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  -webkit-box-shadow: 0px 10px 20px #ccc;
  box-shadow: 0px 10px 20px #ccc;
  width: 150px;
  height: 150px;
  position: absolute;
  left: -66px;
  bottom: 75px;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.mlf .mlf-icon-wechat:hover .mlf-wechat-qr-code-container .mlf-wechat-qr-code {
  display: block;
  background-image: url("http://files.artsy.net/images/wechat_qr_logo.png");
  width: 125px;
  height: 125px;
}
.mlf
  .mlf-icon-wechat:hover
  .mlf-wechat-qr-code-container
  .mlf-wechat-qr-code-triangle-down {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid #fff;
  position: absolute;
  right: 65px;
  bottom: -9px;
}
.mlf__mobile {
  background-color: #000;
  width: 100vw;
  color: #fff;
  display: none;
}
.mlf__mobile a {
  color: #fff;
  text-decoration: none;
}
.mlf__mobile h4 {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: bold;
  margin-bottom: 10px;
}
@media (min-width: 768px) {
  .mlf__mobile h4 {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
  }
}
.mlf__mobile .mlf-upper-column,
.mlf__mobile .mlf-user-column {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: normal;
  padding: 20px;
  width: 100vw;
  float: none;
}
@media (min-width: 768px) {
  .mlf__mobile .mlf-upper-column,
  .mlf__mobile .mlf-user-column {
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
  }
}
.mlf__mobile .mlf-upper-column a,
.mlf__mobile .mlf-user-column a {
  width: 50%;
  display: inline-block;
}
.mlf__mobile .mlf-upper-column a:nth-child(even),
.mlf__mobile .mlf-user-column a:nth-child(odd) {
  margin-left: 15px;
  width: -webkit-calc(50% - 15px);
  width: -moz-calc(50% - 15px);
  width: -ms-calc(50% - 15px);
  width: -o-calc(50% - 15px);
  width: calc(50% - 15px);
}
.mlf__mobile .mlf-user-column {
  border-top: 1px solid #333;
}
.mlf__mobile .mlf-login-signup {
  width: 100vw;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.mlf__mobile .mlf-login-signup a {
  text-align: center;
  width: -webkit-calc(50% - 15px);
  width: -moz-calc(50% - 15px);
  width: -ms-calc(50% - 15px);
  width: -o-calc(50% - 15px);
  width: calc(50% - 15px);
}
.mlf__mobile .mlf-login-signup a:first-child {
  margin-left: 10px;
}
.mlf__mobile .mlf-login-signup a:last-child {
  margin-right: 10px;
}
.mlf__mobile .mlf-lower {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  font-weight: normal;
  border: none;
  padding: 30px 20px;
}
@media (min-width: 768px) {
  .mlf__mobile .mlf-lower {
    font-size: 12px;
    line-height: 1.5;
    font-weight: normal;
  }
}
@media (max-width: 600px) {
  #main-layout-footer {
    padding: 0;
    max-width: 100%;
    overflow: hidden;
  }
  .mlf.mlf__fullwidth {
    display: none;
  }
  .mlf.mlf__mobile {
    display: block;
  }
}
#main-layout-minimal-header {
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  width: 100%;
  max-width: 1192px;
  margin: auto;
  padding: 35px 40px 0px 40px;
}
@media screen and (max-width: 768px) {
  #main-layout-minimal-header {
    padding: 35px 20px 0 20px;
  }
}
#main-layout-minimal-header .logo {
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  display: inline-block;
  height: 30px;
  width: minmal-header-logo-width;
}
#main-layout-minimal-header .logo > svg {
  height: 30px;
  width: 88px;
}
.garamond-alert,
.garamond-alert-info {
  text-align: center;
  padding: 20px 10px;
  border: 1px solid;
}
.garamond-alert-info {
  background-color: #fdefd1;
  border: none;
}
.fullscreen-flash-message {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1080;
  -webkit-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  -ms-transition: opacity 0.5s;
  transition: opacity 0.5s;
  text-align: center;
  cursor: pointer;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  font-size: 30px;
  line-height: 1.25;
}
.fullscreen-flash-message,
.fullscreen-flash-message a {
  color: #fff;
  text-decoration: none;
}
.fullscreen-flash-message > span {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.fullscreen-flash-message[data-state="closed"] {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.fullscreen-flash-message[data-state="open"] {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.fullscreen-flash-message.is-sans-backdrop {
  background-color: transparent;
}
html.is-inverted {
  filter: invert(100%) hue-rotate(180deg);
  -webkit-filter: invert(100%) hue-rotate(180deg);
}
html.is-inverted img,
html.is-inverted canvas,
html.is-inverted [style*="background-image"] {
  filter: invert(100%) hue-rotate(180deg);
  -webkit-filter: invert(100%) hue-rotate(180deg);
}
.screensaver-container {
  background-color: #000;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}
.screensaver-image {
  position: absolute;
  z-index: 1001;
}
.screen-reader-text {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  overflow: hidden;
}
.body-header-fixed #main-layout-container,
.body-header-fixed-no-margin #main-layout-container {
  margin-top: 59px;
}
.body-header-fixed #main-layout-header,
.body-header-fixed-no-margin #main-layout-header {
  position: fixed;
  z-index: 970;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.body-header-fixed #main-layout-header.force-position-absolute,
.body-header-fixed-no-margin #main-layout-header.force-position-absolute {
  position: absolute;
}
.body-header-fixed.force-staging #main-layout-container {
  margin-top: 95px;
}
.body-header-fixed-no-margin #main-layout-container {
  margin-top: 59px !important;
}
html[data-useragent*="iPad"] .body-header-fixed #main-layout-header {
  position: absolute;
}
#main-layout-search-bar-container {
  border-color: #ccc;
  background-color: #f8f8f8;
}
#main-layout-search-bar-container:hover {
  border: 1px solid #666;
}
#main-layout-header #main-layout-search-bar-container.focused:hover {
  border-color: #6e1fff !important;
}
#main-layout-header #main-layout-search-bar-container.focused {
  border-color: #6e1fff !important;
}
#main-layout-header #main-layout-search-bar-input::placeholder {
  color: #666;
}
#main-layout-search-bar-icon {
  color: #666;
}
.minimal-header #main-layout-header {
  position: relative !important;
}
.minimal-header #main-layout-header-left #main-layout-header-minimal-title {
  display: block;
}
.minimal-header #main-layout-search-bar-container,
.minimal-header #main-layout-header-center,
.minimal-header .main-layout-header-user {
  display: none;
}
.minimal-header #main-layout-header-home-logo {
  border-right: 1px solid #e5e5e5;
}
.minimal-header #main-layout-container {
  margin-top: 42px !important;
}
.body-no-header #main-layout-header {
  display: none;
}
.body-no-header #main-layout-minimal-header {
  display: none;
}
.body-no-header #main-layout-container {
  margin-top: 0 !important;
}
@media (min-width: 768px) {
  .body-transparent-header-white #main-layout-header,
  .body-transparent-header #main-layout-header {
    background: #fff;
  }
}
.body-hide-header #main-layout-header {
  display: none;
}
@media (min-width: 768px) {
  .body-transparent-header-white #main-layout-header-center a,
  .body-transparent-header-white .main-layout-header-user a:not(.mlh-signup),
  .body-transparent-header-white .mlh-user-name,
  .body-transparent-header-white #main-layout-header-home-logo,
  .body-transparent-header-white #main-layout-search-bar-icon,
  .body-transparent-header-white #main-layout-search-bar-input,
  .body-transparent-header-white span.mlh-top-nav-link,
  .body-transparent-header-white span.mlh-top-nav-link:before {
    color: #000;
  }
  .body-transparent-header-white #main-layout-header-center a:hover,
  .body-transparent-header-white
    .main-layout-header-user
    a:not(.mlh-signup):hover,
  .body-transparent-header-white .mlh-user-name:hover,
  .body-transparent-header-white span.mlh-top-nav-link:hover {
    color: #6e1fff;
  }
  .body-transparent-header-white .hover-pulldown-menu a {
    color: #fff !important;
  }
  .body-transparent-header-white
    .hover-pulldown:not(.mlh-hamburger):not(.mlh-notification):not(.artist-page-cta-overlay__feed__pulldown):before {
    border-top-color: #000;
  }
  .body-transparent-header-white .mlh-notification svg,
  .body-transparent-header-white .mlh-user-name svg {
    fill: #000;
  }
  .body-transparent-header-white #main-layout-search-bar-icon {
    color: #666;
  }
  .body-transparent-header-white #main-layout-search-bar-input {
    color: #000;
  }
  .body-transparent-header-white #main-layout-search-bar-input::placeholder {
    color: #666;
  }
  .body-transparent-header-white
    #main-layout-header
    #main-layout-search-bar-container {
    background-color: #f8f8f8;
    border-color: #ccc;
  }
  .body-transparent-header-white
    #main-layout-header
    #main-layout-search-bar-container:hover {
    border-color: #666 !important;
  }
  .body-transparent-header-white
    #main-layout-header
    #main-layout-search-bar-container.focused:hover {
    border-color: #6e1fff !important;
  }
  .body-transparent-header-white
    #main-layout-header
    #main-layout-search-bar-container.focused {
    border-color: #6e1fff !important;
  }
  .body-transparent-header-white
    #main-layout-search-bar-container.is-loading
    .loading-spinner-small {
    background: #000;
  }
  .body-transparent-header-white #main-layout-header-home-logo::after {
    border-color: #666;
  }
}
.body-infinite-scroll #main-layout-footer {
  display: none;
}
.body-eigen #main-layout-footer,
.body-eigen #main-layout-header {
  display: none !important;
}
.body-eigen #main-layout-container {
  margin-top: 0 !important;
  padding: 0;
}
@media (min-device-width: 768px) {
  .body-eigen #main-layout-container {
    padding: 0 55px;
  }
}
.body-responsive {
  min-width: inherit;
}
.body-responsive #main-layout-container {
  margin: 30px 20px;
}
.body-no-margins #main-layout-container {
  margin-top: 144px;
  margin-left: 0;
  margin-right: 0;
}
.body-no-margins.body-header-fixed #main-layout-container {
  margin-top: 59px;
}
.body-no-margins.body-fullscreen-article {
  min-width: unset;
}
.body-no-margins.body-fullscreen-article #main-layout-container {
  margin-top: 0px;
}
.body-no-padding #main-layout-container {
  padding: 0;
}
#react-root .reactionPageLoader {
  width: 100%;
  position: fixed;
  left: 0;
  top: -5px !important;
  z-index: 991;
}
.artist-suggestion-popover {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #ddd;
  z-index: 969;
  position: absolute;
  width: 290px;
  height: 192px;
}
.popover.show {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.popover-bottom {
  margin-top: 5px;
}
.popover-top {
  margin-top: -5px;
}
.popover-content {
  padding: 15px;
}
.popover-close {
  color: #999;
  float: right;
  font-size: 22px;
  cursor: pointer;
}
.popover-left-side {
  color: #999;
}
.popover-artists li {
  padding: 10px 0px 10px 0px;
  border-bottom: 1px solid #e5e5e5;
  zoom: 1;
}
.popover-artists li:before,
.popover-artists li:after {
  content: "";
  display: table;
}
.popover-artists li:after {
  clear: both;
}
.popover-artists img {
  margin-right: 10px;
  float: left;
}
.popover-artists .artist-suggestion-name {
  font-size: 17px;
  line-height: 1.5;
  margin-top: 2px;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  float: left;
  max-width: 128px;
  display: block;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.popover-artists .artist-suggestion-name:hover {
  border-bottom-color: #000;
}
.popover-artists .follow-button {
  margin-top: 5px;
  float: right;
}
.popover-artists .follow-button[data-state="following"] {
  color: #6e1fff;
  border-bottom-color: #6e1fff;
}
.popover-arrow,
.popover-arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.popover-arrow {
  border-width: 14px;
}
.popover-bottom > .popover-arrow {
  left: 50%;
  margin-left: -14px;
  border-top-width: 0;
  border-bottom-color: #ddd;
  top: -14px;
}
.popover-top > .popover-arrow {
  left: 50%;
  margin-left: -14px;
  border-bottom-width: 0;
  border-top-color: #ddd;
  bottom: -14px;
}
.popover-arrow:after {
  border-width: 14px;
  content: "";
}
.popover-bottom > .popover-arrow:after {
  content: " ";
  top: 1px;
  margin-left: -14px;
  border-top-width: 0;
  border-bottom-color: #fff;
}
.popover-top > .popover-arrow:after {
  content: " ";
  bottom: 1px;
  margin-left: -14px;
  border-bottom-width: 0;
  border-top-color: #fff;
}
.follow-button:before {
  content: "Follow";
}
.follow-button[data-state="following"],
.follow-button.is-following {
  color: #ccc;
}
.follow-button[data-state="following"]:before,
.follow-button.is-following:before {
  content: "Following";
}
.follow-button.no-touch[data-state="following"]:hover,
.follow-button.no-touch.is-following:hover {
  color: #6e1eff;
}
.follow-button.no-touch[data-state="following"]:hover:before,
.follow-button.no-touch.is-following:hover:before {
  content: "Unfollow";
}
.follow-button.no-touch[data-state="following"]:hover.is-clicked:before,
.follow-button.no-touch.is-following:hover.is-clicked:before {
  content: "Following";
}
.plus-follow-button {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: normal;
  cursor: pointer;
  display: inline-block;
  min-width: 86px;
}
@media (min-width: 768px) {
  .plus-follow-button {
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
  }
}
.plus-follow-button.is-following,
.plus-follow-button:hover,
.plus-follow-button[data-state="following"] {
  color: #6e1eff;
}
.plus-follow-button .icon-follow-circle,
.plus-follow-button .follow-button-text {
  display: inline;
}
.plus-follow-button .icon-follow-circle {
  font-size: 32px;
  margin-right: 0;
  vertical-align: bottom;
  display: inline-block;
  line-height: 20px;
  height: 22px;
  margin-left: -9px;
  margin-right: -1px;
}
.plus-follow-button .follow-button-text:before {
  content: "Follow";
}
.plus-follow-button[data-state="following"] .follow-button-text:before,
.plus-follow-button.is-following .follow-button-text:before {
  content: "Following";
}
.plus-follow-button.no-touch[data-state="following"]:hover,
.plus-follow-button.no-touch.is-following:hover {
  color: #f7625a;
}
.plus-follow-button.no-touch[data-state="following"]:hover
  .follow-button-text:before,
.plus-follow-button.no-touch.is-following:hover .follow-button-text:before {
  content: "Unfollow";
}
.plus-follow-button.no-touch[data-state="following"]:hover
  .follow-button-text.is-clicked:before,
.plus-follow-button.no-touch.is-following:hover
  .follow-button-text.is-clicked:before {
  content: "Following";
}
.circle-button {
  display: inline-block;
  position: relative;
  width: 58px;
  margin: 0 10px;
  height: 58px;
  cursor: pointer;
  color: #000;
  background-color: transparent;
  text-align: center;
  vertical-align: middle;
  border: 2px solid #e5e5e5;
  border-radius: 29px;
  opacity: 1;
  -ms-filter: none;
  filter: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: 58px !important;
  -webkit-transition: all 0.125s;
  -moz-transition: all 0.125s;
  -o-transition: all 0.125s;
  -ms-transition: all 0.125s;
  transition: all 0.125s;
}
.circle-button:hover {
  background-color: #666;
  border-color: #666;
  color: #fff;
}
.circle-button.is-active,
.circle-button[data-state="active"] {
  background-color: #6e1eff;
  border-color: #6e1eff;
  color: #fff;
}
.circle-button-with-label {
  display: inline-block;
  text-align: center;
}
.circle-button-label {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  font-weight: normal;
  color: #000;
  margin-top: 5px;
}
@media (min-width: 768px) {
  .circle-button-label {
    font-size: 12px;
    line-height: 1.5;
    font-weight: normal;
  }
}
.highlight-link {
  line-height: 1.1;
  text-decoration: none;
  -webkit-transition: color 0.25s;
  -moz-transition: color 0.25s;
  -o-transition: color 0.25s;
  -ms-transition: color 0.25s;
  transition: color 0.25s;
}
.highlight-link:hover {
  color: #6e1eff;
}
.play-button {
  position: absolute;
  background-color: #000;
  cursor: pointer;
  height: 55px;
  width: 75px;
  top: 50%;
  left: 50%;
  margin-top: -27.5px;
  margin-left: -37.5px;
  padding: 25px;
  -webkit-transition: background-color 0.25s;
  -moz-transition: background-color 0.25s;
  -o-transition: background-color 0.25s;
  -ms-transition: background-color 0.25s;
  transition: background-color 0.25s;
}
.play-button:hover {
  background-color: #6e1eff;
}
.play-button:after {
  display: block;
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 20px solid #fff;
  margin-top: -10px;
  margin-left: -10px;
}
.button-separator {
  display: inline-block;
  width: 0;
  margin: 0 5px;
}
.avant-garde-button,
.avant-garde-button-black,
.avant-garde-follow-button-black,
.avant-garde-button-dark,
.avant-garde-button-white,
.avant-garde-button-text,
.avant-garde-button-underlined {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: bold;
  display: inline-block;
  position: relative;
  padding: 15px 30px;
  line-height: 1 !important;
  cursor: pointer;
  border: none;
  background-color: #f8f8f8;
  -webkit-transition: background-color 0.25s, color 0.25s;
  -moz-transition: background-color 0.25s, color 0.25s;
  -o-transition: background-color 0.25s, color 0.25s;
  -ms-transition: background-color 0.25s, color 0.25s;
  transition: background-color 0.25s, color 0.25s;
  border: 1px solid transparent;
  text-decoration: none;
}
@media (min-width: 768px) {
  .avant-garde-button,
  .avant-garde-button-black,
  .avant-garde-follow-button-black,
  .avant-garde-button-dark,
  .avant-garde-button-white,
  .avant-garde-button-text,
  .avant-garde-button-underlined {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
  }
}
.avant-garde-button:focus,
.avant-garde-button-black:focus,
.avant-garde-follow-button-black:focus,
.avant-garde-button-dark:focus,
.avant-garde-button-white:focus,
.avant-garde-button-text:focus,
.avant-garde-button-underlined:focus,
.avant-garde-button:hover,
.avant-garde-button-black:hover,
.avant-garde-follow-button-black:hover,
.avant-garde-button-dark:hover,
.avant-garde-button-white:hover,
.avant-garde-button-text:hover,
.avant-garde-button-underlined:hover {
  outline: none;
  background-color: #e5e5e5;
}
.avant-garde-button[data-state="success"],
.avant-garde-button-black[data-state="success"],
.avant-garde-follow-button-black[data-state="success"],
.avant-garde-button-dark[data-state="success"],
.avant-garde-button-white[data-state="success"],
.avant-garde-button-text[data-state="success"],
.avant-garde-button-underlined[data-state="success"],
.avant-garde-button.is-success,
.avant-garde-button-black.is-success,
.avant-garde-follow-button-black.is-success,
.avant-garde-button-dark.is-success,
.avant-garde-button-white.is-success,
.avant-garde-button-text.is-success,
.avant-garde-button-underlined.is-success {
  background-color: #217c44;
  color: #fff;
}
.avant-garde-button[data-state="success"]:hover,
.avant-garde-button-black[data-state="success"]:hover,
.avant-garde-follow-button-black[data-state="success"]:hover,
.avant-garde-button-dark[data-state="success"]:hover,
.avant-garde-button-white[data-state="success"]:hover,
.avant-garde-button-text[data-state="success"]:hover,
.avant-garde-button-underlined[data-state="success"]:hover,
.avant-garde-button.is-success:hover,
.avant-garde-button-black.is-success:hover,
.avant-garde-follow-button-black.is-success:hover,
.avant-garde-button-dark.is-success:hover,
.avant-garde-button-white.is-success:hover,
.avant-garde-button-text.is-success:hover,
.avant-garde-button-underlined.is-success:hover {
  background-color: #195d33;
}
.avant-garde-button[data-state="error"],
.avant-garde-button-black[data-state="error"],
.avant-garde-follow-button-black[data-state="error"],
.avant-garde-button-dark[data-state="error"],
.avant-garde-button-white[data-state="error"],
.avant-garde-button-text[data-state="error"],
.avant-garde-button-underlined[data-state="error"],
.avant-garde-button.is-error,
.avant-garde-button-black.is-error,
.avant-garde-follow-button-black.is-error,
.avant-garde-button-dark.is-error,
.avant-garde-button-white.is-error,
.avant-garde-button-text.is-error,
.avant-garde-button-underlined.is-error,
.avant-garde-button[data-state="error"]:focus,
.avant-garde-button-black[data-state="error"]:focus,
.avant-garde-follow-button-black[data-state="error"]:focus,
.avant-garde-button-dark[data-state="error"]:focus,
.avant-garde-button-white[data-state="error"]:focus,
.avant-garde-button-text[data-state="error"]:focus,
.avant-garde-button-underlined[data-state="error"]:focus,
.avant-garde-button.is-error:focus,
.avant-garde-button-black.is-error:focus,
.avant-garde-follow-button-black.is-error:focus,
.avant-garde-button-dark.is-error:focus,
.avant-garde-button-white.is-error:focus,
.avant-garde-button-text.is-error:focus,
.avant-garde-button-underlined.is-error:focus {
  background-color: #e82f1d;
  color: #fff;
}
.avant-garde-button[data-state="error"]:hover,
.avant-garde-button-black[data-state="error"]:hover,
.avant-garde-follow-button-black[data-state="error"]:hover,
.avant-garde-button-dark[data-state="error"]:hover,
.avant-garde-button-white[data-state="error"]:hover,
.avant-garde-button-text[data-state="error"]:hover,
.avant-garde-button-underlined[data-state="error"]:hover,
.avant-garde-button.is-error:hover,
.avant-garde-button-black.is-error:hover,
.avant-garde-follow-button-black.is-error:hover,
.avant-garde-button-dark.is-error:hover,
.avant-garde-button-white.is-error:hover,
.avant-garde-button-text.is-error:hover,
.avant-garde-button-underlined.is-error:hover,
.avant-garde-button[data-state="error"]:focus:hover,
.avant-garde-button-black[data-state="error"]:focus:hover,
.avant-garde-follow-button-black[data-state="error"]:focus:hover,
.avant-garde-button-dark[data-state="error"]:focus:hover,
.avant-garde-button-white[data-state="error"]:focus:hover,
.avant-garde-button-text[data-state="error"]:focus:hover,
.avant-garde-button-underlined[data-state="error"]:focus:hover,
.avant-garde-button.is-error:focus:hover,
.avant-garde-button-black.is-error:focus:hover,
.avant-garde-follow-button-black.is-error:focus:hover,
.avant-garde-button-dark.is-error:focus:hover,
.avant-garde-button-white.is-error:focus:hover,
.avant-garde-button-text.is-error:focus:hover,
.avant-garde-button-underlined.is-error:focus:hover {
  background-color: #b22012;
}
.avant-garde-button[data-state="loading"],
.avant-garde-button-black[data-state="loading"],
.avant-garde-follow-button-black[data-state="loading"],
.avant-garde-button-dark[data-state="loading"],
.avant-garde-button-white[data-state="loading"],
.avant-garde-button-text[data-state="loading"],
.avant-garde-button-underlined[data-state="loading"],
.avant-garde-button.is-loading,
.avant-garde-button-black.is-loading,
.avant-garde-follow-button-black.is-loading,
.avant-garde-button-dark.is-loading,
.avant-garde-button-white.is-loading,
.avant-garde-button-text.is-loading,
.avant-garde-button-underlined.is-loading,
.avant-garde-button[data-state="loading"][disabled],
.avant-garde-button-black[data-state="loading"][disabled],
.avant-garde-follow-button-black[data-state="loading"][disabled],
.avant-garde-button-dark[data-state="loading"][disabled],
.avant-garde-button-white[data-state="loading"][disabled],
.avant-garde-button-text[data-state="loading"][disabled],
.avant-garde-button-underlined[data-state="loading"][disabled],
.avant-garde-button.is-loading[disabled],
.avant-garde-button-black.is-loading[disabled],
.avant-garde-follow-button-black.is-loading[disabled],
.avant-garde-button-dark.is-loading[disabled],
.avant-garde-button-white.is-loading[disabled],
.avant-garde-button-text.is-loading[disabled],
.avant-garde-button-underlined.is-loading[disabled],
.avant-garde-button[data-state="loading"][disabled]:hover,
.avant-garde-button-black[data-state="loading"][disabled]:hover,
.avant-garde-follow-button-black[data-state="loading"][disabled]:hover,
.avant-garde-button-dark[data-state="loading"][disabled]:hover,
.avant-garde-button-white[data-state="loading"][disabled]:hover,
.avant-garde-button-text[data-state="loading"][disabled]:hover,
.avant-garde-button-underlined[data-state="loading"][disabled]:hover,
.avant-garde-button.is-loading[disabled]:hover,
.avant-garde-button-black.is-loading[disabled]:hover,
.avant-garde-follow-button-black.is-loading[disabled]:hover,
.avant-garde-button-dark.is-loading[disabled]:hover,
.avant-garde-button-white.is-loading[disabled]:hover,
.avant-garde-button-text.is-loading[disabled]:hover,
.avant-garde-button-underlined.is-loading[disabled]:hover {
  background-color: #6e1eff;
  color: transparent !important;
}
.avant-garde-button[data-state="loading"]::before,
.avant-garde-button-black[data-state="loading"]::before,
.avant-garde-follow-button-black[data-state="loading"]::before,
.avant-garde-button-dark[data-state="loading"]::before,
.avant-garde-button-white[data-state="loading"]::before,
.avant-garde-button-text[data-state="loading"]::before,
.avant-garde-button-underlined[data-state="loading"]::before,
.avant-garde-button.is-loading::before,
.avant-garde-button-black.is-loading::before,
.avant-garde-follow-button-black.is-loading::before,
.avant-garde-button-dark.is-loading::before,
.avant-garde-button-white.is-loading::before,
.avant-garde-button-text.is-loading::before,
.avant-garde-button-underlined.is-loading::before,
.avant-garde-button[data-state="loading"][disabled]::before,
.avant-garde-button-black[data-state="loading"][disabled]::before,
.avant-garde-follow-button-black[data-state="loading"][disabled]::before,
.avant-garde-button-dark[data-state="loading"][disabled]::before,
.avant-garde-button-white[data-state="loading"][disabled]::before,
.avant-garde-button-text[data-state="loading"][disabled]::before,
.avant-garde-button-underlined[data-state="loading"][disabled]::before,
.avant-garde-button.is-loading[disabled]::before,
.avant-garde-button-black.is-loading[disabled]::before,
.avant-garde-follow-button-black.is-loading[disabled]::before,
.avant-garde-button-dark.is-loading[disabled]::before,
.avant-garde-button-white.is-loading[disabled]::before,
.avant-garde-button-text.is-loading[disabled]::before,
.avant-garde-button-underlined.is-loading[disabled]::before,
.avant-garde-button[data-state="loading"][disabled]:hover::before,
.avant-garde-button-black[data-state="loading"][disabled]:hover::before,
.avant-garde-follow-button-black[data-state="loading"][disabled]:hover::before,
.avant-garde-button-dark[data-state="loading"][disabled]:hover::before,
.avant-garde-button-white[data-state="loading"][disabled]:hover::before,
.avant-garde-button-text[data-state="loading"][disabled]:hover::before,
.avant-garde-button-underlined[data-state="loading"][disabled]:hover::before,
.avant-garde-button.is-loading[disabled]:hover::before,
.avant-garde-button-black.is-loading[disabled]:hover::before,
.avant-garde-follow-button-black.is-loading[disabled]:hover::before,
.avant-garde-button-dark.is-loading[disabled]:hover::before,
.avant-garde-button-white.is-loading[disabled]:hover::before,
.avant-garde-button-text.is-loading[disabled]:hover::before,
.avant-garde-button-underlined.is-loading[disabled]:hover::before {
  display: block;
  content: "";
  background: #fff;
  width: 25px;
  height: 6px;
  position: absolute;
  top: calc(50% - 6px / 2);
  left: calc(50% - 25px / 2);
  -webkit-animation: spin 1s infinite linear;
  -moz-animation: spin 1s infinite linear;
  -o-animation: spin 1s infinite linear;
  -ms-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
.avant-garde-button > i,
.avant-garde-button-black > i,
.avant-garde-follow-button-black > i,
.avant-garde-button-dark > i,
.avant-garde-button-white > i,
.avant-garde-button-text > i,
.avant-garde-button-underlined > i {
  line-height: 0;
  vertical-align: -8px;
  margin: 0 10px 0 -15px;
}
.avant-garde-button[disabled],
.avant-garde-button-black[disabled],
.avant-garde-follow-button-black[disabled],
.avant-garde-button-dark[disabled],
.avant-garde-button-white[disabled],
.avant-garde-button-text[disabled],
.avant-garde-button-underlined[disabled],
.avant-garde-button.is-disabled,
.avant-garde-button-black.is-disabled,
.avant-garde-follow-button-black.is-disabled,
.avant-garde-button-dark.is-disabled,
.avant-garde-button-white.is-disabled,
.avant-garde-button-text.is-disabled,
.avant-garde-button-underlined.is-disabled,
.avant-garde-button[disabled]:hover,
.avant-garde-button-black[disabled]:hover,
.avant-garde-follow-button-black[disabled]:hover,
.avant-garde-button-dark[disabled]:hover,
.avant-garde-button-white[disabled]:hover,
.avant-garde-button-text[disabled]:hover,
.avant-garde-button-underlined[disabled]:hover,
.avant-garde-button.is-disabled:hover,
.avant-garde-button-black.is-disabled:hover,
.avant-garde-follow-button-black.is-disabled:hover,
.avant-garde-button-dark.is-disabled:hover,
.avant-garde-button-white.is-disabled:hover,
.avant-garde-button-text.is-disabled:hover,
.avant-garde-button-underlined.is-disabled:hover {
  background-color: #f8f8f8;
  cursor: default;
  color: rgba(0, 0, 0, 0.5);
}
.avant-garde-button[disabled][data-state="success"],
.avant-garde-button-black[disabled][data-state="success"],
.avant-garde-follow-button-black[disabled][data-state="success"],
.avant-garde-button-dark[disabled][data-state="success"],
.avant-garde-button-white[disabled][data-state="success"],
.avant-garde-button-text[disabled][data-state="success"],
.avant-garde-button-underlined[disabled][data-state="success"],
.avant-garde-button.is-disabled[data-state="success"],
.avant-garde-button-black.is-disabled[data-state="success"],
.avant-garde-follow-button-black.is-disabled[data-state="success"],
.avant-garde-button-dark.is-disabled[data-state="success"],
.avant-garde-button-white.is-disabled[data-state="success"],
.avant-garde-button-text.is-disabled[data-state="success"],
.avant-garde-button-underlined.is-disabled[data-state="success"],
.avant-garde-button[disabled]:hover[data-state="success"],
.avant-garde-button-black[disabled]:hover[data-state="success"],
.avant-garde-follow-button-black[disabled]:hover[data-state="success"],
.avant-garde-button-dark[disabled]:hover[data-state="success"],
.avant-garde-button-white[disabled]:hover[data-state="success"],
.avant-garde-button-text[disabled]:hover[data-state="success"],
.avant-garde-button-underlined[disabled]:hover[data-state="success"],
.avant-garde-button.is-disabled:hover[data-state="success"],
.avant-garde-button-black.is-disabled:hover[data-state="success"],
.avant-garde-follow-button-black.is-disabled:hover[data-state="success"],
.avant-garde-button-dark.is-disabled:hover[data-state="success"],
.avant-garde-button-white.is-disabled:hover[data-state="success"],
.avant-garde-button-text.is-disabled:hover[data-state="success"],
.avant-garde-button-underlined.is-disabled:hover[data-state="success"],
.avant-garde-button[disabled].is-success,
.avant-garde-button-black[disabled].is-success,
.avant-garde-follow-button-black[disabled].is-success,
.avant-garde-button-dark[disabled].is-success,
.avant-garde-button-white[disabled].is-success,
.avant-garde-button-text[disabled].is-success,
.avant-garde-button-underlined[disabled].is-success,
.avant-garde-button.is-disabled.is-success,
.avant-garde-button-black.is-disabled.is-success,
.avant-garde-follow-button-black.is-disabled.is-success,
.avant-garde-button-dark.is-disabled.is-success,
.avant-garde-button-white.is-disabled.is-success,
.avant-garde-button-text.is-disabled.is-success,
.avant-garde-button-underlined.is-disabled.is-success,
.avant-garde-button[disabled]:hover.is-success,
.avant-garde-button-black[disabled]:hover.is-success,
.avant-garde-follow-button-black[disabled]:hover.is-success,
.avant-garde-button-dark[disabled]:hover.is-success,
.avant-garde-button-white[disabled]:hover.is-success,
.avant-garde-button-text[disabled]:hover.is-success,
.avant-garde-button-underlined[disabled]:hover.is-success,
.avant-garde-button.is-disabled:hover.is-success,
.avant-garde-button-black.is-disabled:hover.is-success,
.avant-garde-follow-button-black.is-disabled:hover.is-success,
.avant-garde-button-dark.is-disabled:hover.is-success,
.avant-garde-button-white.is-disabled:hover.is-success,
.avant-garde-button-text.is-disabled:hover.is-success,
.avant-garde-button-underlined.is-disabled:hover.is-success {
  background-color: #217c44;
}
.avant-garde-button[disabled][data-state="error"],
.avant-garde-button-black[disabled][data-state="error"],
.avant-garde-follow-button-black[disabled][data-state="error"],
.avant-garde-button-dark[disabled][data-state="error"],
.avant-garde-button-white[disabled][data-state="error"],
.avant-garde-button-text[disabled][data-state="error"],
.avant-garde-button-underlined[disabled][data-state="error"],
.avant-garde-button.is-disabled[data-state="error"],
.avant-garde-button-black.is-disabled[data-state="error"],
.avant-garde-follow-button-black.is-disabled[data-state="error"],
.avant-garde-button-dark.is-disabled[data-state="error"],
.avant-garde-button-white.is-disabled[data-state="error"],
.avant-garde-button-text.is-disabled[data-state="error"],
.avant-garde-button-underlined.is-disabled[data-state="error"],
.avant-garde-button[disabled]:hover[data-state="error"],
.avant-garde-button-black[disabled]:hover[data-state="error"],
.avant-garde-follow-button-black[disabled]:hover[data-state="error"],
.avant-garde-button-dark[disabled]:hover[data-state="error"],
.avant-garde-button-white[disabled]:hover[data-state="error"],
.avant-garde-button-text[disabled]:hover[data-state="error"],
.avant-garde-button-underlined[disabled]:hover[data-state="error"],
.avant-garde-button.is-disabled:hover[data-state="error"],
.avant-garde-button-black.is-disabled:hover[data-state="error"],
.avant-garde-follow-button-black.is-disabled:hover[data-state="error"],
.avant-garde-button-dark.is-disabled:hover[data-state="error"],
.avant-garde-button-white.is-disabled:hover[data-state="error"],
.avant-garde-button-text.is-disabled:hover[data-state="error"],
.avant-garde-button-underlined.is-disabled:hover[data-state="error"],
.avant-garde-button[disabled].is-error,
.avant-garde-button-black[disabled].is-error,
.avant-garde-follow-button-black[disabled].is-error,
.avant-garde-button-dark[disabled].is-error,
.avant-garde-button-white[disabled].is-error,
.avant-garde-button-text[disabled].is-error,
.avant-garde-button-underlined[disabled].is-error,
.avant-garde-button.is-disabled.is-error,
.avant-garde-button-black.is-disabled.is-error,
.avant-garde-follow-button-black.is-disabled.is-error,
.avant-garde-button-dark.is-disabled.is-error,
.avant-garde-button-white.is-disabled.is-error,
.avant-garde-button-text.is-disabled.is-error,
.avant-garde-button-underlined.is-disabled.is-error,
.avant-garde-button[disabled]:hover.is-error,
.avant-garde-button-black[disabled]:hover.is-error,
.avant-garde-follow-button-black[disabled]:hover.is-error,
.avant-garde-button-dark[disabled]:hover.is-error,
.avant-garde-button-white[disabled]:hover.is-error,
.avant-garde-button-text[disabled]:hover.is-error,
.avant-garde-button-underlined[disabled]:hover.is-error,
.avant-garde-button.is-disabled:hover.is-error,
.avant-garde-button-black.is-disabled:hover.is-error,
.avant-garde-follow-button-black.is-disabled:hover.is-error,
.avant-garde-button-dark.is-disabled:hover.is-error,
.avant-garde-button-white.is-disabled:hover.is-error,
.avant-garde-button-text.is-disabled:hover.is-error,
.avant-garde-button-underlined.is-disabled:hover.is-error {
  background-color: #e82f1d;
}
.avant-garde-button.is-block,
.avant-garde-button-black.is-block,
.avant-garde-follow-button-black.is-block,
.avant-garde-button-dark.is-block,
.avant-garde-button-white.is-block,
.avant-garde-button-text.is-block,
.avant-garde-button-underlined.is-block {
  width: 100%;
  text-align: center;
}
.avant-garde-button.is-small,
.avant-garde-button-black.is-small,
.avant-garde-follow-button-black.is-small,
.avant-garde-button-dark.is-small,
.avant-garde-button-white.is-small,
.avant-garde-button-text.is-small,
.avant-garde-button-underlined.is-small {
  padding: 10px 20px;
}
.avant-garde-button.is-small[data-state="loading"]::before,
.avant-garde-button-black.is-small[data-state="loading"]::before,
.avant-garde-follow-button-black.is-small[data-state="loading"]::before,
.avant-garde-button-dark.is-small[data-state="loading"]::before,
.avant-garde-button-white.is-small[data-state="loading"]::before,
.avant-garde-button-text.is-small[data-state="loading"]::before,
.avant-garde-button-underlined.is-small[data-state="loading"]::before,
.avant-garde-button.is-small.is-loading::before,
.avant-garde-button-black.is-small.is-loading::before,
.avant-garde-follow-button-black.is-small.is-loading::before,
.avant-garde-button-dark.is-small.is-loading::before,
.avant-garde-button-white.is-small.is-loading::before,
.avant-garde-button-text.is-small.is-loading::before,
.avant-garde-button-underlined.is-small.is-loading::before {
  background: #fff;
  width: 16px;
  height: 4px;
  position: absolute;
  top: calc(50% - 4px / 2);
  left: calc(50% - 16px / 2);
  -webkit-animation: spin 1s infinite linear;
  -moz-animation: spin 1s infinite linear;
  -o-animation: spin 1s infinite linear;
  -ms-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
.avant-garde-button.is-tiny,
.avant-garde-button-black.is-tiny,
.avant-garde-follow-button-black.is-tiny,
.avant-garde-button-dark.is-tiny,
.avant-garde-button-white.is-tiny,
.avant-garde-button-text.is-tiny,
.avant-garde-button-underlined.is-tiny {
  font-size: 11px;
  padding: 6px 12px 5px;
}
.avant-garde-button.is-tiny[data-state="loading"]::before,
.avant-garde-button-black.is-tiny[data-state="loading"]::before,
.avant-garde-follow-button-black.is-tiny[data-state="loading"]::before,
.avant-garde-button-dark.is-tiny[data-state="loading"]::before,
.avant-garde-button-white.is-tiny[data-state="loading"]::before,
.avant-garde-button-text.is-tiny[data-state="loading"]::before,
.avant-garde-button-underlined.is-tiny[data-state="loading"]::before,
.avant-garde-button.is-tiny.is-loading::before,
.avant-garde-button-black.is-tiny.is-loading::before,
.avant-garde-follow-button-black.is-tiny.is-loading::before,
.avant-garde-button-dark.is-tiny.is-loading::before,
.avant-garde-button-white.is-tiny.is-loading::before,
.avant-garde-button-text.is-tiny.is-loading::before,
.avant-garde-button-underlined.is-tiny.is-loading::before {
  background: #fff;
  width: 12px;
  height: 3px;
  position: absolute;
  top: calc(50% - 3px / 2);
  left: calc(50% - 12px / 2);
  -webkit-animation: spin 1s infinite linear;
  -moz-animation: spin 1s infinite linear;
  -o-animation: spin 1s infinite linear;
  -ms-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
.avant-garde-button-black {
  text-align: center;
  background-color: #000;
  color: #fff;
  border: 1px solid transparent;
}
.avant-garde-button-black:focus,
.avant-garde-button-black:hover {
  background-color: #6e1eff;
}
.avant-garde-button-black[disabled],
.avant-garde-button-black.is-disabled,
.avant-garde-button-black[disabled]:hover,
.avant-garde-button-black.is-disabled:hover {
  background-color: #666;
  color: rgba(255, 255, 255, 0.75);
}
.avant-garde-follow-button-black {
  min-width: 115px;
}
.avant-garde-follow-button-black,
.avant-garde-follow-button-black:hover,
.avant-garde-follow-button-black:focus {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  color: #fff;
}
.avant-garde-follow-button-black,
.avant-garde-follow-button-black:focus {
  background-color: #000;
}
.avant-garde-follow-button-black:hover {
  background-color: #6e1eff;
}
.avant-garde-follow-button-black[data-state="following"],
.avant-garde-follow-button-black.is-following {
  background-color: #fff;
  color: #ccc;
  border: 1px solid #e5e5e5;
}
.avant-garde-follow-button-black.no-touch[data-state="following"]:hover,
.avant-garde-follow-button-black.no-touch.is-following:hover {
  color: #6e1eff;
}
.avant-garde-button-dark {
  color: #fff;
  background-color: #666;
}
.avant-garde-button-dark:focus,
.avant-garde-button-dark:hover {
  background-color: #6e1eff;
}
.avant-garde-button-dark[disabled],
.avant-garde-button-dark.is-disabled,
.avant-garde-button-dark[disabled]:hover,
.avant-garde-button-dark.is-disabled:hover {
  background-color: #666;
  color: rgba(255, 255, 255, 0.25);
}
.avant-garde-button-white {
  background-color: transparent;
  border: 1px solid #e5e5e5;
}
.avant-garde-button-white:focus,
.avant-garde-button-white:hover,
.avant-garde-button-white:active {
  color: #6e1eff;
  background-color: transparent;
}
.avant-garde-button-white[data-state="success"],
.avant-garde-button-white.is-success {
  background-color: transparent;
  color: #217c44;
}
.avant-garde-button-white[data-state="success"]:hover,
.avant-garde-button-white.is-success:hover {
  background-color: transparent;
  color: #6e1eff;
}
.avant-garde-button-white[data-state="error"],
.avant-garde-button-white.is-error,
.avant-garde-button-white[data-state="error"]:focus,
.avant-garde-button-white.is-error:focus {
  background-color: transparent;
  color: #e82f1d;
}
.avant-garde-button-white[data-state="error"]:hover,
.avant-garde-button-white.is-error:hover,
.avant-garde-button-white[data-state="error"]:focus:hover,
.avant-garde-button-white.is-error:focus:hover {
  background-color: transparent;
  color: #6e1eff;
}
.avant-garde-button-white[data-state="loading"],
.avant-garde-button-white.is-loading {
  background-color: #fff;
}
.avant-garde-button-white[data-state="loading"]::before,
.avant-garde-button-white.is-loading::before {
  background-color: #6e1eff;
}
.avant-garde-button-white[disabled],
.avant-garde-button-white.is-disabled,
.avant-garde-button-white[disabled]:hover,
.avant-garde-button-white.is-disabled:hover {
  background-color: transparent;
}
.avant-garde-button-text,
.avant-garde-button-underlined {
  background: transparent;
  padding: 0;
  border-bottom: 2px solid transparent;
  display: inline-block;
}
.avant-garde-button-text:focus,
.avant-garde-button-underlined:focus,
.avant-garde-button-text:hover,
.avant-garde-button-underlined:hover,
.avant-garde-button-text:active,
.avant-garde-button-underlined:active {
  border-bottom-color: #000;
  background: transparent;
}
.avant-garde-button-text[data-state="loading"],
.avant-garde-button-underlined[data-state="loading"],
.avant-garde-button-text.is-loading,
.avant-garde-button-underlined.is-loading {
  background: transparent;
  border-color: transparent;
  -webkit-transition: color 0;
  -moz-transition: color 0;
  -o-transition: color 0;
  -ms-transition: color 0;
  transition: color 0;
}
.avant-garde-button-text[data-state="loading"]::before,
.avant-garde-button-underlined[data-state="loading"]::before,
.avant-garde-button-text.is-loading::before,
.avant-garde-button-underlined.is-loading::before {
  background: #000;
}
.avant-garde-button-underlined {
  border-bottom-color: #000;
}
.stacked-button-menu {
  max-width: 100%;
  margin: 0 auto;
}
.stacked-button-menu > a,
.stacked-button-menu > button {
  display: block;
  width: 100%;
  margin: 10px auto;
}
.stacked-button-menu > a:first-child,
.stacked-button-menu > button:first-child {
  margin-top: 0;
}
.stacked-button-menu > a:last-child,
.stacked-button-menu > button:last-child {
  margin-bottom: 0;
}
.stacked-button-menu > a > i,
.stacked-button-menu > button > i {
  line-height: 0;
  margin-right: 10px;
  vertical-align: middle;
}
.garamond-button-text {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: normal;
  display: inline-block;
  position: relative;
  color: #000;
  text-decoration: none;
  line-height: 1 !important;
  cursor: pointer;
  border: none;
}
@media (min-width: 768px) {
  .garamond-button-text {
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
  }
}
.garamond-button-text[data-state="loading"],
.garamond-button-text.is-loading,
.garamond-button-text[data-state="loading"][disabled],
.garamond-button-text.is-loading[disabled],
.garamond-button-text[data-state="loading"][disabled]:hover,
.garamond-button-text.is-loading[disabled]:hover {
  color: transparent !important;
}
.garamond-button-text[data-state="loading"]::before,
.garamond-button-text.is-loading::before,
.garamond-button-text[data-state="loading"][disabled]::before,
.garamond-button-text.is-loading[disabled]::before,
.garamond-button-text[data-state="loading"][disabled]:hover::before,
.garamond-button-text.is-loading[disabled]:hover::before {
  display: block;
  content: "";
  background: #000;
  width: 25px;
  height: 6px;
  position: absolute;
  top: calc(50% - 6px / 2);
  left: calc(50% - 25px / 2);
  -webkit-animation: spin 1s infinite linear;
  -moz-animation: spin 1s infinite linear;
  -o-animation: spin 1s infinite linear;
  -ms-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
.order-form-cc-brands {
  background-image: url("/images/cc_brands.png");
}
.order-form-geotrust {
  background-image: url("/images/geotrust.png");
}
.mobile-section-iphone {
  background-image: url("/images/fair-iphone-promo.png");
}
.mobile-section-iphone-large {
  background-image: url("/images/fair-iphone-promo-large.jpg");
}
.fine-faux-underline {
  text-decoration: none;
  background-image: -webkit-linear-gradient(
    top,
    transparent 0,
    #333 1px,
    transparent 0
  );
  background-image: -moz-linear-gradient(
    top,
    transparent 0,
    #333 1px,
    transparent 0
  );
  background-image: -o-linear-gradient(
    top,
    transparent 0,
    #333 1px,
    transparent 0
  );
  background-image: -ms-linear-gradient(
    top,
    transparent 0,
    #333 1px,
    transparent 0
  );
  background-image: linear-gradient(
    to bottom,
    transparent 0,
    #333 1px,
    transparent 0
  );
  -webkit-background-size: 1px 5px;
  -moz-background-size: 1px 5px;
  background-size: 1px 5px;
  background-repeat: repeat-x;
  background-position: bottom;
}
.faux-underline {
  display: inline;
  position: relative;
  text-decoration: none;
}
.faux-underline:before {
  content: "";
  position: absolute;
  left: 0;
  display: inline-block;
  height: 1em;
  width: 100%;
  margin-top: 0.15em;
  border-bottom: 1px solid #777;
  color: #505050;
}
.faux-underline:hover {
  text-decoration: none;
}
.faux-underline-hover {
  display: inline;
  position: relative;
  text-decoration: none;
}
.faux-underline-hover:hover:before,
.faux-underline-hover:focus:before {
  content: "";
  position: absolute;
  left: 0;
  display: inline-block;
  height: 1em;
  width: 100%;
  margin-top: 0.4em;
  border-bottom: 1px solid #777;
  color: #505050;
}
.faux-underline-large {
  display: inline;
  position: relative;
  text-decoration: none;
}
.faux-underline-large:before {
  content: "";
  position: absolute;
  left: 0;
  display: inline-block;
  height: 1em;
  width: 100%;
  margin-top: 0.4em;
  border-bottom: 2px solid #333;
  color: #505050;
}
.faux-underline-large:hover {
  text-decoration: none;
}
.faux-underline-hover-large {
  display: inline;
  position: relative;
  text-decoration: none;
}
.faux-underline-hover-large:hover:before {
  content: "";
  position: absolute;
  left: 0;
  display: inline-block;
  height: 1em;
  width: 100%;
  margin-top: 0.4em;
  border-bottom: 2px solid #333;
  color: #505050;
}
.typeahead {
  position: relative;
}
.typeahead .twitter-typeahead {
  display: block;
  width: 100%;
  height: 100%;
}
.typeahead .icon-search {
  position: absolute;
  top: 50%;
  left: 10px;
  font-size: 20px;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  color: #ccc;
  z-index: 1;
}
.typeahead .bordered-input {
  display: block;
  width: 100%;
  height: 100%;
  padding-left: 32px;
}
.typeahead[data-state="loading"] > .typeahead-loading-indicator {
  display: block;
}
.typeahead[data-state="loading"]
  > .typeahead-loading-indicator
  > .loading-spinner-small {
  background-color: #6e1fff;
}
.typeahead .tt-hint {
  color: rgba(0, 0, 0, 0.25);
}
.typeahead .tt-dropdown-menu {
  width: 100%;
  background-color: #fff;
  border: 2px solid #6e1fff;
  border-top: none;
  text-align: left;
  z-index: 1070;
}
.typeahead .tt-suggestion {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  cursor: pointer;
  color: #000;
  background-color: #fff;
}
.typeahead .tt-suggestion.is-empty {
  cursor: normal;
}
.typeahead .tt-suggestion.is-empty,
.typeahead .tt-suggestion.is-empty:hover,
.typeahead .tt-suggestion.is-empty.tt-hint {
  color: #f7625a;
  background-color: #f8f8f8;
}
.typeahead .tt-cursor,
.typeahead .tt-suggestion:hover {
  background-color: #000;
  color: #fff;
}
.typeahead .tt-message {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 52px;
  padding: 10px;
  text-align: left;
  color: #000;
  background-color: #fdefd1;
  font-style: italic;
  border: 2px solid #000;
  border-top: none;
}
.typeahead-loading-indicator {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
}
.typeahead-suggestion-thumbnail,
.typeahead-suggestion-name {
  height: 52px;
  line-height: 32px;
  vertical-align: middle;
}
.typeahead-suggestion-thumbnail:first-child,
.typeahead-suggestion-name:first-child {
  padding-left: 10px;
}
.typeahead-suggestion-thumbnail {
  width: 52px;
  padding: 10px;
}
.typeahead-suggestion-thumbnail > span {
  display: inline-block;
  background-color: #ccc;
  width: 32px;
  height: 32px;
}
.typeahead-suggestion-name {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
  padding: 10px 10px 10px 0;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  white-space: nowrap !important;
}
.typeahead-suggestion-affordance {
  margin-right: 10px;
  display: none;
}
@media (max-width: 768px) {
  .typeahead-suggestion-affordance {
    display: inherit;
  }
}
.results-list-typeahead {
  margin: 10px 0;
}
.result-remove {
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 10px 10px 10px 20px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 14px;
  line-height: 1;
}
.result-remove:before {

}
.result-remove:hover:before {
  color: #f7625a;
  -webkit-text-stroke-width: 1px;
  -moz-text-stroke-width: 1px;
  -o-text-stroke-width: 1px;
  -ms-text-stroke-width: 1px;
  text-stroke-width: 1px;

}
.stacked-form {
  max-width: 100%;
  margin: 0 auto;
}
.stacked-form > h2 {
  margin: 20px 0;
  padding-bottom: 10px;
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 20px;
  border-bottom: 1px solid #e5e5e5;
}
.stacked-form > a,
.stacked-form > button {
  text-align: center;
}
.stacked-form > a,
.stacked-form > button,
.stacked-form > input,
.stacked-form > textarea,
.stacked-form > .bordered-select,
.stacked-form > .bordered-select > select,
.stacked-form > .bordered-multiple-select,
.stacked-form .stacked-form-cell {
  display: block;
  position: relative;
  width: 100%;
  margin: 10px auto;
}
.stacked-form > a:first-child,
.stacked-form > button:first-child,
.stacked-form > input:first-child,
.stacked-form > textarea:first-child,
.stacked-form > .bordered-select:first-child,
.stacked-form > .bordered-select > select:first-child,
.stacked-form > .bordered-multiple-select:first-child,
.stacked-form .stacked-form-cell:first-child {
  margin-top: 0;
}
.stacked-form > a:last-child,
.stacked-form > button:last-child,
.stacked-form > input:last-child,
.stacked-form > textarea:last-child,
.stacked-form > .bordered-select:last-child,
.stacked-form > .bordered-select > select:last-child,
.stacked-form > .bordered-multiple-select:last-child,
.stacked-form .stacked-form-cell:last-child {
  margin-bottom: 0;
}
.stacked-form > a > i,
.stacked-form > button > i {
  line-height: 0;
  margin-right: 10px;
  vertical-align: middle;
}
.stacked-form > label {
  margin: 20px 0 5px 0;
}
.stacked-form > label:first-child {
  margin-top: 0;
}
.stacked-form label + input,
.stacked-form label + textarea,
.stacked-form label + .bordered-select,
.stacked-form label + .bordered-multiple-select {
  margin-top: 5px;
}
.stacked-form > button:last-child {
  margin-top: 20px;
}
.avant-garde-form-label {
  display: block;
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.avant-garde-form-label + input,
.avant-garde-form-label + label {
  margin-top: 5px;
}
.avant-garde-form-label > span {
  font-size: 15px;
  line-height: 1.25;
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  line-height: 0;
  text-transform: none;
  letter-spacing: 0;
  color: #666;
}
.avant-garde-form-label > span:before {
  content: " ";
}
.avant-garde-form-label > span.is-error {
  color: #f7625a;
}
.bordered-input {
  margin: 0;
  padding: 10px;
  border: 2px solid #e5e5e5;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 17px;
  background-color: transparent;
  -webkit-transition: border-color 0.25s;
  -moz-transition: border-color 0.25s;
  -o-transition: border-color 0.25s;
  -ms-transition: border-color 0.25s;
  transition: border-color 0.25s;
}
.bordered-input::-webkit-input-placeholder {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 17px;
  color: #999;
}
.bordered-input:-moz-placeholder {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 17px;
  color: #999;
}
.bordered-input::-moz-placeholder {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 17px;
  color: #999;
}
.bordered-input:-ms-input-placeholder {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 17px;
  color: #999;
}
.bordered-input:focus,
.bordered-input:active,
.bordered-input.is-active {
  border-color: #6e1fff;
  outline: none;
  -webkit-transition: border-color 0.5s;
  -moz-transition: border-color 0.5s;
  -o-transition: border-color 0.5s;
  -ms-transition: border-color 0.5s;
  transition: border-color 0.5s;
}
.bordered-input:disabled {
  border: dotted 2px #e5e5e5;
}
.bordered-input[data-state="error"],
.bordered-input.is-error,
form.is-validated .bordered-input:invalid {
  border-color: #f7625a;
}
.bordered-input.is-block {
  display: block;
  width: 100%;
}
.typed-bordered-input {
  position: relative;
  display: inline-block;
}
.typed-bordered-input.is-block,
.typed-bordered-input.is-block > .bordered-input {
  display: block;
  width: 100%;
}
.typed-bordered-input > span {
  position: absolute;
  display: block;
  top: 50%;
  left: 15px;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
}
.typed-bordered-input > .bordered-input {
  padding-left: 30px;
}
.bordered-input-with-button {
  width: 100%;
}
.bordered-input-with-button > input {
  width: -webkit-calc(75% - 10px);
  width: -moz-calc(75% - 10px);
  width: -ms-calc(75% - 10px);
  width: -o-calc(75% - 10px);
  width: calc(75% - 10px);
  margin-right: 10px;
}
.bordered-input-with-button > a,
.bordered-input-with-button > button {
  width: 25%;
  padding-right: 0;
  padding-left: 0;
}
.bordered-select {
  position: relative;
  display: inline-block;
}
.bordered-select:before,
.bordered-select:after {
  pointer-events: none;
}
.bordered-select:before {
  display: block;
  position: absolute;
  content: "";
  top: 2px;
  right: 2px;
  bottom: 2px;
  width: 24px;
  background-color: #fff;
  border-top: 10px solid #fff;
  border-bottom: 10px solid #fff;
  border-left: 1px solid #e5e5e5;
}
.bordered-select:after {
  display: inline-block;
  content: "";
  width: 0;
  height: 0;
  vertical-align: middle;
  border-top: 8px solid #ccc;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  margin: 2px 0 4px 4px;
  position: absolute;
  top: 50%;
  right: 9px;
  margin-top: -4px;
}
.bordered-select > select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  display: inline-block;
  width: 200px;
  margin: 0;
  padding: 0;
  padding: 8px 10px 7px;
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 17px;
  border: 2px solid #e5e5e5;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: #fff;
}
.bordered-select.is-block,
.bordered-select.is-block > select {
  display: block;
  width: 100%;
}
.bordered-multiple-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 17px;
  border: 2px solid #e5e5e5;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: #fff;
}
.bordered-multiple-select > option {
  padding: 5px 5px;
}
.bordered-multiple-select.is-block {
  display: block;
  width: 100%;
}
textarea.bordered-input {
  resize: none;
  padding: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.artsy-toggle {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #e5e5e5;
  border-radius: 15px;
  color: #ccc;
  cursor: pointer;
  display: inline-block;
  line-height: 17px;
  text-decoration: none;
  -webkit-transition: "color, border-color" 0.2s;
  -moz-transition: "color, border-color" 0.2s;
  -o-transition: "color, border-color" 0.2s;
  -ms-transition: "color, border-color" 0.2s;
  transition: "color, border-color" 0.2s;
  width: 56px;
}
.artsy-toggle:focus + .artsy-toggle-label,
.artsy-toggle:hover + .artsy-toggle-label {
  color: #6e1fff;
}
.artsy-toggle::after {
  content: attr(data-state);
  display: inline;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: -1px;
  margin-left: 3px;
  position: relative;
  -webkit-transition: margin-left 0.2s;
  -moz-transition: margin-left 0.2s;
  -o-transition: margin-left 0.2s;
  -ms-transition: margin-left 0.2s;
  transition: margin-left 0.2s;
  top: -2px;
  width: 20px;
}
.artsy-toggle .artsy-toggle-dot {
  display: inline;
  font-size: 30px;
  left: 2px;
  position: relative;
  top: 2px;
  -webkit-transition: left 0.2s;
  -moz-transition: left 0.2s;
  -o-transition: left 0.2s;
  -ms-transition: left 0.2s;
  transition: left 0.2s;
}
.artsy-toggle .artsy-toggle-dot::after {

}
.artsy-toggle[data-state="on"] {
  background-color: #6e1fff;
  border-color: #6e1fff;
}
.artsy-toggle[data-state="on"] .artsy-toggle-dot {
  color: #fff;
  left: 33px;
}
.artsy-toggle[data-state="on"]::after {
  color: #fff;
  content: attr(data-state);
  margin-left: -10px;
}
.artsy-toggle-separator,
.artsy-toggle-label {
  display: inline-block;
  margin-left: 10px;
}
.artsy-toggle-separator::after {

}
.artsy-toggle-label:hover {
  color: #6e1fff;
  cursor: pointer;
}
.artsy-checkbox {
  display: inline-block;
  line-height: 20px;
}
.artsy-checkbox:hover .artsy-checkbox--checkbox > label:after {
  opacity: 0.1;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=10)";
  filter: alpha(opacity=10);
}
.artsy-checkbox--checkbox {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  background: #e5e5e5;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.artsy-checkbox--checkbox > label {
  cursor: pointer;
  position: absolute;
  top: 2px;
  right: 2px;
  bottom: 2px;
  left: 2px;
  background-color: #fff;
}
.artsy-checkbox--checkbox > label:after {
  content: "";
  position: absolute;
  top: 3px;
  right: 2px;
  bottom: 7px;
  left: 2px;
  border: 2px solid #000;
  border-top: none;
  border-right: none;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transform: rotate(-45deg) translateZ(0);
  -moz-transform: rotate(-45deg) translateZ(0);
  -o-transform: rotate(-45deg) translateZ(0);
  -ms-transform: rotate(-45deg) translateZ(0);
  transform: rotate(-45deg) translateZ(0);
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
}
.artsy-checkbox--checkbox > input[type="checkbox"] {
  visibility: hidden;
}
.artsy-checkbox--checkbox > input[type="checkbox"]:checked + label:after {
  opacity: 1 !important;
  -ms-filter: none !important;
  filter: none !important;
}
.artsy-checkbox--label {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-left: 10px;
  cursor: pointer;
}
.artsy-radio--label {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-left: 10px;
  cursor: pointer;
}
.autocomplete-input-container {
  display: inline-block;
  position: relative;
  line-height: 0;
}
.autocomplete-input-container[data-state="loading"]
  > .autocomplete-loading-indicator,
.autocomplete-input-container.is-loading > .autocomplete-loading-indicator {
  display: block;
}
.autocomplete-input-container[data-state="loading"]
  > .autocomplete-loading-indicator
  > .loading-spinner-small,
.autocomplete-input-container.is-loading
  > .autocomplete-loading-indicator
  > .loading-spinner-small {
  background-color: #6e1fff;
}
.autocomplete-input-container > .autocomplete-loading-indicator {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
}
.autocomplete-input-container.is-display-suggestions .autocomplete-feedback {
  visibility: visible;
  -webkit-transition: opacity 0.25s, border-color 0.75s;
  -moz-transition: opacity 0.25s, border-color 0.75s;
  -o-transition: opacity 0.25s, border-color 0.75s;
  -ms-transition: opacity 0.25s, border-color 0.75s;
  transition: opacity 0.25s, border-color 0.75s;
  opacity: 1;
  -ms-filter: none;
  filter: none;
  border-color: #6e1fff;
}
.autocomplete-input-container.is-block {
  display: block;
}
.autocomplete-input-container.is-block,
.autocomplete-input-container.is-block input {
  width: 100%;
}
.autocomplete-input-container .twitter-typeahead {
  display: block;
  width: 100%;
  height: 100%;
}
.autocomplete-input-container .tt-hint {
  display: none;
}
.autocomplete-input-container .tt-dropdown-menu {
  width: 100%;
  background-color: #fff;
  border: 2px solid #6e1fff;
  border-top: none;
  text-align: left;
  z-index: 1070;
}
.autocomplete-input-container .tt-suggestion {
  border-bottom: 1px solid #e5e5e5;
}
.autocomplete-input-container .tt-suggestion:last-child {
  border-bottom: none;
}
.autocomplete-input-container .tt-suggestion:hover,
.autocomplete-input-container .tt-suggestion.tt-cursor {
  background-color: #000;
}
.autocomplete-input-container .tt-suggestion:hover *,
.autocomplete-input-container .tt-suggestion.tt-cursor * {
  color: #fff;
}
.autocomplete-feedback {
  display: block;
  visibility: hidden;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 0 30px;
  line-height: 60px;
  text-align: left;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  border: 2px solid #e5e5e5;
  border-top: none;
  background-color: #f8f8f8;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1070;
}
.results-list {
  margin: 20px 0;
}
.results-list-item {
  display: table;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
}
.results-list-item:first-child {
  border-top: 1px solid #e5e5e5;
}
.results-list-item-cell,
.avant-garde-results-list-item-cell,
.garamond-results-list-item-cell {
  display: table-cell;
  vertical-align: middle;
  padding: 10px 0;
}
.results-list-item-cell:first-child,
.avant-garde-results-list-item-cell:first-child,
.garamond-results-list-item-cell:first-child {
  text-align: left;
}
.results-list-item-cell:last-child,
.avant-garde-results-list-item-cell:last-child,
.garamond-results-list-item-cell:last-child {
  text-align: right;
}
.avant-garde-results-list-item-cell {
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.garamond-results-list-item-cell {
  font-size: 17px;
  line-height: 1.5;
}
.form-errors {
  margin: 10px 0;
  font-size: 15px;
  line-height: 1.25;
}
.form-errors,
.form-errors > a {
  color: #f7625a;
}
.form-errors:empty {
  display: none;
}
.mktoErrorMsg {
  border-radius: 0 !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  background: #f7625a !important;
  border-color: #f7625a !important;
  text-shadow: none !important;
  color: #fff !important;
  padding: 15px 17px !important;
  font-size: 17px !important;
}
.mktoErrorArrow {
  background: #f7625a !important;
  border-color: #f7625a !important;
}
.avant-garde-header {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.avant-garde-header-center {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  display: block;
}
.avant-garde-header-small {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11px;
  text-decoration: none;
}
.garamond-header-center {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  text-align: center;
  display: block;
  font-size: 24px;
}
.large-garamond-header {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  text-align: left;
  display: block;
  font-size: 30px;
}
.extra-large-garamond-header {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  text-align: left;
  display: block;
  font-size: 37px;
  line-height: 1;
}
.evenly-bisected-header {
  zoom: 1;
  margin: 20px 0;
  margin: 0;
}
.evenly-bisected-header:before,
.evenly-bisected-header:after {
  content: "";
  display: table;
}
.evenly-bisected-header:after {
  clear: both;
}
.evenly-bisected-header .bisected-header-cell {
  float: left;
  text-align: left;
  font-size: 17px;
  line-height: 1.5;
}
.evenly-bisected-header .bisected-header-cell:first-child {
  width: 50%;
}
.evenly-bisected-header .bisected-header-cell:first-child:not(:last-child) {
  padding-right: 15px;
}
.evenly-bisected-header .bisected-header-cell:last-child {
  width: 50%;
}
.evenly-bisected-header .bisected-header-cell:last-child:not(:first-child) {
  padding-left: 15px;
}
.evenly-bisected-header .bisected-header-cell h2 {
  margin-bottom: 8px;
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.evenly-bisected-header .bisected-header-cell .bisected-header-cell-section {
  margin: 31px 0;
}
.evenly-bisected-header
  .bisected-header-cell
  .bisected-header-cell-section:first-child {
  margin-top: 0;
}
.evenly-bisected-header
  .bisected-header-cell
  .bisected-header-cell-section:last-child {
  margin-bottom: 0;
}
@media screen and (max-width: 768px) {
  .evenly-bisected-header .bisected-header-cell {
    float: none;
    margin: 20px 0;
  }
  .evenly-bisected-header .bisected-header-cell:first-child {
    margin-top: 0;
  }
  .evenly-bisected-header .bisected-header-cell:last-child {
    margin-bottom: 0;
  }
  .evenly-bisected-header .bisected-header-cell:first-child,
  .evenly-bisected-header .bisected-header-cell:last-child {
    width: 100% !important;
  }
  .evenly-bisected-header
    .bisected-header-cell:first-child
    .bisected-header-cell-section:last-child {
    margin: 31px 0 31px 0;
  }
  .evenly-bisected-header
    .bisected-header-cell:first-child
    .bisected-header-cell-section:last-child:first-child {
    margin-top: 0;
  }
  .evenly-bisected-header
    .bisected-header-cell:first-child
    .bisected-header-cell-section:last-child:last-child {
    margin-bottom: 0;
  }
}
.sixty-forty-bisected-header {
  zoom: 1;
  margin: 20px 0;
}
.sixty-forty-bisected-header:before,
.sixty-forty-bisected-header:after {
  content: "";
  display: table;
}
.sixty-forty-bisected-header:after {
  clear: both;
}
.sixty-forty-bisected-header .bisected-header-cell {
  float: left;
  text-align: left;
  font-size: 17px;
  line-height: 1.5;
}
.sixty-forty-bisected-header .bisected-header-cell:first-child {
  width: 60%;
}
.sixty-forty-bisected-header
  .bisected-header-cell:first-child:not(:last-child) {
  padding-right: 15px;
}
.sixty-forty-bisected-header .bisected-header-cell:last-child {
  width: 40%;
}
.sixty-forty-bisected-header
  .bisected-header-cell:last-child:not(:first-child) {
  padding-left: 15px;
}
.sixty-forty-bisected-header .bisected-header-cell h2 {
  margin-bottom: 8px;
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.sixty-forty-bisected-header
  .bisected-header-cell
  .bisected-header-cell-section {
  margin: 31px 0;
}
.sixty-forty-bisected-header
  .bisected-header-cell
  .bisected-header-cell-section:first-child {
  margin-top: 0;
}
.sixty-forty-bisected-header
  .bisected-header-cell
  .bisected-header-cell-section:last-child {
  margin-bottom: 0;
}
@media screen and (max-width: 768px) {
  .sixty-forty-bisected-header .bisected-header-cell {
    float: none;
    margin: 20px 0;
  }
  .sixty-forty-bisected-header .bisected-header-cell:first-child {
    margin-top: 0;
  }
  .sixty-forty-bisected-header .bisected-header-cell:last-child {
    margin-bottom: 0;
  }
  .sixty-forty-bisected-header .bisected-header-cell:first-child,
  .sixty-forty-bisected-header .bisected-header-cell:last-child {
    width: 100% !important;
  }
  .sixty-forty-bisected-header
    .bisected-header-cell:first-child
    .bisected-header-cell-section:last-child {
    margin: 31px 0 31px 0;
  }
  .sixty-forty-bisected-header
    .bisected-header-cell:first-child
    .bisected-header-cell-section:last-child:first-child {
    margin-top: 0;
  }
  .sixty-forty-bisected-header
    .bisected-header-cell:first-child
    .bisected-header-cell-section:last-child:last-child {
    margin-bottom: 0;
  }
}
.thirty-seventy-bisected-header {
  zoom: 1;
  margin: 20px 0;
}
.thirty-seventy-bisected-header:before,
.thirty-seventy-bisected-header:after {
  content: "";
  display: table;
}
.thirty-seventy-bisected-header:after {
  clear: both;
}
.thirty-seventy-bisected-header .bisected-header-cell {
  float: left;
  text-align: left;
  font-size: 17px;
  line-height: 1.5;
}
.thirty-seventy-bisected-header .bisected-header-cell:first-child {
  width: 30%;
}
.thirty-seventy-bisected-header
  .bisected-header-cell:first-child:not(:last-child) {
  padding-right: 15px;
}
.thirty-seventy-bisected-header .bisected-header-cell:last-child {
  width: 70%;
}
.thirty-seventy-bisected-header
  .bisected-header-cell:last-child:not(:first-child) {
  padding-left: 15px;
}
.thirty-seventy-bisected-header .bisected-header-cell h2 {
  margin-bottom: 8px;
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.thirty-seventy-bisected-header
  .bisected-header-cell
  .bisected-header-cell-section {
  margin: 31px 0;
}
.thirty-seventy-bisected-header
  .bisected-header-cell
  .bisected-header-cell-section:first-child {
  margin-top: 0;
}
.thirty-seventy-bisected-header
  .bisected-header-cell
  .bisected-header-cell-section:last-child {
  margin-bottom: 0;
}
@media screen and (max-width: 768px) {
  .thirty-seventy-bisected-header .bisected-header-cell {
    float: none;
    margin: 20px 0;
  }
  .thirty-seventy-bisected-header .bisected-header-cell:first-child {
    margin-top: 0;
  }
  .thirty-seventy-bisected-header .bisected-header-cell:last-child {
    margin-bottom: 0;
  }
  .thirty-seventy-bisected-header .bisected-header-cell:first-child,
  .thirty-seventy-bisected-header .bisected-header-cell:last-child {
    width: 100% !important;
  }
  .thirty-seventy-bisected-header
    .bisected-header-cell:first-child
    .bisected-header-cell-section:last-child {
    margin: 31px 0 31px 0;
  }
  .thirty-seventy-bisected-header
    .bisected-header-cell:first-child
    .bisected-header-cell-section:last-child:first-child {
    margin-top: 0;
  }
  .thirty-seventy-bisected-header
    .bisected-header-cell:first-child
    .bisected-header-cell-section:last-child:last-child {
    margin-bottom: 0;
  }
}
[class^="icon-"],
[class*=" icon-"] {
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
[class^="icon-"].icon-with-black-circle,
[class*=" icon-"].icon-with-black-circle {
  display: inline-block;
  background: #000;
  color: #fff;
  padding: 9px;
  border-radius: 100px;
  margin: 0 6px;
  min-width: 50px;
}
.icon-circle-chevron:before {

}
.icon-grid:before {

}
.icon-list:before {

}
.icon-check:before {

}
.icon-logo:before {

}
.icon-facebook:before {

}
.icon-facebook-f:before {

}
.icon-linkedin:before {

}
.icon-twitter:before {

}
.icon-pinterest:before {

}
.icon-chevron-right:before {

}
.icon-heart:before {

}
.icon-tumblr:before {

}
.icon-write:before {

}
.icon-view-in-room:before {

}
.icon-download:before {

}
.icon-close:before {

}
.icon-chevron-up:before {

}
.icon-mail:before {

}
.icon-info:before {

}
.icon-info-filled:before {

}
.icon-chevron-left:before {

}
.icon-chevron-down:before {

}
.icon-auction:before {

}
.icon-frame:before {

}
.icon-follow:before {

}
.icon-ellipsis:before {

}
.icon-edit:before {

}
.icon-link:before {

}
.icon-person:before {

}
.icon-share:before {

}
.icon-website:before {

}
.icon-artwork:before {

}
.icon-arrow-down:before {

}
.icon-logotype:before {

}
.icon-logotype-unscaled:before {

}
.icon-logo-unscaled:before {

}
.icon-chevron-small-up:before {

}
.icon-chevron-small-left:before {

}
.icon-chevron-small-down:before {

}
.icon-remove-small:before {

}
.icon-heart-small:before {

}
.icon-chevron-small-right:before {

}
.icon-plus-small:before {

}
.icon-minus-small:before {

}
.icon-follow-circle:before {

}
.icon-follow-circle.is-following:before {

}
.icon-instagram:before {

}
.icon-search:before {

}
.garamond-tablist,
.garamond-bordered-tablist {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 17px;
  line-height: 1.5;
}
.garamond-bordered-tablist {
  padding: 20px 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.garamond-tab {
  position: relative;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  -webkit-transition: border-bottom-color 0.125s;
  -moz-transition: border-bottom-color 0.125s;
  -o-transition: border-bottom-color 0.125s;
  -ms-transition: border-bottom-color 0.125s;
  transition: border-bottom-color 0.125s;
}
.garamond-tab:hover,
.garamond-tab:focus {
  border-bottom-color: #000;
}
.garamond-tab.is-active {
  color: #6e1fff;
  border-bottom-color: #e2d2ff;
}
.garamond-tab[disabled],
.garamond-tab.is-disabled,
.garamond-tab.is-disabled:hover {
  color: #999;
  pointer-events: none;
  border-bottom-color: transparent;
}
.garamond-tab-separator,
.meta-separator {
  display: inline-block;
  margin: 0 15px -2px 15px;
  width: 1px;
  height: 0.9em;
  vertical-align: baseline;
  -webkit-transform: rotate(30deg);
  -moz-transform: rotate(30deg);
  -o-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
  background-color: #666;
}
.garamond-tab-separator.is-vertical,
.meta-separator.is-vertical {
  -webkit-transform: none;
  -moz-transform: none;
  -o-transform: none;
  -ms-transform: none;
  transform: none;
}
.garamond-tab-label {
  text-transform: none;
  letter-spacing: 0;
}
.meta-separator {
  height: 1em;
  margin: 0 0.5em;
  vertical-align: middle;
  -webkit-transform: none;
  -moz-transform: none;
  -o-transform: none;
  -ms-transform: none;
  transform: none;
  background-color: #ccc;
}
.contextual-return-link {
  display: block;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
  text-decoration: none;
}
.contextual-return-link > .icon-chevron-small-left {
  font-size: 16px;
  margin-right: 5px;
  vertical-align: -2px;
  line-height: 0;
}
.avant-garde-jump-link {
  display: block;
  text-decoration: none;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.avant-garde-jump-link > .icon-chevron-small-right {
  font-size: 19px;
  line-height: 0;
  margin-left: 5px;
  vertical-align: -3px;
  color: #ccc;
  -webkit-transition: color 0.25s;
  -moz-transition: color 0.25s;
  -o-transition: color 0.25s;
  -ms-transition: color 0.25s;
  transition: color 0.25s;
}
.avant-garde-jump-link:hover > .icon-chevron-small-right {
  color: #000;
}
.hoverable-image-link {
  position: relative;
  display: inline-block;
}
.hoverable-image-link:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.33s;
  -moz-transition: opacity 0.33s;
  -o-transition: opacity 0.33s;
  -ms-transition: opacity 0.33s;
  transition: opacity 0.33s;
}
.hoverable-image-link:hover:after,
.hoverable-image-link.is-hovered:after {
  opacity: 0.5;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
  filter: alpha(opacity=50);
}
.hoverable-image-link > img,
.hoverable-image {
  width: 100%;
}
.hoverable-image-link > img[data-initials],
.hoverable-image[data-initials] {
  position: relative;
}
.hoverable-image-link > img[data-initials]:before,
.hoverable-image[data-initials]:before,
.hoverable-image-link > img[data-initials]:after,
.hoverable-image[data-initials]:after {
  display: block;
  position: absolute;
  z-index: -1;
}
.hoverable-image-link > img[data-initials]:before,
.hoverable-image[data-initials]:before {
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e5e5e5;
}
.hoverable-image-link > img[data-initials]:after,
.hoverable-image[data-initials]:after {
  content: attr(data-initials);
  font-size: 24px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.hoverable-image-link > img.is-three-two,
.hoverable-image.is-three-two,
.hoverable-image-link > img.is-four-three,
.hoverable-image.is-four-three {
  line-height: 0;
  background-repeat: no-repeat;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  background-size: contain;
}
.hoverable-image-link > img.is-three-two.is-cropped,
.hoverable-image.is-three-two.is-cropped,
.hoverable-image-link > img.is-four-three.is-cropped,
.hoverable-image.is-four-three.is-cropped {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
.hoverable-image-link > img.is-three-two,
.hoverable-image.is-three-two {
  padding-bottom: 66.67%;
}
.hoverable-image-link > img.is-four-three,
.hoverable-image.is-four-three {
  padding-bottom: 75%;
}
.horizontal-list-nav,
.alphabetical-index {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  font-size: 17px;
  width: 100%;
  border-width: 1px 0;
  border-style: solid;
  border-color: #e5e5e5;
}
.hln-cell.is-dominant,
.alphabetical-index-label.is-dominant,
.alphabetical-index-range.is-dominant {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.hln-cell:first-child,
.alphabetical-index-label:first-child,
.alphabetical-index-range:first-child {
  text-align: left;
}
.hln-cell:last-child,
.alphabetical-index-label:last-child,
.alphabetical-index-range:last-child {
  text-align: right;
}
.hln-link,
.alphabetical-index-range > a {
  display: inline-block;
  padding: 20px 0.75%;
  text-decoration: none;
  -webkit-transition: color 0.25s;
  -moz-transition: color 0.25s;
  -o-transition: color 0.25s;
  -ms-transition: color 0.25s;
  transition: color 0.25s;
}
.hln-link:first-child,
.alphabetical-index-range > a:first-child {
  padding-left: 0;
}
.hln-link:last-child,
.alphabetical-index-range > a:last-child {
  padding-right: 0;
}
.hln-link:hover,
.alphabetical-index-range > a:hover,
.hln-link.is-active,
.alphabetical-index-range > a.is-active {
  color: #6e1fff;
}
.alphabetical-index-label {
  padding: 20px 20px 20px 0;
}
.alphabetical-index-range {
  text-align: right;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.alphabetical-index-range > a {
  text-transform: uppercase;
}
.leader-dots-list {
  overflow-x: hidden;
}
.leader-dots-list-item {
  display: block;
  clear: both;
  text-decoration: none;
  padding: 10px 0;
  -webkit-transition: color 0.25s;
  -moz-transition: color 0.25s;
  -o-transition: color 0.25s;
  -ms-transition: color 0.25s;
  transition: color 0.25s;
  text-align: left;
}
.leader-dots-list-item:after {
  float: left;
  width: 0;
  white-space: nowrap;
  color: #666;
  content: ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ";
}
.leader-dots-list-item > span:first-child {
  padding-right: 0.33em;
  background: #fff;
}
.leader-dots-list-item > span:last-child {
  float: right;
  padding-left: 0.33em;
  background: #fff;
  position: relative;
  z-index: 1;
}
a.leader-dots-list-item:hover {
  color: #6e1fff;
}
.entity-link,
.entity-follow {
  line-height: 17px;
  vertical-align: middle;
}
.entity-link {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 17px;
  text-decoration: none;
}
.entity-link.is-small {
  font-size: 13px;
}
a.entity-link:hover {
  border-bottom: 2px solid #000;
}
.entity-follow:before {
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  vertical-align: -8.5px;
}
.entity-follow:after {
  margin-left: -3px;
  content: "Follow";
}
.entity-follow:hover {
  color: #6e1fff;
}
.entity-follow.is-following,
.entity-follow[data-state="following"] {
  color: #666;
}
.entity-follow.is-following:before,
.entity-follow[data-state="following"]:before {

}
.entity-follow.is-following:after,
.entity-follow[data-state="following"]:after {
  content: "Following";
}
.entity-follow.is-following:hover,
.entity-follow[data-state="following"]:hover {
  color: #f7625a;
}
.entity-follow.is-following:hover:after,
.entity-follow[data-state="following"]:hover:after {
  content: "Unfollow";
}
.entity-follow.is-following.is-clicked,
.entity-follow[data-state="following"].is-clicked {
  color: #6e1fff;
}
.entity-follow.is-following.is-clicked:after,
.entity-follow[data-state="following"].is-clicked:after {
  content: "Following";
}
.responsive-image-container {
  display: block;
  position: relative;
  background-color: #ccc;
}
.responsive-image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slick-dots,
.slick-next,
.slick-prev {
  position: absolute;
  display: block;
  padding: 0;
}

.slick-dots li button:before,
.slick-next:before,
.slick-prev:before {
  font-family: slick;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.slick-loading .slick-list {
  background: url(ajax-loader.gif) center center no-repeat #fff;
}

@font-face {
  font-family: slick;
  font-weight: 400;
  font-style: normal;
  src: url(fonts/slick.eot);
  src: url(fonts/slick.eot?#iefix) format("embedded-opentype"),
    url(fonts/slick.woff) format("woff"),
    url(fonts/slick.ttf) format("truetype"),
    url(fonts/slick.svg#slick) format("svg");
}

.slick-next,
.slick-prev {
  font-size: 0;
  line-height: 0;
  top: 50%;
  width: 20px;
  height: 20px;
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%);
  cursor: pointer;
  color: transparent;
  border: none;
  outline: 0;
  background: 0 0;
}

.slick-next:focus,
.slick-next:hover,
.slick-prev:focus,
.slick-prev:hover {
  color: transparent;
  outline: 0;
  background: 0 0;
}

.slick-next:focus:before,
.slick-next:hover:before,
.slick-prev:focus:before,
.slick-prev:hover:before {
  opacity: 1;
}

.slick-next.slick-disabled:before,
.slick-prev.slick-disabled:before {
  opacity: 0.25;
}

.slick-next:before,
.slick-prev:before {
  font-size: 20px;
  line-height: 1;
  opacity: 0.75;
  color: #fff;
}

.slick-prev {
  left: -25px;
}

[dir="rtl"] .slick-prev {
  right: -25px;
  left: auto;
}

.slick-prev:before {
  content: "â†";
}

.slick-next:before,
[dir="rtl"] .slick-prev:before {
  content: "â†’";
}

.slick-next {
  right: -25px;
}

[dir="rtl"] .slick-next {
  right: auto;
  left: -25px;
}

[dir="rtl"] .slick-next:before {
  content: "â†";
}

.slick-dotted.slick-slider {
  margin-bottom: 30px;
}

.slick-dots {
  bottom: -25px;
  width: 100%;
  margin: 0;
  list-style: none;
  text-align: center;
}

.slick-dots li {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 5px;
  padding: 0;
  cursor: pointer;
}

.slick-dots li button {
  font-size: 0;
  line-height: 0;
  display: block;
  width: 20px;
  height: 20px;
  padding: 5px;
  cursor: pointer;
  color: transparent;
  border: 0;
  outline: 0;
  background: 0 0;
}

.slick-dots li button:focus,
.slick-dots li button:hover {
  outline: 0;
}

.slick-dots li button:focus:before,
.slick-dots li button:hover:before {
  opacity: 1;
}

.slick-dots li button:before {
  font-size: 6px;
  line-height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  content: "â€¢";
  text-align: center;
  opacity: 0.25;
  color: #000;
}

.slick-dots li.slick-active button:before {
  opacity: 0.75;
  color: #000;
}

.slick-list,
.slick-slider,
.slick-track {
  position: relative;
  display: block;
}

.slick-loading .slick-slide,
.slick-loading .slick-track {
  visibility: hidden;
}

.slick-slider {
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -ms-touch-action: pan-y;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}

.slick-list {
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.slick-list:focus {
  outline: 0;
}

.slick-list.dragging {
  cursor: pointer;
  cursor: hand;
}

.slick-slider .slick-list,
.slick-slider .slick-track {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.slick-track {
  top: 0;
  left: 0;
}

.slick-track:after,
.slick-track:before {
  display: table;
  content: "";
}

.slick-track:after {
  clear: both;
}

.slick-slide {
  display: none;
  float: left;
  height: 100%;
  min-height: 1px;
}

[dir="rtl"] .slick-slide {
  float: right;
}

.slick-slide img {
  display: block;
}

.slick-slide.slick-loading img {
  display: none;
}

.slick-slide.dragging img {
  pointer-events: none;
}

.slick-initialized .slick-slide {
  display: block;
}

.slick-vertical .slick-slide {
  display: block;
  height: auto;
  border: 1px solid transparent;
}

.slick-arrow.slick-hidden {
  display: none;
}
.garamond-xxl-headline {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 72px;
  line-height: 1;
}
.garamond-xl-headline {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 50px;
  line-height: 1;
}
.garamond-l-headline {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 37px;
  line-height: 1.2;
}
.garamond-headline {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 30px;
  line-height: 1.25;
}
.garamond-s-headline {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 25px;
  line-height: 1.4;
}
.garamond-l-body {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 20px;
  line-height: 1.33;
}
.garamond-s-body {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 17px;
  line-height: 1.5;
}
.garamond-l-caption {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 15px;
  line-height: 1.25;
}
.garamond-m-caption {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 13px;
  line-height: 1.5;
}
.garamond-s-caption {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 11px;
  line-height: 1.5;
}
.avant-garde-xl-headline {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 24px;
  line-height: 1.33;
}
.avant-garde-l-headline {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 17px;
  line-height: 1.33;
}
.avant-garde-m-headline {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 15px;
  line-height: 1.33;
}
.avant-garde-body {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
  line-height: 1.33;
}
.avant-garde-s-headline {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11px;
  line-height: 1.33;
}
.vam-outer,
.vam-inner,
.vam-cell {
  height: 100%;
}
.vam-outer,
.vam-inner {
  width: 100%;
}
.vam-outer {
  display: table;
  table-layout: fixed;
}
.vam-inner,
.vam-cell {
  display: table-cell;
  vertical-align: middle;
}
.is-center-aligned {
  text-align: center;
}
.is-pull-right {
  float: right;
}
.is-pull-left {
  float: left;
}
.blurb {
  overflow: hidden;
  -webkit-transition: height 0.25s;
  -moz-transition: height 0.25s;
  -o-transition: height 0.25s;
  -ms-transition: height 0.25s;
  transition: height 0.25s;
}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-weight: inherit;
  font-style: inherit;
  font-family: inherit;
  font-size: 100%;
  vertical-align: baseline;
}
body {
  line-height: 1;
  color: #000;
  background: #fff;
}
ol,
ul {
  list-style: none;
}
table {
  border-collapse: separate;
  border-spacing: 0;
  vertical-align: middle;
}
caption,
th,
td {
  text-align: left;
  font-weight: normal;
  vertical-align: middle;
}
a img {
  border: none;
}
::selection {
  background-color: #6e1fff;
  color: #fff;
}
::-moz-selection {
  background-color: #6e1fff;
  color: #fff;
}
*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html[data-useragent*="Firefox"] {
  overflow-x: hidden;
}
html,
body {
  height: 100%;
}
body {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 17px;
  line-height: 1.4em;
  text-rendering: optimizeLegibility;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
a {
  color: #000;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(26, 26, 26, 0.302);
}
b,
strong {
  font-weight: bold;
}
em {
  font-style: italic;
}
img {
  display: block;
}
.small-caps {
  text-transform: uppercase;
  letter-spacing: 1px;
}
input {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: default-font-size;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
input[type="checkbox"] {
  -webkit-appearance: checkbox;
  -moz-appearance: checkbox;
  appearance: checkbox;
}
input[type="radio"] {
  -webkit-appearance: radio;
  -moz-appearance: radio;
  appearance: radio;
}
input:focus {
  outline: none;
}
button,
input {
  margin: 0;
  outline: none;
}
hr {
  position: relative;
  height: 1px;
  background-color: #e5e5e5;
  border: none;
  margin: 18px 0;
  zoom: 1;
}
hr:before,
hr:after {
  content: "";
  display: table;
}
hr:after {
  clear: both;
}
hr.is-invisible {
  background-color: transparent;
}
sup {
  font-size: 75%;
  line-height: 1;
  vertical-align: super;
}
sub {
  font-size: 75%;
  line-height: 1;
  vertical-align: sub;
}
figure {
  margin: 0;
}
#main-layout-container {
  margin-top: 144px;
}
.main-layout-container {
  max-width: 1250px;
  margin: auto;
}
.responsive-layout-container {
  margin: 0px 55px;
}
@media screen and (min-width: 1440px) {
  .responsive-layout-container {
    margin: 0px 150px;
  }
}
@media screen and (min-width: 1660px) {
  .responsive-layout-container {
    margin: 0px 200px;
  }
}
@media screen and (max-width: 768px) {
  .responsive-layout-container {
    margin: 0px;
  }
}
#blank-layout-container {
  height: 100%;
}
#scroll-frame-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  z-index: 10;
  background: #fff;
}
.scroll-frame-loading #scroll-frame-spinner {
  display: block;
}
.scroll-frame-open {
  overflow: hidden;
}
#scripts {
  width: 0;
  height: 0;
}
.grecaptcha-badge {
  visibility: hidden;
}
.is-scrolling-disabled {
  overflow: hidden;
}
.scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}
#modal {
  z-index: 1070;
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
#modal[data-state="open"],
#modal.is-open {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
#modal[data-state="open"] > .modal-backdrop > .modal-dialog,
#modal.is-open > .modal-backdrop > .modal-dialog {
  -webkit-transition: all 0.25s, width 0;
  -moz-transition: all 0.25s, width 0;
  -o-transition: all 0.25s, width 0;
  -ms-transition: all 0.25s, width 0;
  transition: all 0.25s, width 0;
}
#modal.is-slide-in > .modal-backdrop > .modal-dialog {
  -webkit-transform: translateY(100px);
  -moz-transform: translateY(100px);
  -o-transform: translateY(100px);
  -ms-transform: translateY(100px);
  transform: translateY(100px);
  -webkit-transition: -webkit-transform 0.4s;
  -moz-transition: -moz-transform 0.4s;
  -o-transition: -o-transform 0.4s;
  -ms-transition: -ms-transform 0.4s;
  transition: transform 0.4s;
}
#modal.is-slide-in[data-state="open"],
#modal.is-slide-in.is-open {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
#modal.is-slide-in[data-state="open"] > .modal-backdrop > .modal-dialog,
#modal.is-slide-in.is-open > .modal-backdrop > .modal-dialog {
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -o-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0);
  -webkit-transition: all 0.25s, width 0, -webkit-transform 0.4s;
  -moz-transition: all 0.25s, width 0, -moz-transform 0.4s;
  -o-transition: all 0.25s, width 0, -o-transform 0.4s;
  -ms-transition: all 0.25s, width 0, -ms-transform 0.4s;
  transition: all 0.25s, width 0, transform 0.4s;
}
#modal.is-loading > .modal-backdrop::before {
  display: block;
  content: "";
  background: #fff;
  width: 20px;
  height: 5px;
  position: absolute;
  top: calc(50% - 5px / 2);
  left: calc(50% - 20px / 2);
  -webkit-animation: spin 1s infinite linear;
  -moz-animation: spin 1s infinite linear;
  -o-animation: spin 1s infinite linear;
  -ms-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
#modal.confirm .modal-body {
  text-align: center;
  padding-top: 100px;
  padding-bottom: 100px;
  min-height: 266px;
}
#modal.confirm .avant-garde-header-center {
  font-size: 22px;
}
#modal.confirm h3 {
  margin-top: 20px;
  font-size: 24px;
}
#modal.confirm .avant-garde-button-black {
  width: 80%;
  margin-top: 13px;
}
#modal.confirm .avant-garde-button-black.bid-close-button {
  margin-top: 10px;
}
#modal .markdown-content {
  padding: 60px 80px;
}
.modal-h1 {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 22px;
}
#modal,
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
#modal.has-nobackdrop > .modal-backdrop {
  background-color: transparent;
}
.modal-dialog {
  position: fixed;
  overflow-y: auto;
  background-color: #fff;
  max-width: 90%;
  max-height: 90%;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -o-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.modal-dialog.is-notransition {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}
.modal-close {
  position: absolute;
  top: 25px;
  right: 25px;
  cursor: pointer;
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
  opacity: 0.15;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=15)";
  filter: alpha(opacity=15);
  z-index: 2;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -o-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.modal-close:hover {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.modal-close > i {
  font-size: 26px;
  line-height: 26px;
}
.modal-dialog,
.modal-body {
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
}
.modal-dialog[data-state="fade-out"],
.modal-body[data-state="fade-out"],
.modal-dialog.is-fade-out,
.modal-body.is-fade-out {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.modal-dialog[data-state="fade-in"],
.modal-body[data-state="fade-in"],
.modal-dialog.is-fade-in,
.modal-body.is-fade-in {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.modalize {
  z-index: 1070;
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.modalize[data-state="open"],
.modalize.is-open {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.modalize[data-state="open"] > .modalize-backdrop > .modalize-dialog,
.modalize.is-open > .modalize-backdrop > .modalize-dialog {
  -webkit-transition: opacity 0.25s, width 0;
  -moz-transition: opacity 0.25s, width 0;
  -o-transition: opacity 0.25s, width 0;
  -ms-transition: opacity 0.25s, width 0;
  transition: opacity 0.25s, width 0;
}
.modalize.is-loading .modalize-backdrop::before {
  display: block;
  content: "";
  background: #fff;
  width: 20px;
  height: 5px;
  position: absolute;
  top: calc(50% - 5px / 2);
  left: calc(50% - 20px / 2);
  -webkit-animation: spin 1s infinite linear;
  -moz-animation: spin 1s infinite linear;
  -o-animation: spin 1s infinite linear;
  -ms-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
.modalize.is-loading .modalize-dialog {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.modalize,
.modalize-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.modalize-backdrop {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
}
.has-nobackdrop > .modalize-backdrop {
  background-color: transparent;
}
.modalize-dialog {
  position: relative;
  margin: 0 auto;
  max-width: 90%;
  max-height: 90%;
  text-align: left;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #fff;
}
.modalize-dialog.is-notransition {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}
.modalize-close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 25px;
  cursor: pointer;
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
  opacity: 0.15;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=15)";
  filter: alpha(opacity=15);
  z-index: 2;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -o-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.modalize-close:hover {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.modalize-close > i {
  font-size: 26px;
  line-height: 26px;
}
.modalize-body {
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.modalize-dialog {
  -webkit-transition: opacity 0.25s, -webkit-transform 500ms;
  -moz-transition: opacity 0.25s, -moz-transform 500ms;
  -o-transition: opacity 0.25s, -o-transform 500ms;
  -ms-transition: opacity 0.25s, -ms-transform 500ms;
  transition: opacity 0.25s, transform 500ms;
}
.modalize-dialog[data-state="fade-out"],
.modalize-dialog.is-fade-out {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.modalize-dialog[data-state="fade-in"],
.modalize-dialog.is-fade-in {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.modalize-dialog[data-state="slide-out"],
.modalize-dialog.is-slide-out {
  -webkit-transform: translateY(100px);
  -moz-transform: translateY(100px);
  -o-transform: translateY(100px);
  -ms-transform: translateY(100px);
  transform: translateY(100px);
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.modalize-dialog[data-state="slide-in"],
.modalize-dialog.is-slide-in {
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -o-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.modalize-dialog[data-state="bounce-out"],
.modalize-dialog.is-slide-out {
  -webkit-transition-timing-function: cubic-bezier(0, 0, 1, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 1, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 1, 1);
  -ms-transition-timing-function: cubic-bezier(0, 0, 1, 1);
  transition-timing-function: cubic-bezier(0, 0, 1, 1);
  -webkit-transition: -webkit-transform 50ms;
  -moz-transition: -moz-transform 50ms;
  -o-transition: -o-transform 50ms;
  -ms-transition: -ms-transform 50ms;
  transition: transform 50ms;
  -webkit-transform: scale(1.04, 1.04);
  -moz-transform: scale(1.04, 1.04);
  -o-transform: scale(1.04, 1.04);
  -ms-transform: scale(1.04, 1.04);
  transform: scale(1.04, 1.04);
}
.modalize-dialog[data-state="bounce-in"],
.modalize-dialog.is-slide-in {
  -webkit-transition-timing-function: cubic-bezier(0, 0, 1, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 1, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 1, 1);
  -ms-transition-timing-function: cubic-bezier(0, 0, 1, 1);
  transition-timing-function: cubic-bezier(0, 0, 1, 1);
  -webkit-transition: -webkit-transform 50ms;
  -moz-transition: -moz-transform 50ms;
  -o-transition: -o-transform 50ms;
  -ms-transition: -ms-transform 50ms;
  transition: transform 50ms;
  -webkit-transform: scale(1, 1);
  -moz-transform: scale(1, 1);
  -o-transform: scale(1, 1);
  -ms-transform: scale(1, 1);
  transform: scale(1, 1);
}
.scontact-modal .modalize-body {
  padding: 30px;
}
.scontact-errors {
  color: #f7625a;
}
.scontact-headline {
  font-size: 25px;
  line-height: 1.4;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 0 20px;
}
@media screen and (min-width: 768px) {
  .scontact-headline {
    margin: 0 -30px;
  }
}
.scontact-errors,
.scontact-description,
.scontact-from {
  font-size: 17px;
  line-height: 1.5;
}
.scontact-details {
  margin: 20px 0;
}
.scontact-from,
.scontact-description {
  padding: 10px 0;
  border-bottom: 1px solid #e5e5e5;
}
.scontact-from .vam-cell:first-child,
.scontact-description .vam-cell:first-child {
  padding-right: 20px;
}
.scontact-artwork-details,
.scontact-show-details {
  zoom: 1;
}
.scontact-artwork-details:before,
.scontact-show-details:before,
.scontact-artwork-details:after,
.scontact-show-details:after {
  content: "";
  display: table;
}
.scontact-artwork-details:after,
.scontact-show-details:after {
  clear: both;
}
.scontact-artwork-details img,
.scontact-show-details img {
  height: 45px;
  float: left;
  margin: 0 15px 10px 0;
}
.scontact-from > span {
  color: #666;
}
.scontact-attending {
  display: block;
  margin: 20px 0 0 0;
}
.publish-modal .modal-close {
  display: none;
}
.publish-modal .modal-dialog {
  padding: 15px;
  text-align: center;
  color: #fff;
  background-color: #000;
}
.publish-modal .modal-dialog h3 {
  font-size: 22px;
}
.publish-modal .modal-dialog p {
  margin: 15px 0;
}
.publish-modal .stacked-button-menu,
.publish-modal .stacked-button-menu > a {
  margin-bottom: 0;
}
.clock {
  display: inline-block;
  text-align: left;
}
.clock-header {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: bold;
}
@media (min-width: 768px) {
  .clock-header {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
  }
}
.clock-value {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: bold;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  list-style: none;
  text-transform: capitalize;
}
@media (min-width: 768px) {
  .clock-value {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
  }
}
.clock-value li {
  display: inline-block;
  vertical-align: top;
}
.clock-value li small {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: bold;
  display: block;
  color: rgba(0, 0, 0, 0.6);
}
@media (min-width: 768px) {
  .clock-value li small {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
  }
}
.clock-closed {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.25;
  font-weight: normal;
  position: relative;
  text-align: center;
}
@media (min-width: 768px) {
  .clock-closed {
    font-size: 18px;
    line-height: 1.25;
    font-weight: normal;
  }
}
.white-overlay-clock {
  color: #fff;
  left: 50%;
  top: 50%;
  display: inline-block;
  position: absolute;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 1;
}
.white-overlay-clock .clock-header.clock-closed {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.25;
  font-weight: normal;
  color: color("white100");
  border: 0;
}
@media (min-width: 768px) {
  .white-overlay-clock .clock-header.clock-closed {
    font-size: 18px;
    line-height: 1.25;
    font-weight: normal;
  }
}
.white-overlay-clock .clock {
  text-align: center;
}
.white-overlay-clock .clock-header {
  margin-bottom: 5px;
}
.white-overlay-clock .clock-months,
.white-overlay-clock .clock-days,
.white-overlay-clock .clock-hours,
.white-overlay-clock .clock-minutes,
.white-overlay-clock .clock-seconds {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.25;
  font-weight: normal;
  margin: 0 15px;
}
@media (min-width: 768px) {
  .white-overlay-clock .clock-months,
  .white-overlay-clock .clock-days,
  .white-overlay-clock .clock-hours,
  .white-overlay-clock .clock-minutes,
  .white-overlay-clock .clock-seconds {
    font-size: 18px;
    line-height: 1.25;
    font-weight: normal;
  }
}
.white-overlay-clock .clock-months small,
.white-overlay-clock .clock-days small,
.white-overlay-clock .clock-hours small,
.white-overlay-clock .clock-minutes small,
.white-overlay-clock .clock-seconds small {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: bold;
  color: #fff;
}
@media (min-width: 768px) {
  .white-overlay-clock .clock-months small,
  .white-overlay-clock .clock-days small,
  .white-overlay-clock .clock-hours small,
  .white-overlay-clock .clock-minutes small,
  .white-overlay-clock .clock-seconds small {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
  }
}
.user-interests-results {
  margin: 10px 0;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.user-interests-results.is-fade-in {
  -webkit-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  -ms-transition: opacity 0.5s;
  transition: opacity 0.5s;
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.user-interests-results:empty {
  display: none;
}
.user-interests-results .results-list-item:first-child {
  border-top: none;
}
.user-interest-remove {
  padding: 10px 10px 10px 20px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  line-height: 14px;
}
.user-interest-remove:before {

}
.user-interest-remove:hover:before {
  color: #f7625a;
  -webkit-text-stroke-width: 1px;
  -moz-text-stroke-width: 1px;
  -o-text-stroke-width: 1px;
  -ms-text-stroke-width: 1px;
  text-stroke-width: 1px;

}
.google-maps-places-input {
  border: none;
  -webkit-box-shadow: inset 0 0 0 2px #e5e5e5;
  box-shadow: inset 0 0 0 2px #e5e5e5;
  padding: 12px;
  -webkit-transition: box-shadow 0.25s;
  -moz-transition: box-shadow 0.25s;
  -o-transition: box-shadow 0.25s;
  -ms-transition: box-shadow 0.25s;
  transition: box-shadow 0.25s;
}
.google-maps-places-input:focus {
  -webkit-transition: box-shadow 0.25s;
  -moz-transition: box-shadow 0.25s;
  -o-transition: box-shadow 0.25s;
  -ms-transition: box-shadow 0.25s;
  transition: box-shadow 0.25s;
  -webkit-box-shadow: inset 0 0 0 2px #6e1fff;
  box-shadow: inset 0 0 0 2px #6e1fff;
}
form.is-validated .google-maps-places-input:invalid {
  -webkit-box-shadow: inset 0 0 0 2px #f7625a;
  box-shadow: inset 0 0 0 2px #f7625a;
}
.pac-container {
  position: relative;
  -webkit-box-shadow: none;
  box-shadow: none;
  border: 2px solid #6e1fff;
  border-top: 0;
  border-radius: 0;
  z-index: 1070;
}
.pac-container:after {
  padding: 20px 0;
  background-position: 100% 50%;
  margin-right: 10px;
}
.pac-item {
  position: relative;
  padding: 10px;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  border-color: #e5e5e5;
}
.pac-item:first-child {
  border-top: none;
}
.pac-item:last-child {
  border-bottom: 1px solid #e5e5e5;
}
.pac-item:hover {
  background-color: #f8f8f8;
}
.pac-item.pac-item-selected {
  border-color: transparent;
  background-color: #000;
}
.pac-item.pac-item-selected > .pac-item-query {
  color: #fff;
}
.pac-item,
.pac-item-query {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 17px;
}
.small-chevron-list a {
  position: relative;
  display: block;
  text-decoration: none;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-top: -1px;
  padding: 15px 5px;
}
.small-chevron-list a::after {
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #c2c2c2;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 20px;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: color 0.125s;
  -moz-transition: color 0.125s;
  -o-transition: color 0.125s;
  -ms-transition: color 0.125s;
  transition: color 0.125s;
}
.small-chevron-list a:first-child {
  margin-top: 0;
}
.chevron-nav-list a {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: normal;
  position: relative;
  display: block;
  text-decoration: none;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-top: -1px;
  padding: 15px 0;
}
@media (min-width: 768px) {
  .chevron-nav-list a {
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
  }
}
.chevron-nav-list a::after {
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #c2c2c2;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 20px;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: color 0.125s;
  -moz-transition: color 0.125s;
  -o-transition: color 0.125s;
  -ms-transition: color 0.125s;
  transition: color 0.125s;
}
.chevron-nav-list a:first-child {
  margin-top: 0;
}
.chevron-nav-list a.is-active {
  color: #6e1eff;
}
.large-chevron-list a {
  position: relative;
  display: block;
  text-decoration: none;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-top: -1px;
  padding: 40px 80px 40px 40px;
}
.large-chevron-list a::after {
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #c2c2c2;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 20px;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: color 0.125s;
  -moz-transition: color 0.125s;
  -o-transition: color 0.125s;
  -ms-transition: color 0.125s;
  transition: color 0.125s;
}
.large-chevron-list a:first-child {
  margin-top: 0;
}
.large-chevron-list a::after {

  font-size: 40px;
  right: 10px;
}
.large-chevron-list a:hover {
  background-color: #f8f8f8;
  border-color: #f8f8f8;
  z-index: 1;
}
.alertable-input[data-alert] {
  background-color: #fdefd1;
  margin: -10px;
  padding: 10px;
  -webkit-animation: alertable-input 1s forwards;
  -moz-animation: alertable-input 1s forwards;
  -o-animation: alertable-input 1s forwards;
  -ms-animation: alertable-input 1s forwards;
  animation: alertable-input 1s forwards;
  -webkit-animation-delay: 0.5s;
  -moz-animation-delay: 0.5s;
  -o-animation-delay: 0.5s;
  -ms-animation-delay: 0.5s;
  animation-delay: 0.5s;
}
.alertable-input[data-alert]:after {
  display: block;
  content: attr(data-alert);
  margin: 10px 10px 0 10px;
}
.alertable-input[data-alert] > input,
.alertable-input[data-alert] > textarea {
  background-color: #fff;
}
@-moz-keyframes alertable-input {
  100% {
    background-color: transparent;
  }
}
@-webkit-keyframes alertable-input {
  100% {
    background-color: transparent;
  }
}
@-o-keyframes alertable-input {
  100% {
    background-color: transparent;
  }
}
@keyframes alertable-input {
  100% {
    background-color: transparent;
  }
}
.inquiry-questionnaire-modal .modalize-body {
  padding: 30px;
}
.iq-header {
  text-align: center;
  font-size: 25px;
  line-height: 1.4;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 0 20px;
  margin: 0 -30px;
}
.iq-headline {
  display: table;
  width: 100%;
  position: relative;
}
.iq-headline--centered {
  text-align: center;
}
.iq-headline #auth-header-logo {
  font-size: 39px;
  margin: 10px auto 15px;
}
.iq-headline > span {
  display: table-cell;
  vertical-align: bottom;
}
.iq-headline > span:first-child {
  padding-right: 20px;
}
.iq-headline > span:last-child {
  padding-left: 20px;
  text-align: right;
  font-size: 17px;
  line-height: 1.5;
  color: #666;
}
.iq-headline {
  margin: 15px 0 10px;
  font-size: 20px;
  line-height: 1.33;
}
.iq-subheadline {
  margin: 10px 0;
  font-size: 17px;
  line-height: 1.5;
  color: #666;
}
.iq-form {
  margin: 20px 0;
}
.iq-checkbox {
  display: block;
  margin: 20px 0;
}
.iq-search > span {
  left: 20px;
}
.iq-search > span > .icon-search {
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: #ccc;
}
.iq-search > .bordered-input {
  padding-left: 35px;
}
.iq-multiple-choice {
  margin: 50px 0;
}
.iq-multiple-choice > a {
  font-size: 17px;
  line-height: 1.5;
}
.iq-next {
  margin: 30px 0 !important;
}
.iq-top-margin {
  margin-top: 20px;
}
.iq-top-margin button {
  width: 100%;
}
.iq-push-down {
  display: block;
  margin: 20px 0 30px 0;
  text-decoration: none;
  font-size: 17px;
  line-height: 1.5;
}
.iq-loadable > * {
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.iq-loadable.is-loading:before {
  display: block;
  content: "";
  background: #000;
  width: 20px;
  height: 5px;
  position: absolute;
  top: calc(50% - 5px / 2);
  left: calc(50% - 20px / 2);
  -webkit-animation: spin 1s infinite linear;
  -moz-animation: spin 1s infinite linear;
  -o-animation: spin 1s infinite linear;
  -ms-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
.iq-loadable.is-loading > * {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.iq-account-logotype {
  display: block;
  margin: 0 auto;
  text-align: center;
  font-size: 55px;
  line-height: 1;
}
.iq-account-sub {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 17px;
  line-height: 1.5;
}
.iq-account-sub:first-child {
  margin-top: 0;
}
.iq-account-sub:last-child {
  margin-bottom: 0;
}
.iq-account-sub--small {
  margin: 10px 0;
  display: block;
  text-align: center;
  font-size: 15px;
  line-height: 1.25;
}
.iq-account-sub--small:first-child {
  margin-top: 0;
}
.iq-account-sub--small:last-child {
  margin-bottom: 0;
}
.iq-account-sub,
.iq-account-sub a {
  color: #666;
}
.iq-form-errors {
  color: #f7625a;
}
.iq-form-errors:first-letter {
  text-transform: uppercase;
}
.iq-sticky-bottom {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 40px 35px;
  background-color: #fff;
}
.iq-sticky-bottom:after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  margin-top: -60px;
  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
  background: -moz-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
  background: -o-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
  background: -ms-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);
  pointer-events: none;
}
.iq-sticky-bottom > .iq-next {
  margin: 0 !important;
}
.iq-sticky-spacer {
  height: 150px;
}
.iq-otp-field.is-hidden {
  display: none;
}
.gdpr-signup .tos-error {
  color: #f7625a;
  text-align: left;
  height: 1.23em;
  margin-bottom: 8px;
  font-size: 15px;
  line-height: 1.25;
}
.gdpr-signup .tos-error .bordered-input {
  width: 100%;
  margin-bottom: 10px;
}
.gdpr-signup .tos-error .avant-garde-button-black {
  width: 100%;
}
.gdpr-signup .tos-error .gdpr-signup__form__checkbox__accept-terms .is-error {
  visibility: hidden;
}
@media (max-width: 768px) {
  .iq-sticky-bottom {
    position: relative;
    margin-top: 20px;
    padding: 0;
  }
  .iq-sticky-bottom:after {
    display: none;
  }
  .iq-sticky-spacer {
    display: none;
  }
}
.view-in-room {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1070;
}
.view-in-room[data-state="in"] .view-in-room__room {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.view-in-room[data-state="in"] .view-in-room__artwork {
  -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
}
.view-in-room[data-state="in"] .view-in-room__measurement {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.view-in-room__close > i {
  color: #dfdbd8;
  font-size: 50px;
  line-height: 75px;
}
.view-in-room__close:hover {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.view-in-room__room {
  position: absolute;
  width: 6578px;
  height: 1368px;
  top: 50%;
  left: 50%;
  margin-top: -684px;
  margin-left: -3289px;
  background: #dfdbd8 url("https://d1ycxz9plii3tb.cloudfront.net/misc/room.jpg")
    bottom center no-repeat;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  -ms-transition: opacity 0.5s;
  transition: opacity 0.5s;
}
.view-in-room__placeholder,
.view-in-room__artwork {
  position: fixed;
  z-index: 2;
}
.view-in-room__placeholder {
  left: 50%;
  visibility: hidden;
}
.view-in-room__artwork.is-transition {
  -webkit-transition: all 0.75s;
  -moz-transition: all 0.75s;
  -o-transition: all 0.75s;
  -ms-transition: all 0.75s;
  transition: all 0.75s;
}
.view-in-room__artwork.is-notransition {
  -webkit-transition: none;
  -moz-transition: none;
  -o-transition: none;
  -ms-transition: none;
  transition: none;
}
.view-in-room__measurement-flex-container {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 100%;
}
.view-in-room__measurement {
  -webkit-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  -ms-transition: opacity 0.5s;
  transition: opacity 0.5s;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  z-index: 1;
}
.view-in-room__measurement-bar {
  height: 9px;
  border-left: 1px solid #666;
  border-right: 1px solid #666;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.view-in-room__measurement-feet {
  text-align: center;
  font-style: italic;
  color: #666;
  height: 18px;
  font-size: 14px;
}
.view-in-room__measurement-line {
  width: 100%;
  height: 0px;
  border-top: 1px solid #666;
}
.multi-page-view {
  position: relative;
}
.mpv-container {
  display: table;
  width: 100%;
  height: 100%;
}
.mpv-sidebar,
.mpv-page {
  display: table-cell;
  height: 100%;
  vertical-align: top;
  overflow-y: auto;
}
.mpv-sidebar {
  width: 33.33%;
  padding-right: 40px;
}
.mpv-page {
  width: 66.66%;
  border-left: 1px solid #e5e5e5;
  padding-left: 40px;
}
.mpv-title {
  font-size: 37px;
  line-height: 1.2;
}
.mpv-description {
  margin: 20px 0;
  font-size: 17px;
  line-height: 1.5;
}
.mpv-description > p {
  margin: 10px 0;
}
.mpv-description > p:first-child {
  margin-top: 0;
}
.mpv-description > p:last-child {
  margin-bottom: 0;
}
.mpv-nav {
  margin: 20px 0;
}
.mpv-nav > a {
  font-size: 11px !important;
  line-height: 1.33 !important;
  padding-right: 30px;
}
.mpv-page-content h1 {
  margin: 10px 0;
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.mpv-page-content h1:first-child {
  margin-top: 0;
}
.mpv-page-content h1:last-child {
  margin-bottom: 0;
}
.mpv-page-content h2 {
  font-size: 17px;
  line-height: 1.5;
  font-weight: bold;
}
.mpv-page-content p {
  margin-bottom: 20px;
  font-size: 17px;
  line-height: 1.5;
}
.multi-page-modal .multi-page-view {
  display: block;
  position: absolute;
  top: 50px;
  right: 50px;
  bottom: 50px;
  left: 50px;
  overflow: hidden;
}
.multi-page-modal .multi-page-view > .mpv-container {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  zoom: 1;
}
.multi-page-modal .multi-page-view > .mpv-container:before,
.multi-page-modal .multi-page-view > .mpv-container:after {
  content: "";
  display: table;
}
.multi-page-modal .multi-page-view > .mpv-container:after {
  clear: both;
}
.multi-page-modal .multi-page-view > .mpv-container > .mpv-sidebar,
.multi-page-modal .multi-page-view > .mpv-container > .mpv-page {
  display: block;
  float: left;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.artwork-auction-buyers-premium-modal .modalize-body {
  padding: 40px;
}
.artwork-auction-buyers-premium-modal .modalize-body h2 {
  font-size: 17px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
}
.artwork-auction-buyers-premium-modal .modalize-body p {
  margin-bottom: 20px;
}

#reset-password-page {
  text-align: center;
  max-width: 400px;
  margin: 55px auto;
}
#reset-password-page h1 {
  margin: 20px 0;
}
.jump-to-top {
  position: fixed;
  cursor: pointer;
  top: 80px;
  right: 20px;
  width: 70px;
  height: 70px;
  line-height: 70px;
  font-size: 35px;
  text-align: center;
  vertical-align: middle;
  border: 3px solid transparent;
  -webkit-transition: all 0.25s;
  -moz-transition: all 0.25s;
  -o-transition: all 0.25s;
  -ms-transition: all 0.25s;
  transition: all 0.25s;
  z-index: 950;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.jump-to-top:hover {
  border-color: #000;
}
.jump-to-top[data-state="hidden"],
.jump-to-top.is-hidden {
  -webkit-transform: translateY(-80px);
  -moz-transform: translateY(-80px);
  -o-transform: translateY(-80px);
  -ms-transform: translateY(-80px);
  transform: translateY(-80px);
  opacity: 0 !important;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)" !important;
  filter: alpha(opacity=0) !important;
  border-color: transparent !important;
  cursor: default;
  pointer-events: none;
}
.jump-to-top.from-bottom {
  bottom: 20px;
  top: auto;
  z-index: 2;
}
.jump-to-top.from-bottom[data-state="hidden"] {
  -webkit-transform: translateY(-20px);
  -moz-transform: translateY(-20px);
  -o-transform: translateY(-20px);
  -ms-transform: translateY(-20px);
  transform: translateY(-20px);
}
.row {
  margin: 40px 0;
}
.span,
.span1,
.span2,
.span3,
.span4,
.span5,
.span6 {
  display: inline-block;
  vertical-align: top;
  margin-right: 80px;
}
.span img,
.span1 img,
.span2 img,
.span3 img,
.span4 img,
.span5 img,
.span6 img {
  width: 100%;
  vertical-align: bottom;
}
.span a,
.span1 a,
.span2 a,
.span3 a,
.span4 a,
.span5 a,
.span6 a {
  text-decoration: none;
}
.span:last-child,
.span1:last-child,
.span2:last-child,
.span3:last-child,
.span4:last-child,
.span5:last-child,
.span6:last-child {
  margin-right: 0;
}
.span.is-centered,
.span1.is-centered,
.span2.is-centered,
.span3.is-centered,
.span4.is-centered,
.span5.is-centered,
.span6.is-centered {
  display: block;
  margin: auto;
}
.span1 {
  width: 120px;
}
.span2 {
  width: 320px;
}
.span3 {
  width: 520px;
}
.span4 {
  width: 720px;
}
.span5 {
  width: 920px;
}
.span6 {
  width: 1120px;
}
.body-about #main-layout-header {
  position: absolute;
}
.body-about #main-layout-container {
  margin-top: 0 !important;
  height: 100% !important;
}
.about-section > .about-container:first-child {
  margin-top: 120px;
}
.about-section > .about-container:last-child {
  margin-bottom: 120px;
}
.about-container {
  width: 1120px;
  margin: 180px auto;
  font-size: 18px;
  line-height: 28px;
}
.about-section-header {
  font-size: 42px;
  line-height: 54px;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  text-align: center;
  margin: 120px 0 60px 0;
  letter-spacing: 2px;
}
.about-section-header::after {
  content: "";
  color: transparent;
  width: 50px;
  height: 3px;
  background: #000;
  bottom: -20px;
  display: block;
  position: absolute;
  left: -webkit-calc(50% - 25px);
  left: -moz-calc(50% - 25px);
  left: -ms-calc(50% - 25px);
  left: -o-calc(50% - 25px);
  left: calc(50% - 25px);
}
.about-section-preamble {
  width: 600px;
  line-height: 28px;
  margin: 40px auto 80px;
}
.about-section-preamble a {
  text-decoration: underline;
}
.about-pull-blurb {
  margin-bottom: 40px;
}
.about-pull-blurb h1 {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11.5px;
  letter-spacing: 1px;
  line-height: 16px;
  line-height: 1;
}
.about-pull-blurb h2 {
  font-size: 42px;
  line-height: 48px;
}
.about-pull-blurb h1 + h2 {
  margin-top: 10px;
}
.about-pull-blurb h2 + p {
  margin-top: 30px;
}
.about-pull-blurb a {
  text-decoration: underline;
}
.about-avant-garde-caption {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11.5px;
  letter-spacing: 1px;
  line-height: 16px;
  margin-bottom: 5px;
}
.about-avant-garde-caption a {
  text-decoration: none;
}
.about-avant-garde-caption em {
  color: #999;
  font-style: normal;
}
.about-avant-garde-caption em:before {
  content: "–";
  padding: 0 5px;
  display: inline-block;
}
.about-garamond-caption,
.about-artwork-details {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 15px;
  margin-bottom: 5px;
}
.about-garamond-caption,
.about-artwork-details,
.about-garamond-caption a,
.about-artwork-details a {
  color: #999;
}
.about-garamond-caption a,
.about-artwork-details a {
  text-decoration: none;
}
.about-artwork-details {
  font-size: 16px;
  line-height: 1.4;
  margin: 15px 0;
}
.about-image-container {
  display: block;
  margin: 40px 0;
  position: relative;
}
.about-image-container:first-child {
  margin-top: 0;
}
.about-image-container:last-child {
  margin-bottom: 0;
}
.about-image-container img {
  margin-bottom: 5px;
}
.about-image-container > * {
  display: inline-block;
  width: 100%;
}
.about-image-container.is-pin-right {
  text-align: right;
}
.about-image-container.is-pin-right > * {
  text-align: left;
}
.about-section {
  overflow: hidden;
}
.about-spinner {
  position: fixed;
  width: 120px;
  height: 120px;
  top: 50%;
  left: 50%;
  margin-top: -60px;
  margin-left: -60px;
  background-color: #000;
  z-index: 3;
  display: none;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.about-spinner[data-state="loading"] {
  display: block;
}
.about-footer {
  position: relative;
}
.about-footer #main-layout-footer {
  display: none;
}
.about-section-nav {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
}
.about-section-nav.stuck {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  opacity: 1;
  -ms-filter: none;
  filter: none;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.about-section-nav > nav {
  display: table;
  width: 1120px;
  height: 65px;
  margin: auto;
}
.about-section-nav > nav > a {
  display: table-cell;
  cursor: pointer;
  width: 16.6%;
  height: 100%;
  padding: 20px;
  text-align: center;
  vertical-align: middle;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 1.4;
  color: #999;
  text-decoration: none;
}
.about-section-nav > nav > a > span {
  -webkit-transition: color 0.25s;
  -moz-transition: color 0.25s;
  -o-transition: color 0.25s;
  -ms-transition: color 0.25s;
  transition: color 0.25s;
}
.about-section-nav > nav > a:hover > span,
.about-section-nav > nav > a.is-active > span {
  color: #6e1fff;
}
.about-foreground {
  background-color: #fff;
  position: relative;
  z-index: 1;
}
.about-hero-unit {
  width: 100%;
  height: 100%;
  background-color: #000;
  overflow: hidden;
}
.about-hero-unit-bgs {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.about-hero-unit-bgs.is-loaded {
  -webkit-transition: opacity 1s;
  -moz-transition: opacity 1s;
  -o-transition: opacity 1s;
  -ms-transition: opacity 1s;
  transition: opacity 1s;
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.about-hero-unit-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: center center no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
.about-hero-unit-bg-credit {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
}
.about-hero-unit-bg-credit > span {
  display: block;
  width: 1120px;
  margin: 20px auto;
  font-size: 11px;
  font-style: italic;
  color: #fff;
}
.about-hero-unit-container {
  position: absolute;
  top: 59px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}
.a2huc-top {
  height: 70%;
}
.a2huc-bottom {
  height: 30%;
}
.about-hero-unit-h1 {
  position: relative;
  width: 1120px;
  margin: 0 auto;
  padding-right: 120px;
  overflow: hidden;
}
.about-hero-unit-h1 > h1 {
  font-size: 47px;
  line-height: 60px;
  color: #fff;
}
.about-nav {
  display: table;
  position: relative;
  width: 1120px;
  margin: 0 auto;
  height: 65px;
  -webkit-transition: opacity 1s;
  -moz-transition: opacity 1s;
  -o-transition: opacity 1s;
  -ms-transition: opacity 1s;
  transition: opacity 1s;
}
.about-nav a {
  display: table-cell;
  width: 16.6%;
  height: 100%;
  padding: 20px 0;
  text-align: center;
  vertical-align: middle;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
  letter-spacing: 2px;
  color: #fff;
  border-right: 1px solid rgba(255, 255, 255, 0.6);
}
.about-nav a:last-child {
  border-right: 0;
}
.about-nav a:hover span {
  opacity: 0.5;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
  filter: alpha(opacity=50);
}
.about-nav span {
  display: inline-block;
  vertical-align: middle;
  line-height: 18px;
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
}
.about-chevron {
  display: block;
  position: relative;
  width: 100%;
  height: 65%;
  text-align: center;
  -webkit-animation: pulse 2s infinite;
  -moz-animation: pulse 2s infinite;
  -o-animation: pulse 2s infinite;
  -ms-animation: pulse 2s infinite;
  animation: pulse 2s infinite;
}
.about-chevron > a {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  color: #fff;
  font-size: 26px;
}
html[data-useragent*="iPad"] .about-hero-unit-bgs {
  position: absolute;
}
html[data-useragent*="iPad"] .about-hero-unit {
  margin-top: -59px;
}
@-moz-keyframes pulse {
  0% {
    opacity: 0.33;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=33)";
    filter: alpha(opacity=33);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    opacity: 0.33;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=33)";
    filter: alpha(opacity=33);
  }
}
@-webkit-keyframes pulse {
  0% {
    opacity: 0.33;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=33)";
    filter: alpha(opacity=33);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    opacity: 0.33;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=33)";
    filter: alpha(opacity=33);
  }
}
@-o-keyframes pulse {
  0% {
    opacity: 0.33;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=33)";
    filter: alpha(opacity=33);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    opacity: 0.33;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=33)";
    filter: alpha(opacity=33);
  }
}
@keyframes pulse {
  0% {
    opacity: 0.33;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=33)";
    filter: alpha(opacity=33);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    opacity: 0.33;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=33)";
    filter: alpha(opacity=33);
  }
}
#about-section1-images1-left .about-image-container:nth-child(even) > *,
#about-section1-images1-right .about-image-container:nth-child(even) > * {
  width: 320px;
}
#about-section1-images2-left .about-image-container:nth-child(even) > * {
  width: 320px;
}
.icon-heart {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  top: 10px;
  right: 10px;
  position: absolute;
  color: #fff;
  z-index: 1;
  line-height: 50px;
  text-align: center;
  background-color: #6e1fff;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: -webkit-transform 0.5s, opacity 0.3s;
  -moz-transition: -moz-transform 0.5s, opacity 0.3s;
  -o-transition: -o-transform 0.5s, opacity 0.3s;
  -ms-transition: -ms-transform 0.5s, opacity 0.3s;
  transition: transform 0.5s, opacity 0.3s;
  -webkit-transform: rotateX(-180deg);
  -moz-transform: rotateX(-180deg);
  -o-transform: rotateX(-180deg);
  -ms-transform: rotateX(-180deg);
  transform: rotateX(-180deg);
  -webkit-backface-visibility: visible;
  -moz-backface-visibility: visible;
  -ms-backface-visibility: visible;
  backface-visibility: visible;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.icon-heart.is-active {
  opacity: 1;
  -ms-filter: none;
  filter: none;
  -webkit-transform: rotateX(0deg);
  -moz-transform: rotateX(0deg);
  -o-transform: rotateX(0deg);
  -ms-transform: rotateX(0deg);
  transform: rotateX(0deg);
}
.about-section1-phone-error {
  color: #f7625a;
  display: none;
  margin: 5px 0 15px 0;
  line-height: 1.2em;
  font-size: 16px;
}
.about-section1-phone-success {
  color: #0eda83;
  display: none;
  margin: 5px 0 15px 0;
  line-height: 1.2em;
  font-size: 16px;
}
.about-section1-phone-plate,
.about-section1-phone-bg {
  width: 100%;
  height: 800px;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  background-size: contain;
}
.about-section1-phone-plate {
  z-index: 2;
  height: 674px;
  background-image: url("/images/about_iphone_plate.png");
}
.about-section1-phone-container {
  position: relative;
}
.about-section1-phone-img-wrapper {
  overflow: hidden;
  position: absolute;
  top: 99px;
  left: 0;
  padding: 0 23px 0 28px;
  width: 100%;
  height: -webkit-calc(100% - 198px);
  height: -moz-calc(100% - 198px);
  height: -ms-calc(100% - 198px);
  height: -o-calc(100% - 198px);
  height: calc(100% - 198px);
  z-index: -1;
}
.about-section1-phone-bg {
  width: 100%;
  height: 1544px;
  width: 100%;
  position: relative;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  background-image: url("/images/about_iphone_bg.jpg");
  -webkit-transition: -webkit-transform 0.25s;
  -moz-transition: -moz-transform 0.25s;
  -o-transition: -o-transform 0.25s;
  -ms-transition: -ms-transform 0.25s;
  transition: transform 0.25s;
}
.about-section1-cta {
  margin: 0;
  width: 320px;
  text-align: center;
  float: right;
}
.about-section1-cta a {
  margin-bottom: 20px;
}
#about-section2-specialists-left .about-image-container > *,
#about-section2-specialists-right .about-image-container > * {
  width: 320px;
}
#about-section2-cta {
  text-align: center;
}
#about-section2-cta a:first-of-type {
  margin-right: 40px;
}
#about-section3-genome-works {
  position: relative;
}
#about-section3-genome-works-pullblurb {
  position: absolute;
}
#about-section3-genome-works-column {
  width: 480px;
  margin: auto;
}
.about-genome-work:nth-child(odd) {
  padding-left: 320px;
  margin-right: -320px;
}
.about-genome-work:nth-child(odd) .about-genome-work-genes {
  right: 100%;
}
.about-genome-work:nth-child(odd) .about-genome-work-gene {
  -webkit-transform: translateX(50%);
  -moz-transform: translateX(50%);
  -o-transform: translateX(50%);
  -ms-transform: translateX(50%);
  transform: translateX(50%);
}
.about-genome-work:nth-child(even) {
  padding-right: 320px;
  margin-left: -320px;
}
.about-genome-work:nth-child(even) .about-genome-work-genes {
  left: 100%;
}
.about-genome-work:nth-child(even) .about-genome-work-gene {
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}
.about-genome-work .about-artwork-details {
  position: absolute;
  max-width: 75%;
}
.about-genome-work-image {
  position: relative;
}
.about-genome-work-image > a > img {
  width: 100%;
}
.about-genome-work-genes {
  position: absolute;
  text-align: center;
  width: 160px;
  bottom: 0;
  padding: 0 30px;
  -webkit-transform: translateY(50%);
  -moz-transform: translateY(50%);
  -o-transform: translateY(50%);
  -ms-transform: translateY(50%);
  transform: translateY(50%);
}
.about-genome-work-gene {
  display: block;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11.5px;
  letter-spacing: 1px;
  line-height: 16px;
  margin: 40px 0;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  -ms-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transition-delay: 0;
  -moz-transition-delay: 0;
  -o-transition-delay: 0;
  -ms-transition-delay: 0;
  transition-delay: 0;
  text-decoration: none;
}
.about-genome-work-gene:hover {
  color: #6e1fff;
}
.about-genome-work-gene.is-active {
  opacity: 1;
  -ms-filter: none;
  filter: none;
  -webkit-transform: translateX(0) !important;
  -moz-transform: translateX(0) !important;
  -o-transform: translateX(0) !important;
  -ms-transform: translateX(0) !important;
  transform: translateX(0) !important;
}
.about-genome-work-gene:nth-child(2) {
  -webkit-transition-delay: 0.05s;
  -moz-transition-delay: 0.05s;
  -o-transition-delay: 0.05s;
  -ms-transition-delay: 0.05s;
  transition-delay: 0.05s;
}
.about-genome-work-gene:nth-child(3) {
  -webkit-transition-delay: 0.1s;
  -moz-transition-delay: 0.1s;
  -o-transition-delay: 0.1s;
  -ms-transition-delay: 0.1s;
  transition-delay: 0.1s;
}
.about-genome-work-gene:first-child {
  margin-top: 0;
}
.about-genome-work-gene:last-child {
  margin-bottom: 0;
}
.about-genome-work:nth-child(2),
.about-genome-work:nth-child(6),
.about-genome-work:nth-child(8) {
  padding-left: 120px;
}
#about-section4-pull-blurb-3-container {
  position: relative;
}
#about-section4-pull-blurb-3-container img {
  float: right;
  width: 520px;
}
#about-section4-pull-blurb-3-details {
  position: absolute;
  bottom: 0;
}
#about-section4-pull-blurb-3-details .about-artwork-details {
  margin: 0;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(1) {
  margin-left: 0px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(2) {
  margin-left: 2px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(3) {
  margin-left: 1px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(4) {
  margin-left: 0px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(5) {
  margin-left: 3px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(6) {
  margin-left: 2px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(7) {
  margin-left: 5px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(8) {
  margin-left: 0px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(9) {
  margin-left: 4px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(10) {
  margin-left: 0px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(11) {
  margin-left: 3px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(12) {
  margin-left: 4px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(13) {
  margin-left: 5px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(14) {
  margin-left: 0px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(15) {
  margin-left: 2px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(16) {
  margin-left: 3px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(17) {
  margin-left: 3px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(18) {
  margin-left: 2px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(19) {
  margin-left: 1px;
}
.about-section:nth-child(2) .about-section-header span:nth-of-type(20) {
  margin-left: 0px;
}
.about-section:nth-child(3) .about-section-header span:nth-of-type(1) {
  margin-left: 0px;
}
.about-section:nth-child(3) .about-section-header span:nth-of-type(2) {
  margin-left: 1px;
}
.about-section:nth-child(3) .about-section-header span:nth-of-type(3) {
  margin-left: 2px;
}
.about-section:nth-child(3) .about-section-header span:nth-of-type(4) {
  margin-left: 3px;
}
.about-section:nth-child(3) .about-section-header span:nth-of-type(5) {
  margin-left: 4px;
}
.about-section:nth-child(3) .about-section-header span:nth-of-type(6) {
  margin-left: 2px;
}
.about-section:nth-child(3) .about-section-header span:nth-of-type(7) {
  margin-left: 3px;
}
.about-section:nth-child(3) .about-section-header span:nth-of-type(8) {
  margin-left: 3px;
}
.about-section:nth-child(3) .about-section-header span:nth-of-type(9) {
  margin-left: 2px;
}
.about-section:nth-child(3) .about-section-header span:nth-of-type(10) {
  margin-left: 1px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(1) {
  margin-left: 0px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(2) {
  margin-left: 2px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(3) {
  margin-left: 2px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(4) {
  margin-left: 3px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(5) {
  margin-left: 0px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(6) {
  margin-left: 1px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(7) {
  margin-left: 5px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(8) {
  margin-left: 3px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(9) {
  margin-left: -1px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(10) {
  margin-left: 3px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(11) {
  margin-left: 2px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(12) {
  margin-left: 2px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(13) {
  margin-left: 2px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(14) {
  margin-left: 2px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(15) {
  margin-left: 0px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(16) {
  margin-left: 3px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(17) {
  margin-left: 3px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(18) {
  margin-left: 2px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(19) {
  margin-left: 3px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(20) {
  margin-left: 2px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(21) {
  margin-left: 2px;
}
.about-section:nth-child(4) .about-section-header span:nth-of-type(22) {
  margin-left: 0px;
}
.about-section:nth-child(5) .about-section-header span:nth-of-type(1) {
  margin-left: 0px;
}
.about-section:nth-child(5) .about-section-header span:nth-of-type(2) {
  margin-left: 2px;
}
.about-section:nth-child(5) .about-section-header span:nth-of-type(3) {
  margin-left: 2px;
}
.about-section:nth-child(5) .about-section-header span:nth-of-type(4) {
  margin-left: 1px;
}
.about-section:nth-child(5) .about-section-header span:nth-of-type(5) {
  margin-left: 2px;
}
.about-section:nth-child(5) .about-section-header span:nth-of-type(6) {
  margin-left: -1px;
}
.about-section:nth-child(5) .about-section-header span:nth-of-type(7) {
  margin-left: 4px;
}
.about-section:nth-child(5) .about-section-header span:nth-of-type(8) {
  margin-left: 3px;
}
.about-section:nth-child(5) .about-section-header span:nth-of-type(9) {
  margin-left: 2px;
}
.small-chevron-list a {
  position: relative;
  display: block;
  text-decoration: none;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-top: -1px;
  padding: 15px 5px;
}
.small-chevron-list a::after {
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #c2c2c2;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 20px;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: color 0.125s;
  -moz-transition: color 0.125s;
  -o-transition: color 0.125s;
  -ms-transition: color 0.125s;
  transition: color 0.125s;
}
.small-chevron-list a:first-child {
  margin-top: 0;
}
.chevron-nav-list a {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: normal;
  position: relative;
  display: block;
  text-decoration: none;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-top: -1px;
  padding: 15px 0;
}
@media (min-width: 768px) {
  .chevron-nav-list a {
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
  }
}
.chevron-nav-list a::after {
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #c2c2c2;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 20px;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: color 0.125s;
  -moz-transition: color 0.125s;
  -o-transition: color 0.125s;
  -ms-transition: color 0.125s;
  transition: color 0.125s;
}
.chevron-nav-list a:first-child {
  margin-top: 0;
}
.chevron-nav-list a.is-active {
  color: #6e1eff;
}
.large-chevron-list a {
  position: relative;
  display: block;
  text-decoration: none;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-top: -1px;
  padding: 40px 80px 40px 40px;
}
.large-chevron-list a::after {
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #c2c2c2;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 20px;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: color 0.125s;
  -moz-transition: color 0.125s;
  -o-transition: color 0.125s;
  -ms-transition: color 0.125s;
  transition: color 0.125s;
}
.large-chevron-list a:first-child {
  margin-top: 0;
}
.large-chevron-list a::after {

  font-size: 40px;
  right: 10px;
}
.large-chevron-list a:hover {
  background-color: #f8f8f8;
  border-color: #f8f8f8;
  z-index: 1;
}
.multi-page-view {
  position: relative;
}
.mpv-container {
  display: table;
  width: 100%;
  height: 100%;
}
.mpv-sidebar,
.mpv-page {
  display: table-cell;
  height: 100%;
  vertical-align: top;
  overflow-y: auto;
}
.mpv-sidebar {
  width: 33.33%;
  padding-right: 40px;
}
.mpv-page {
  width: 66.66%;
  border-left: 1px solid #e5e5e5;
  padding-left: 40px;
}
.mpv-title {
  font-size: 37px;
  line-height: 1.2;
}
.mpv-description {
  margin: 20px 0;
  font-size: 17px;
  line-height: 1.5;
}
.mpv-description > p {
  margin: 10px 0;
}
.mpv-description > p:first-child {
  margin-top: 0;
}
.mpv-description > p:last-child {
  margin-bottom: 0;
}
.mpv-nav {
  margin: 20px 0;
}
.mpv-nav > a {
  font-size: 11px !important;
  line-height: 1.33 !important;
  padding-right: 30px;
}
.mpv-page-content h1 {
  margin: 10px 0;
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.mpv-page-content h1:first-child {
  margin-top: 0;
}
.mpv-page-content h1:last-child {
  margin-bottom: 0;
}
.mpv-page-content h2 {
  font-size: 17px;
  line-height: 1.5;
  font-weight: bold;
}
.mpv-page-content p {
  margin-bottom: 20px;
  font-size: 17px;
  line-height: 1.5;
}
.multi-page-modal .multi-page-view {
  display: block;
  position: absolute;
  top: 50px;
  right: 50px;
  bottom: 50px;
  left: 50px;
  overflow: hidden;
}
.multi-page-modal .multi-page-view > .mpv-container {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  zoom: 1;
}
.multi-page-modal .multi-page-view > .mpv-container:before,
.multi-page-modal .multi-page-view > .mpv-container:after {
  content: "";
  display: table;
}
.multi-page-modal .multi-page-view > .mpv-container:after {
  clear: both;
}
.multi-page-modal .multi-page-view > .mpv-container > .mpv-sidebar,
.multi-page-modal .multi-page-view > .mpv-container > .mpv-page {
  display: block;
  float: left;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.contact-page {
  padding: 60px 0 120px 0;
}
.contact-section {
  zoom: 1;
  margin: 60px 0;
}
.contact-section:before,
.contact-section:after {
  content: "";
  display: table;
}
.contact-section:after {
  clear: both;
}
.contact-section:first-child {
  margin-top: 0;
}
.contact-section:last-child {
  margin-bottom: 0;
}
.contact-section > .contact-section-cell:first-child {
  width: 33.33%;
}
.contact-section > .contact-section-cell:last-child {
  width: 66.66%;
}
.contact-section-cell {
  float: left;
}
.contact-section-cell > header {
  font-size: 37px;
  line-height: 1.2;
}
.contact-section-cell > p {
  font-size: 20px;
  line-height: 1.33;
}
.contact-sub-sections,
.contact-staff-sections {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-orient: horizontal;
  -moz-box-orient: horizontal;
  -o-box-orient: horizontal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.contact-sub-section,
.contact-staff-section {
  width: 50%;
  margin-bottom: 60px;
  padding-right: 20px;
}
.css-title {
  font-size: 15px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
}
.css-description {
  font-size: 20px;
  line-height: 1.33;
}
.css-description a {
  text-decoration: none;
  background-image: -webkit-linear-gradient(
    top,
    transparent 0,
    #333 1px,
    transparent 0
  );
  background-image: -moz-linear-gradient(
    top,
    transparent 0,
    #333 1px,
    transparent 0
  );
  background-image: -o-linear-gradient(
    top,
    transparent 0,
    #333 1px,
    transparent 0
  );
  background-image: -ms-linear-gradient(
    top,
    transparent 0,
    #333 1px,
    transparent 0
  );
  background-image: linear-gradient(
    to bottom,
    transparent 0,
    #333 1px,
    transparent 0
  );
  -webkit-background-size: 1px 5px;
  -moz-background-size: 1px 5px;
  background-size: 1px 5px;
  background-repeat: repeat-x;
  background-position: bottom;
}
.contact-staff-section {
  width: 33.33%;
}
.black-tooltip {
  position: relative;
  text-decoration: none;
}
.black-tooltip:hover:before,
.black-tooltip:hover:after {
  opacity: 1;
  -ms-filter: none;
  filter: none;
  -webkit-transition-delay: 0.0625s;
  -moz-transition-delay: 0.0625s;
  -o-transition-delay: 0.0625s;
  -ms-transition-delay: 0.0625s;
  transition-delay: 0.0625s;
}
.black-tooltip:before,
.black-tooltip:after {
  top: -webkit-calc(100% + 8px);
  top: -moz-calc(100% + 8px);
  top: -ms-calc(100% + 8px);
  top: -o-calc(100% + 8px);
  top: calc(100% + 8px);
  left: 50%;
  position: absolute;
  pointer-events: none;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: 0.125s;
  -moz-transition: 0.125s;
  -o-transition: 0.125s;
  -ms-transition: 0.125s;
  transition: 0.125s;
  z-index: 1;
}
.black-tooltip:before {
  margin-top: -12px;
  margin-left: -6px;
  content: "";
  background: transparent;
  border: 6px solid transparent;
  border-bottom-color: #000;
}
.black-tooltip:after {
  content: attr(data-message);
  width: 135px;
  color: #fff;
  background-color: #000;
  padding: 8px 10px;
  margin-left: -67.5px;
  text-align: center;
}
.black-tooltip.with-black-circle:before,
.black-tooltip.with-black-circle:after {
  top: -webkit-calc(100% + 10px);
  top: -moz-calc(100% + 10px);
  top: -ms-calc(100% + 10px);
  top: -o-calc(100% + 10px);
  top: calc(100% + 10px);
}
.help-tooltip {
  display: inline-block;
  position: relative;
  cursor: help;
  margin: 0 0.5em;
  width: 14px;
  height: 14px;
  margin-bottom: -2px;
}
.help-tooltip:before,
.help-tooltip:after {
  display: block;
  top: 0;
  left: 0;
  position: absolute;
}
.help-tooltip:before {
  content: "?";
  z-index: 2;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  line-height: 15px;
  text-align: center;
  vertical-align: middle;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background-color: #666;
}
.help-tooltip:after {
  visibility: hidden;
  content: attr(data-message);
  text-align: left;
  z-index: 1;
  margin: -10px 0 0 -10px;
  width: 350px;
  color: #fff;
  background-color: #000;
  padding: 30px;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  line-height: 1.3;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -o-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.help-tooltip:hover:before {
  z-index: 4;
}
.help-tooltip:hover:after {
  opacity: 1;
  -ms-filter: none;
  filter: none;
  z-index: 3;
  -webkit-transition: opacity 0.125s;
  -moz-transition: opacity 0.125s;
  -o-transition: opacity 0.125s;
  -ms-transition: opacity 0.125s;
  transition: opacity 0.125s;
  -webkit-transition-delay: 0.0625s;
  -moz-transition-delay: 0.0625s;
  -o-transition-delay: 0.0625s;
  -ms-transition-delay: 0.0625s;
  transition-delay: 0.0625s;
  visibility: visible;
}
.help-tooltip[data-anchor="top-right"]:before,
.help-tooltip[data-anchor="top-right"]:after {
  top: 0;
  left: inherit;
  right: 0;
}
.help-tooltip[data-anchor="top-right"]:after {
  margin: -10px -10px 0 0;
}
.help-tooltip[data-anchor="bottom-left"]:before,
.help-tooltip[data-anchor="bottom-left"]:after {
  top: inherit;
  bottom: 0;
}
.help-tooltip[data-anchor="bottom-left"]:after {
  margin: 0 0 -10px -10px;
}
.help-tooltip[data-anchor="bottom-right"]:before,
.help-tooltip[data-anchor="bottom-right"]:after {
  top: inherit;
  left: inherit;
  right: 0;
  bottom: 0;
}
.help-tooltip[data-anchor="bottom-right"]:after {
  margin: 0 -10px -10px 0;
}
.artwork-columns {
  margin-bottom: 80px;
  white-space: nowrap;
}
.artwork-column {
  display: inline-block;
  margin: 0 40px;
  vertical-align: top;
  width: -webkit-calc(33% - 80px);
  width: -moz-calc(33% - 80px);
  width: -ms-calc(33% - 80px);
  width: -o-calc(33% - 80px);
  width: calc(33% - 80px);
}
.artwork-column .artwork-item {
  margin: 0;
  margin-bottom: 40px;
}
.artwork-column .artwork-item:last-child {
  margin-bottom: 0;
}
.artwork-column .overlay-container {
  bottom: 12px;
}
.artwork-column-artist-list-heading {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.artwork-column-artist-list {
  display: inline-block;
  vertical-align: top;
}
.artwork-columns-sale .artwork-column {
  border-right: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
  margin-left: 0 !important;
  margin-right: 0 !important;
  width: 33.33%;
}
.artwork-columns-sale .artwork-column:first-child {
  margin-right: -1px !important;
  border-left: 0px solid #fff;
}
.artwork-columns-sale .artwork-column:first-child .artwork-item {
  padding-left: 0;
}
.artwork-columns-sale .artwork-column:last-child {
  margin-left: -1px !important;
  border-right: none;
}
.artwork-columns-sale .artwork-column:last-child .artwork-item {
  padding-right: 0;
}
.artwork-columns-sale .artwork-column .artwork-item {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 30px 30px 30px;
}
.artwork-columns-sale .artwork-column .artwork-item:last-child {
  border-bottom: none;
}
.artwork-columns-sale .artwork-column .artwork-item .artwork-item-image-link {
  display: block;
  width: 100%;
  text-align: left;
  max-width: 260px;
}
.overlay-container {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
.overlay-button,
.overlay-button-save {
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: #fff;
  background-color: #999;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
  font-size: 16px;
  line-height: 40px;
  border-radius: 20px;
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.overlay-button:hover,
.overlay-button-save:hover {
  background-color: #000;
}
.overlay-button[data-state="saved"],
.overlay-button-save[data-state="saved"] {
  opacity: 1;
  -ms-filter: none;
  filter: none;
  background-color: #6e1fff;
}
.overlay-button[data-state="saved"]:hover,
.overlay-button-save[data-state="saved"]:hover {
  background-color: #f7625a;
}
.overlay-button[data-state="saved"]:hover:before,
.overlay-button-save[data-state="saved"]:hover:before {

}
.overlay-button[data-state="saved"]:hover.is-clicked,
.overlay-button-save[data-state="saved"]:hover.is-clicked {
  background-color: #6e1fff;
}
.overlay-button-save:before {

}
.artwork-item:hover .overlay-button-save {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.artwork-item .overlay-button-save {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.artwork-item .overlay-button-save[data-state="saved"] {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.artwork-item-image-container {
  margin-bottom: 11px;
}
.artwork-item-image-container img {
  vertical-align: bottom;
}
.artwork-item-image {
  display: block;
  background-color: #e5e5e5;
}
.artwork-item-image > img {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.artwork-item-image-link {
  display: block;
  position: relative;
  overflow: hidden;
}
.artwork-item-caption a.artwork-item-contact-seller {
  text-decoration: underline;
}
.artwork-item-caption {
  min-height: 55px;
  color: #666;
  font-size: 15px;
  line-height: 1.3;
  text-align: left;
  max-width: 100%;
}
.artwork-item-caption a {
  color: #666;
}
.artwork-item-caption a.avant-garde-button-black {
  color: #fff;
}
.artwork-item-caption a.artwork-item-bid {
  min-width: 90px;
}
.artwork-item-caption p.artwork-item-overflow {
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.artwork-item-caption__bid-now:before {
  content: "";
  background-image: url("/images/paddle.png");
  background-repeat: no-repeat;
  background-position: 0 2px;
  -webkit-background-size: 63%;
  -moz-background-size: 63%;
  background-size: 63%;
  padding-right: 15px;
  height: 10px;
}
.artwork-item-artist {
  font-weight: bold;
}
.artwork-item-artist a:after {
  content: ", ";
}
.artwork-item-artist a:last-child:after {
  content: "";
}
.artwork-item-sale-metadata {
  margin: 20px 0 10px;
}
.artwork-item-buy-now-price,
.artwork-item-auction-bid-status {
  color: #000;
  font-size: 13px;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.artwork-item-blurb {
  color: #000;
  font-size: 17px;
  margin-bottom: 1em;
  margin-top: 1em;
  text-align: left;
}
.artwork-item-sold {
  background-color: #666;
  color: #e5e5e5;
  cursor: default;
}
.artwork-item-sold:hover {
  color: #666;
  background-color: #e5e5e5;
}
.artwork-item .avant-garde-button-black {
  margin-right: 1em;
  margin-top: 1em;
}
.artwork-item-remove {
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  color: #fff;
  font-size: 22px;
  bottom: 5px;
  left: 5px;
  position: absolute;
  text-align: center;
  line-height: 30px;
  text-decoration: none;
  display: none;
}
.artwork-item-remove:hover {
  background: #f7625a;
}
.artwork-item:hover .artwork-item-remove {
  display: block;
}
.artwork-item-collection-name {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 3px;
  font-size: 12px;
  color: #666;
  text-decoration: none;
}
.artwork-item-estimate {
  color: #000;
  font-size: 17px;
}
.artwork-item-lot-number {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
  color: #000;
  margin-bottom: 2px;
}
.auction-artworks-display-nav {
  margin: 50px 0 0 0;
  padding-bottom: 20px;
  text-align: left;
  border-bottom: 1px solid #e5e5e5;
}
.auction-artworks-display-nav > a {
  margin: 0 30px;
}
.auction-artworks-display-nav > a:last-child {
  margin-right: 0;
}
.auction-artworks-container {
  margin-bottom: 60px;
}
.auction-artworks[data-mode="grid"] {
  zoom: 1;
}
.auction-artworks[data-mode="grid"]:before,
.auction-artworks[data-mode="grid"]:after {
  content: "";
  display: table;
}
.auction-artworks[data-mode="grid"]:after {
  clear: both;
}
.auction-artworks[data-mode="list"] {
  display: table;
  width: 100%;
}
.auction-grid-artwork {
  float: left;
  width: 33.33%;
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e5e5e5;
  font-size: 17px;
  line-height: 1.5;
}
.auction-grid-artwork a {
  text-decoration: none;
}
.aga-image {
  height: 350px;
  overflow-y: hidden;
}
.aga-image a {
  display: block;
}
.aga-image a > img {
  max-width: 100%;
  margin: auto;
}
.aga-metadata {
  margin: 15px 0 30px;
}
.aga-primary-information > * {
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.aga-lot-number {
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.aga-artist {
  margin-bottom: 10px;
  font-size: 15px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
}
.aga-bidding {
  margin-top: 15px;
  padding-top: 15px;
  background-image: -webkit-linear-gradient(left, #ccc 25%, transparent 0%);
  background-image: -moz-linear-gradient(left, #ccc 25%, transparent 0%);
  background-image: -o-linear-gradient(left, #ccc 25%, transparent 0%);
  background-image: -ms-linear-gradient(left, #ccc 25%, transparent 0%);
  background-image: linear-gradient(to right, #ccc 25%, transparent 0%);
  background-position: top;
  -webkit-background-size: 4px 1px;
  -moz-background-size: 4px 1px;
  background-size: 4px 1px;
  background-repeat: repeat-x;
}
.aga-bid-button {
  width: 100%;
  text-align: center;
  height: 100px;
}
.aga-bid-button > a {
  margin: 5px 0;
}
.aga-bid-button > a:first-child {
  margin-top: 0;
}
.aga-bid-button > a:last-child {
  margin-bottom: 0;
}
.aga-bid-status {
  display: table;
  width: 100%;
  margin-bottom: 15px;
}
.aga-bid-status:first-child {
  margin-bottom: 10px;
}
.aabs-label,
.aabs-price {
  display: table-cell;
  vertical-align: middle;
  line-height: 1;
}
.aabs-price {
  text-align: right;
  font-size: 15px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.aga-blurb {
  margin: 15px 0;
  height: 220px;
  overflow-y: hidden;
}
.aga-blurb > p {
  margin: 10px 0;
}
.aga-blurb > p:first-child {
  margin-top: 0;
}
.aga-blurb > p:last-child {
  margin-bottom: 0;
}
.auction-list-artwork {
  display: table-row;
  height: 170px;
  text-align: left;
  font-size: 17px;
  line-height: 1.5;
}
.auction-list-artwork:last-child {
  border-bottom: none;
}
.auction-list-artwork > div {
  display: table-cell;
  vertical-align: middle;
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.auction-list-artwork > div:last-child {
  text-align: right;
}
.auction-list-artwork > div a {
  text-decoration: none;
  display: block;
  height: 100%;
  width: 100%;
}
.ala-image {
  width: 170px;
}
.ala-image > a {
  display: block;
  margin: auto;
}
.ala-image > a > img {
  margin: auto;
  max-width: 130px;
  max-height: 130px;
}
.ala-primary-information {
  padding-right: 30px !important;
}
.ala-artist,
.ala-current-bid {
  font-size: 15px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.ala-lot-number {
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
}
.ala-lot-number,
.ala-estimate,
.ala-bid-count,
.ala-bid-status,
.ala-sale-message,
.ala-bid-button {
  white-space: nowrap;
}
.ala-bid-button > a {
  margin: 5px 0;
}
.ala-bid-button > a:first-child {
  margin-top: 0;
}
.ala-bid-button > a:last-child {
  margin-bottom: 0;
}
.clock {
  display: inline-block;
  text-align: left;
}
.clock-header {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: bold;
}
@media (min-width: 768px) {
  .clock-header {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
  }
}
.clock-value {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: bold;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  list-style: none;
  text-transform: capitalize;
}
@media (min-width: 768px) {
  .clock-value {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
  }
}
.clock-value li {
  display: inline-block;
  vertical-align: top;
}
.clock-value li small {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: bold;
  display: block;
  color: rgba(0, 0, 0, 0.6);
}
@media (min-width: 768px) {
  .clock-value li small {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
  }
}
.clock-closed {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.25;
  font-weight: normal;
  position: relative;
  text-align: center;
}
@media (min-width: 768px) {
  .clock-closed {
    font-size: 18px;
    line-height: 1.25;
    font-weight: normal;
  }
}
.white-overlay-clock {
  color: #fff;
  left: 50%;
  top: 50%;
  display: inline-block;
  position: absolute;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 1;
}
.white-overlay-clock .clock-header.clock-closed {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.25;
  font-weight: normal;
  color: color("white100");
  border: 0;
}
@media (min-width: 768px) {
  .white-overlay-clock .clock-header.clock-closed {
    font-size: 18px;
    line-height: 1.25;
    font-weight: normal;
  }
}
.white-overlay-clock .clock {
  text-align: center;
}
.white-overlay-clock .clock-header {
  margin-bottom: 5px;
}
.white-overlay-clock .clock-months,
.white-overlay-clock .clock-days,
.white-overlay-clock .clock-hours,
.white-overlay-clock .clock-minutes,
.white-overlay-clock .clock-seconds {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.25;
  font-weight: normal;
  margin: 0 15px;
}
@media (min-width: 768px) {
  .white-overlay-clock .clock-months,
  .white-overlay-clock .clock-days,
  .white-overlay-clock .clock-hours,
  .white-overlay-clock .clock-minutes,
  .white-overlay-clock .clock-seconds {
    font-size: 18px;
    line-height: 1.25;
    font-weight: normal;
  }
}
.white-overlay-clock .clock-months small,
.white-overlay-clock .clock-days small,
.white-overlay-clock .clock-hours small,
.white-overlay-clock .clock-minutes small,
.white-overlay-clock .clock-seconds small {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: bold;
  color: #fff;
}
@media (min-width: 768px) {
  .white-overlay-clock .clock-months small,
  .white-overlay-clock .clock-days small,
  .white-overlay-clock .clock-hours small,
  .white-overlay-clock .clock-minutes small,
  .white-overlay-clock .clock-seconds small {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
  }
}
.jobs-page {
  padding: 60px 0;
}
.jobs-header .jobs-header-headline {
  font-size: 50px;
  line-height: 1;
}
.jobs-header .jobs-header-description {
  font-size: 17px;
  line-height: 1.5;
}
.jobs-header .jobs-header-description a {
  text-decoration: none;
  background-image: -webkit-linear-gradient(
    top,
    transparent 0,
    #333 1px,
    transparent 0
  );
  background-image: -moz-linear-gradient(
    top,
    transparent 0,
    #333 1px,
    transparent 0
  );
  background-image: -o-linear-gradient(
    top,
    transparent 0,
    #333 1px,
    transparent 0
  );
  background-image: -ms-linear-gradient(
    top,
    transparent 0,
    #333 1px,
    transparent 0
  );
  background-image: linear-gradient(
    to bottom,
    transparent 0,
    #333 1px,
    transparent 0
  );
  -webkit-background-size: 1px 5px;
  -moz-background-size: 1px 5px;
  background-size: 1px 5px;
  background-repeat: repeat-x;
  background-position: bottom;
}
.jobs-images-cycle {
  margin: 40px 0 80px 0;
  padding-bottom: 40%;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.jobs-images-cycle.is-loaded {
  -webkit-transition: opacity 1s;
  -moz-transition: opacity 1s;
  -o-transition: opacity 1s;
  -ms-transition: opacity 1s;
  transition: opacity 1s;
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.jobs-category-section {
  zoom: 1;
  margin: 40px 0;
}
.jobs-category-section:before,
.jobs-category-section:after {
  content: "";
  display: table;
}
.jobs-category-section:after {
  clear: both;
}
.jobs-category-nav,
.jobs-category-items {
  float: left;
}
.jobs-category-nav {
  width: 200px;
  margin-right: -200px;
  background-color: #fff;
  padding-top: 40px;
  margin-top: -40px;
  z-index: 2;
}
.jobs-category-items {
  margin-left: 200px;
}
.jobs-category {
  display: block;
  padding-bottom: 40px;
  color: #999;
  -webkit-transition: color 0.125s;
  -moz-transition: color 0.125s;
  -o-transition: color 0.125s;
  -ms-transition: color 0.125s;
  transition: color 0.125s;
  text-decoration: none;
}
.jobs-category:hover,
.jobs-category.is-active {
  color: #000;
}
.jobs-category > h3 {
  font-size: 17px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.jobs-category > p {
  margin: 5px 0;
  font-size: 17px;
  line-height: 1.5;
}
.jobs-items {
  margin: 140px 0;
  padding-top: 40px;
  margin-top: -40px !important;
}
.jobs-items:first-child {
  margin-top: 0;
}
.jobs-items:last-child {
  margin-bottom: 0;
}
.jobs-item {
  display: block;
  text-decoration: none;
  zoom: 1;
}
.jobs-item:before,
.jobs-item:after {
  content: "";
  display: table;
}
.jobs-item:after {
  clear: both;
}
.jobs-item-metadata,
.jobs-item-description {
  overflow: hidden;
  float: left;
}
.jobs-item-metadata {
  width: 33.333333333333336%;
}
.jobs-item-description {
  width: 66.66666666666667%;
}
.jobs-item-title {
  font-size: 30px;
  line-height: 1.25;
}
.jobs-item-location {
  font-size: 30px;
  line-height: 1.25;
  font-style: italic;
}
.jobs-item-description {
  padding-left: 20px;
  font-size: 17px;
  line-height: 1.5;
}
@media screen and (max-width: 768px) {
  .responsive-layout-container {
    margin: 0;
  }
  .jobs-category-nav {
    float: none;
    width: 100%;
    padding-bottom: 40px;
    text-align: center;
  }
  .jobs-category {
    display: inline-block;
    padding: 0 20px;
  }
  .jobs-category-items {
    margin-left: 0;
    float: none;
  }
  .jobs-item-metadata,
  .jobs-item-description {
    float: none;
    width: 100%;
  }
  .jobs-item-description {
    padding-left: 0;
  }
}
#page-markdown-content {
  width: 600px;
  margin: 0px auto 0 auto;
  padding: 40px 0;
}
#page-markdown-content,
.markdown-content {
  font-size: 19px;
}
#page-markdown-content h1:first-child,
.markdown-content h1:first-child,
#page-markdown-content h2:first-child,
.markdown-content h2:first-child,
#page-markdown-content p:first-child,
.markdown-content p:first-child,
#page-markdown-content ul:first-child,
.markdown-content ul:first-child {
  margin-top: 0;
}
#page-markdown-content h1,
.markdown-content h1,
#page-markdown-content h2,
.markdown-content h2,
#page-markdown-content h3,
.markdown-content h3 {
  display: block;
  text-align: center;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
#page-markdown-content h1,
.markdown-content h1 {
  margin: 1em 0 1.8em 0;
  font-size: 20px;
}
#page-markdown-content h2,
.markdown-content h2 {
  margin-bottom: 1.5em;
  font-size: 13px;
}
#page-markdown-content h3,
.markdown-content h3 {
  font-size: 15px;
  text-align: left;
  margin-top: 28px;
  margin-bottom: 8px;
  line-height: 160%;
}
#page-markdown-content p,
.markdown-content p {
  margin-bottom: 1em;
  line-height: 1.5em;
}
#page-markdown-content ul,
.markdown-content ul {
  list-style: disc;
  margin-left: 1em;
}
#page-markdown-content ul li,
.markdown-content ul li {
  margin-bottom: 1em;
  margin-left: 1em;
  line-height: 1.5em;
}
#page-markdown-content ol,
.markdown-content ol {
  list-style: decimal;
  margin-left: 1em;
}
#page-markdown-content ol li,
.markdown-content ol li {
  margin-bottom: 1em;
  margin-left: 1em;
  line-height: 1.5em;
}
@media (max-width: 600px) {
  #page-markdown-content {
    width: 100%;
  }
}
.press-page {
  padding: 60px 0;
}
.press-header__headline {
  font-size: 50px;
  line-height: 1;
}
.press-header__contact {
  font-size: 20px;
  line-height: 1.33;
  margin: 8px 0;
}
.press-header__contact > a {
  text-decoration: none;
}
.press-tablist {
  margin: 60px auto;
  text-align: center;
}
.press-items {
  width: 75%;
  margin: 60px auto;
}
.press-items__date {
  margin: 40px;
  font-size: 17px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.press-items__list {
  margin: 40px 0 120px 0;
}
.press-item {
  display: block;
  text-decoration: none;
}
.press-item__title {
  font-size: 30px;
  line-height: 1.25;
  margin-bottom: 7px;
}
.press-item__metadata {
  font-size: 15px;
  line-height: 1.25;
  color: #999;
}
.press-item__subtitle-date {
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #999;
}
.press-item__subtitle {
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #999;
  margin-bottom: 5px;
  display: inline;
}
.press-item__date {
  display: inline;
}
.press-item__description {
  font-size: 17px;
  line-height: 1.5;
  margin-top: 6px;
}
.press-items[data-page="press-releases"] .press-item__metadata {
  display: none;
}
@media screen and (max-width: 768px) {
  .responsive-layout-container {
    margin: 0;
  }
  .press-tablist {
    margin: 40px auto 0;
  }
  .press-items {
    width: 100%;
  }
  .press-items__date {
    margin: 10px 0;
  }
  .press-items__list {
    margin: 20px 0 40px 0;
  }
  .press-item {
    padding: 20px 0 !important;
  }
  .press-item::after {
    display: none;
  }
}
.grid-n-up {
  margin-bottom: -20px;
}
.grid-n-up > .grid-item {
  width: 250px;
  margin: 0 10px 20px 10px;
}
.grid-n-up.is-flush .grid-item {
  width: 250px;
  margin: 0 !important;
}
@media screen and (max-width: 1024px) {
  .grid-n-up > .grid-item {
    margin: 0 5px 10px 5px;
  }
}
.grid-item {
  position: relative;
  display: inline-block;
  vertical-align: top;
}
.grid-item .hoverable-image-link {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}
.grid-2-up > .grid-item {
  margin: 20px 20px 0 20px;
}
.grid-2-up > .grid-item:nth-child(-n + 2) {
  margin-top: 0;
}
.grid-2-up > .grid-item:nth-child(1n) {
  margin-left: 0;
}
.grid-2-up > .grid-item:nth-child(2n) {
  margin-right: 0;
}
.grid-2-up > .grid-item:last-child {
  margin-right: 0;
}
.grid-2-up.is-flush .grid-item {
  width: 50%;
  margin: 0 !important;
}
@media screen and (max-width: 1024px) {
  .grid-2-up > .grid-item {
    margin: 10px 10px 0 10px;
  }
}
.grid-2-up > .grid-item {
  width: 48%;
  width: -webkit-calc(50% - 10px);
  width: -moz-calc(50% - 10px);
  width: -ms-calc(50% - 10px);
  width: -o-calc(50% - 10px);
  width: calc(50% - 10px);
}
@media screen and (max-width: 1024px) {
  .grid-2-up > .grid-item {
    width: -webkit-calc(50% - 5px);
    width: -moz-calc(50% - 5px);
    width: -ms-calc(50% - 5px);
    width: -o-calc(50% - 5px);
    width: calc(50% - 5px);
  }
}
.grid-3-up > .grid-item {
  margin: 20px 20px 0 20px;
}
.grid-3-up > .grid-item:nth-child(-n + 3) {
  margin-top: 0;
}
.grid-3-up > .grid-item:nth-child(1n) {
  margin-left: 0;
}
.grid-3-up > .grid-item:nth-child(3n) {
  margin-right: 0;
}
.grid-3-up > .grid-item:last-child {
  margin-right: 0;
}
.grid-3-up.is-flush .grid-item {
  width: 33.333333333333336%;
  margin: 0 !important;
}
@media screen and (max-width: 1024px) {
  .grid-3-up > .grid-item {
    margin: 10px 10px 0 10px;
  }
}
.grid-3-up > .grid-item {
  width: 32%;
  width: -webkit-calc(33.33% - 14px);
  width: -moz-calc(33.33% - 14px);
  width: -ms-calc(33.33% - 14px);
  width: -o-calc(33.33% - 14px);
  width: calc(33.33% - 14px);
}
@media screen and (max-width: 1024px) {
  .grid-3-up > .grid-item {
    width: -webkit-calc(33.33% - 7px);
    width: -moz-calc(33.33% - 7px);
    width: -ms-calc(33.33% - 7px);
    width: -o-calc(33.33% - 7px);
    width: calc(33.33% - 7px);
  }
}
.grid-4-up > .grid-item {
  margin: 20px 20px 0 20px;
}
.grid-4-up > .grid-item:nth-child(-n + 4) {
  margin-top: 0;
}
.grid-4-up > .grid-item:nth-child(1n) {
  margin-left: 0;
}
.grid-4-up > .grid-item:nth-child(4n) {
  margin-right: 0;
}
.grid-4-up > .grid-item:last-child {
  margin-right: 0;
}
.grid-4-up.is-flush .grid-item {
  width: 25%;
  margin: 0 !important;
}
@media screen and (max-width: 1024px) {
  .grid-4-up > .grid-item {
    margin: 10px 10px 0 10px;
  }
}
.grid-4-up > .grid-item {
  width: 23%;
  width: -webkit-calc(25% - 15px);
  width: -moz-calc(25% - 15px);
  width: -ms-calc(25% - 15px);
  width: -o-calc(25% - 15px);
  width: calc(25% - 15px);
}
@media screen and (max-width: 1024px) {
  .grid-4-up > .grid-item {
    width: 23%;
    width: -webkit-calc(25% - 7.5px);
    width: -moz-calc(25% - 7.5px);
    width: -ms-calc(25% - 7.5px);
    width: -o-calc(25% - 7.5px);
    width: calc(25% - 7.5px);
  }
}
@media (min-width: 320px) and (max-width: 480px) {
  .body-responsive .grid-item {
    width: 100%;
    margin: 5px 0 !important;
  }
  .body-responsive .grid-item:first-child {
    margin-top: 0 !important;
  }
  .body-responsive .grid-item:last-child {
    margin-bottom: 0 !important;
  }
}
#future-of-art-cover-banner {
  position: relative;
}
#future-of-art-cover-banner img {
  width: 100%;
}
#future-of-art-cover-banner figcaption {
  position: absolute;
  left: 10px;
  bottom: -30px;
  font-style: italic;
  font-size: 12px;
  color: #999;
}
#future-of-art-cover-banner figcaption a {
  color: #999;
  text-decoration: none;
}
#future-of-art-copy {
  width: 460px;
  margin: 54px auto;
  margin-bottom: 200px;
  line-height: 1.4em;
}
#future-of-art-copy h1 {
  font-size: 48px;
  line-height: 58px;
  margin-bottom: 28px;
}
#future-of-art-copy h2 {
  font-size: 21px;
  line-height: 33px;
}
#future-of-art-copy h2 a {
  color: #6e1fff;
  text-decoration: underline;
}
#future-of-art-copy h3 {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 10px;
  display: block;
  margin-bottom: 20px;
}
#future-of-art-copy p {
  line-height: 25px;
  margin-bottom: 1.4em;
}
#future-of-art-copy img {
  width: 82px;
  margin: 30px 10px -1.4em 0;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -8px;
}
#future-of-art-copy .avant-garde-button-white {
  border: 2px solid #000;
  font-size: 10px;
  padding: 14px 34px;
  display: block;
  margin: 0 106px;
  display: inline-block;
}
#future-of-art-copy .avant-garde-button-white:hover {
  color: #fff;
  background: #000;
}
#future-of-art-copy-text {
  position: relative;
}
#future-of-art-copy-text::after {
  content: ".";
  width: 100%;
  height: 140px;
  position: absolute;
  bottom: 0;
  left: 0;
  color: transparent;
  display: block;
  position: absolute;
  z-index: 2;
  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
  background: -moz-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
  background: -o-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
  background: -ms-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);
  pointer-events: none;
}
.main-layout-container--christies {
  zoom: 1;
}
.main-layout-container--christies:before,
.main-layout-container--christies:after {
  content: "";
  display: table;
}
.main-layout-container--christies:after {
  clear: both;
}
.christies-banner-image {
  width: 100%;
  height: 300px;
  background-color: #ccc;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  background-position: center center;
  position: relative;
}
.christies-banner-image__logo {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-background-size: 50% auto;
  -moz-background-size: 50% auto;
  background-size: 50% auto;
  background-position: center center;
  background-repeat: no-repeat;
  display: none;
}
.christies-banner-image__text {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-background-size: auto 150px;
  -moz-background-size: auto 150px;
  background-size: auto 150px;
  background-position: 0;
  background-repeat: no-repeat;
}
.christies-header {
  margin: 50px 0;
  line-height: 1.2;
  text-align: center;
}
.christies-header > h1,
.christies-header > h2 {
  margin: 15px 0;
}
.christies-header > h1 {
  font-size: 40px;
}
.christies-header > h2 {
  font-size: 22px;
}
.christies-section-header {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
  margin-bottom: 30px;
}
.christies-featured-editorials {
  margin: 50px 0;
  float: right;
  width: 30%;
  min-width: 220px;
  padding-left: 100px;
}
.christies-featured-editorial {
  display: block;
  margin: 20px 0;
  text-decoration: none;
  padding-bottom: 20px;
}
.christies-featured-editorial-metadata,
.christies-featured-editorial-image {
  height: 100%;
}
.christies-featured-editorial-metadata {
  line-height: 1.2;
}
.christies-featured-editorial-metadata > h4,
.christies-featured-editorial-metadata > h3 {
  margin: 10px 0;
}
.christies-featured-editorial-metadata > h4 {
  font-size: 20px;
}
.christies-featured-editorial-metadata > h5 {
  font-size: 11px;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.christies-featured-editorial-image {
  text-align: right;
}
.christies-featured-editorial-image > img {
  display: inline-block;
  vertical-align: bottom;
  max-width: 100%;
}
.christies-sale-links {
  margin: 50px 0;
  float: left;
  width: 70%;
  padding-right: 20px;
  display: table;
  border-collapse: separate;
  vertical-align: top;
}
.christies-sale-item {
  display: table-row;
  height: 330px;
  text-align: left;
}
.christies-sale-link {
  display: table-cell;
  vertical-align: middle;
  -webkit-background-size: auto 100%;
  -moz-background-size: auto 100%;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: right;
  text-decoration: none;
  border-bottom: 60px solid #fff;
  position: relative;
}
.christies-sale-link-mobile-img {
  display: none;
}
.christies-sale-link-metadata {
  display: block;
  padding: 20px 0;
  text-align: left;
  text-decoration: none;
  max-width: 55%;
}
.christies-sale-link-metadata .opening {
  border: 2px solid #000;
  padding: 5px 10px;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11px;
  display: inline-block;
}
.christies-sale-link-metadata > h3 {
  margin: 15px 0;
  font-size: 37px;
  line-height: 1.3;
}
.christies-sale-link-metadata > h4 {
  color: #999;
  font-size: 18px;
}
@media screen and (max-width: 940px) {
  .responsive-layout-container {
    margin: 0 20px;
  }
  .christies-header > h1 {
    font-size: 33px;
  }
  .christies-header > h2 {
    font-size: 18px;
  }
  .christies-banner-image {
    height: 200px;
  }
  .christies-banner-image__logo {
    display: block;
  }
  .christies-banner-image__text {
    display: none;
  }
  .christies-section-header {
    text-align: center;
  }
  .christies-featured-editorials {
    width: 100%;
    float: none;
    padding-left: 0;
  }
  .christies-featured-editorial {
    display: table;
  }
  .christies-featured-editorial-image {
    display: table-cell;
    max-width: 40%;
    padding-right: 30px;
    vertical-align: middle;
  }
  .christies-featured-editorial-metadata {
    padding-right: 10px;
    max-width: 50%;
    display: table-cell;
    vertical-align: middle;
  }
  .christies-featured-editorial-metadata > h4 {
    font-size: 20px;
  }
  .christies-sale-links {
    float: none;
    width: 100%;
    padding-right: 0px;
  }
  .christies-sale-item {
    display: table-row;
    height: 130px;
    text-align: left;
  }
  .christies-sale-link {
    display: table-cell;
    vertical-align: middle;
    -webkit-background-size: 0%;
    -moz-background-size: 0%;
    background-size: 0%;
    background-repeat: no-repeat;
    background-position: right;
    background-image: none;
    text-decoration: none;
    border-bottom: 20px solid #fff;
    position: relative;
  }
  .christies-sale-link-mobile-img {
    display: block;
  }
  .christies-sale-link-mobile-img img {
    max-width: 100%;
  }
  .christies-sale-link-metadata {
    display: block;
    padding: 20px 0;
    text-align: center;
    text-decoration: none;
    max-width: 100%;
  }
  .christies-sale-link-metadata .opening {
    border: 2px solid #000;
    padding: 5px 10px;
    font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
      "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
    -webkit-font-smoothing: antialiased;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 9px;
    display: inline-block;
  }
  .christies-sale-link-metadata > h3 {
    margin: 10px 0 0;
    font-size: 20px;
    line-height: 1;
  }
  .christies-sale-link-metadata > h4 {
    color: #999;
    font-size: 14px;
  }
}
.fillwidth-list li {
  margin: 0 15px 15px 0;
  position: relative;
}
.fillwidth-list .artwork-item {
  margin: 0;
}
.fillwidth-list .artwork-item-image-container {
  margin-bottom: 0;
  position: relative;
}
.fillwidth-list .artwork-item-image-container .artwork-item-image-link {
  display: inline-block;
}
.fillwidth-list .artwork-item-image-container img {
  background-color: #f2f2f2;
}
.fillwidth-list .artwork-item-caption {
  bottom: 0;
  height: 90px;
  line-height: 1.2em;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-top: 15px;
  position: absolute;
}
.fillwidth-see-more {
  display: block;
  margin: 0 auto 20px auto;
  position: relative;
}
.profile-badge {
  display: block;
  text-decoration: none;
}
.profile-badge .profile-badge-icon {
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  background-size: contain;
}
.profile-badge .profile-badge-icon.is-user {
  border-radius: 50%;
}
.profile-badge .profile-badge-initials {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid #000;
}
.profile-badge .profile-badge-name {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
  text-align: left;
}
.profile-badge-small .profile-badge-icon,
.profile-badge-small .profile-badge-initials {
  height: 32px;
  width: 32px;
}
.profile-badge-small .profile-badge-icon.is-user[style*="original.jpg"],
.profile-badge-small .profile-badge-icon.is-user[style*="user_profile.png"] {
  border-radius: 16px;
}
.profile-badge-small .profile-badge-initials {
  font-size: 13px;
  line-height: 2.4;
}
.profile-badge-small .profile-badge-name {
  margin-top: 8px;
}
.partner-buttons-show-buttons .partner-buttons-contact {
  margin-left: 12px;
}
.bordered-pulldown-label {
  margin-right: 10px;
}
.bordered-pulldown-label.is-disabled {
  color: #e5e5e5;
}
.bordered-pulldown,
.bordered-scrollable-pulldown {
  display: inline-block;
  width: 200px;
  position: relative;
  border: 2px solid #e5e5e5;
  text-align: left;
  font-size: 17px;
}
.bordered-pulldown:hover > .bordered-pulldown-options,
.bordered-scrollable-pulldown:hover > .bordered-pulldown-options {
  display: block;
  border-color: #ccc;
}
.bordered-pulldown.is-disabled,
.bordered-scrollable-pulldown.is-disabled {
  pointer-events: none;
  cursor: pointer;
}
.bordered-pulldown.is-disabled .bordered-pulldown-toggle,
.bordered-scrollable-pulldown.is-disabled .bordered-pulldown-toggle {
  cursor: default;
  color: #e5e5e5;
}
.bordered-pulldown-toggle,
.bordered-pulldown-options > a {
  display: block;
  padding: 8px 10px 6px;
  text-decoration: none;
}
.bordered-pulldown-toggle > .bordered-pulldown-toggle-caret {
  float: right;
  padding-left: 5px;
  border-left: 1px solid #e5e5e5;
}
.bordered-pulldown-toggle > .bordered-pulldown-toggle-caret > .caret {
  display: inline-block;
  content: "";
  width: 0;
  height: 0;
  vertical-align: middle;
  border-top: 8px solid #ccc;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  margin: 2px 0 4px 4px;
}
.bordered-pulldown-options {
  display: none;
  position: absolute;
  background: #fff;
  border: 2px solid #e5e5e5;
  top: -2px;
  left: -2px;
  right: -2px;
  z-index: 2;
}
.bordered-pulldown-options > a {
  text-decoration: none;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.bordered-pulldown-options > a:hover {
  background-color: #f8f8f8;
}
.bordered-scrollable-pulldown > .bordered-pulldown-options {
  max-height: 245px;
  overflow-y: auto;
}
.toggle-list {
  position: relative;
}
.toggle-list > a:after {
  display: inline-block;
  content: "";
  width: 0;
  height: 0;
  vertical-align: middle;
  border-top: 8px solid #000;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  margin: 2px 0 4px 4px;
  margin-left: 0.5em;
}
.toggle-list-options {
  position: absolute;
  left: -20px;
  width: 200px;
  height: 200px;
  overflow-y: scroll;
  border: 2px solid #e5e5e5;
  background-color: #fff;
}
.toggle-list-option {
  display: block;
  padding: 8px 10px 6px;
  text-decoration: none;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.toggle-list-option:hover {
  background-color: #f8f8f8;
}
.toggle-list-options {
  visibility: hidden;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: all 0.0625s;
  -moz-transition: all 0.0625s;
  -o-transition: all 0.0625s;
  -ms-transition: all 0.0625s;
  transition: all 0.0625s;
  -webkit-transform: translateY(10px);
  -moz-transform: translateY(10px);
  -o-transform: translateY(10px);
  -ms-transform: translateY(10px);
  transform: translateY(10px);
  -webkit-transition-delay: 0.5s;
  -moz-transition-delay: 0.5s;
  -o-transition-delay: 0.5s;
  -ms-transition-delay: 0.5s;
  transition-delay: 0.5s;
}
.toggle-list:hover .toggle-list-options {
  visibility: visible;
  opacity: 1;
  -ms-filter: none;
  filter: none;
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -o-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0);
  -webkit-transition: all 0.125s;
  -moz-transition: all 0.125s;
  -o-transition: all 0.125s;
  -ms-transition: all 0.125s;
  transition: all 0.125s;
  -webkit-transition-delay: 0.25s;
  -moz-transition-delay: 0.25s;
  -o-transition-delay: 0.25s;
  -ms-transition-delay: 0.25s;
  transition-delay: 0.25s;
}
.popover-parent {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
}
.popover-parent:hover .popover {
  visibility: visible;
  opacity: 1;
  -ms-filter: none;
  filter: none;
  -webkit-transform: translateY(-10px);
  -moz-transform: translateY(-10px);
  -o-transform: translateY(-10px);
  -ms-transform: translateY(-10px);
  transform: translateY(-10px);
  -webkit-transition: all 0.125s;
  -moz-transition: all 0.125s;
  -o-transition: all 0.125s;
  -ms-transition: all 0.125s;
  transition: all 0.125s;
  -webkit-transition-delay: 0.25s;
  -moz-transition-delay: 0.25s;
  -o-transition-delay: 0.25s;
  -ms-transition-delay: 0.25s;
  transition-delay: 0.25s;
}
.popover {
  visibility: hidden;
  position: absolute;
  bottom: 100%;
  right: -20px;
  left: -20px;
  padding: 20px;
  pointer-events: none;
  background-color: #fff;
  text-align: left;
  border: 1px solid #e5e5e5;
  -webkit-box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.25);
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.25);
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: all 0.0625s;
  -moz-transition: all 0.0625s;
  -o-transition: all 0.0625s;
  -ms-transition: all 0.0625s;
  transition: all 0.0625s;
}
.popover:before,
.popover:after {
  top: 100%;
  left: 50%;
  position: absolute;
  z-index: 1;
  margin-left: -6px;
  content: "";
  background: transparent;
  border: 6px solid transparent;
  border-top-color: #e5e5e5;
}
.popover:after {
  border-top-color: #fff;
  margin-top: -1px;
}
.hover-pulldown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.hover-pulldown > a {
  text-decoration: none;
}
.hover-pulldown:not(.mlh-hamburger):not(.mlh-notification):not(.mlh-user-name):not(.artist-page-cta-overlay__feed__pulldown):before {
  display: block;
  position: absolute;
  content: "";
  top: 75%;
  left: 50%;
  margin-left: -4px;
  background: transparent;
  border: 4px solid transparent;
  border-top-color: #000;
  border-top-width: 6px;
}
.hover-pulldown:after {
  display: block;
  position: absolute;
  content: "";
  top: 100%;
  left: 50%;
  margin-left: -10px;
  background: transparent;
  border: 10px solid transparent;
  border-bottom-color: #000;
  border-bottom-width: 15px;
  visibility: hidden;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
}
.hover-pulldown[data-mode="touch"]:after,
.hover-pulldown[data-mode="touch"] .hover-pulldown-menu {
  -webkit-transition: none;
  -moz-transition: none;
  -o-transition: none;
  -ms-transition: none;
  transition: none;
}
.hover-pulldown[data-mode="touch"] .hover-pulldown-menu {
  margin-top: 24px;
}
.hover-pulldown[data-mode="hover"]:hover:not(.nohover):after,
.hover-pulldown[data-state="active"]:after,
.hover-pulldown[data-mode="hover"]:hover:not(.nohover) .hover-pulldown-menu,
.hover-pulldown[data-state="active"] .hover-pulldown-menu {
  opacity: 1;
  -ms-filter: none;
  filter: none;
  visibility: visible;
}
.hover-pulldown[data-state="static"]:after,
.hover-pulldown[data-state="static"] .hover-pulldown-static {
  opacity: 1;
  -ms-filter: none;
  filter: none;
  visibility: visible;
}
.hover-pulldown[data-state="static"][data-mode="hover"] .hover-pulldown-menu {
  -webkit-transition-delay: 0.25s;
  -moz-transition-delay: 0.25s;
  -o-transition-delay: 0.25s;
  -ms-transition-delay: 0.25s;
  transition-delay: 0.25s;
}
.hover-pulldown[data-anchor="right"] .hover-pulldown-menu,
.hover-pulldown[data-anchor="right"] .hover-pulldown-static {
  left: inherit;
  right: 0px;
}
.mlh-pulldown-top-link {
  display: none;
}
.mlh-pulldown-top-link-persistent {
  display: block;
}
@media (max-width: 900px) {
  .mlh-top-nav-link.magazine {
    display: none;
  }
  .mlh-pulldown-top-link.magazine {
    display: block;
  }
}
@media (max-width: 1200px) {
  .mlh-top-nav-link.galleries {
    display: none;
  }
  .mlh-pulldown-top-link.galleries {
    display: block;
  }
}
@media (max-width: 1425px) {
  .mlh-top-nav-link.fairs {
    display: none;
  }
  .mlh-pulldown-top-link.fairs {
    display: block;
  }
}
.hover-pulldown-menu > * {
  overflow-x: hidden;
}
.hover-pulldown-menu > *::-webkit-scrollbar {
  background-color: #000;
  width: 8px;
}
.hover-pulldown-menu > *::-webkit-scrollbar-corner {
  display: none;
}
.hover-pulldown-menu > *::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #333;
}
.hover-pulldown-menu,
.hover-pulldown-static {
  visibility: hidden;
  position: absolute;
  z-index: 800;
  width: 250px;
  left: 50%;
  top: 100%;
  margin-top: 25px;
  margin-left: -125px;
  padding: 25px 0 30px 0;
  text-align: left;
  background-color: #000;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
}
.hover-pulldown-menu .hpm-header,
.hover-pulldown-static .hpm-header {
  display: block;
  padding: 14.5px 30px;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11px;
  line-height: 1;
  color: #fff;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
}
.hover-pulldown-menu a,
.hover-pulldown-static a,
.hover-pulldown-static > span {
  padding: 11px 30px;
  line-height: 1;
  text-transform: none;
  letter-spacing: 0;
  color: #fff;
  text-decoration: none;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 18px;
}
.hover-pulldown-menu a:not(.mlh-pulldown-top-link),
.hover-pulldown-static a:not(.mlh-pulldown-top-link),
.hover-pulldown-static > span:not(.mlh-pulldown-top-link) {
  display: block;
}
.hover-pulldown-menu a:hover,
.hover-pulldown-static a:hover,
.hover-pulldown-static > span:hover {
  background-color: #333;
}
.hover-pulldown-menu .mlh-pulldown-top-link,
.hover-pulldown-static .mlh-pulldown-top-link,
.hover-pulldown-menu .mlh-pulldown-top-link-persistent,
.hover-pulldown-static .mlh-pulldown-top-link-persistent {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
}
.hover-pulldown-menu > hr,
.hover-pulldown-static > hr {
  height: 2px;
  margin: 19px 30px;
  background-color: #333;
}
.hover-pulldown-menu:before,
.hover-pulldown-static:before {
  display: block;
  position: absolute;
  content: "";
  height: 30px;
  right: 0;
  bottom: 100%;
  left: 0;
}
.hover-pulldown-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 790;
  height: 100vh;
}
@media (min-width: 550px) {
  .body-transparent-header-white .hover-pulldown {
    color: #fff;
  }
  .body-transparent-header-white .hover-pulldown svg {
    fill: #fff;
  }
  .body-transparent-header-white
    .hover-pulldown:not(.mlh-hamburger):not(.mlh-notification):not(.mlh-user-name):before {
    border-top-color: #fff;
  }
}
.hover-pulldown-static {
  padding: 25px 0;
}
.hover-pulldown-static > span {
  white-space: normal;
  line-height: 1.2;
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
}
.hover-pulldown-static > span:hover {
  background-color: transparent;
}
.hover-pulldown-static.is-fade-out > span {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
#hpm-bundles {
  overflow-y: scroll;
  max-height: 280px;
}
#hpm-bundles > a {
  padding: 0 0 0 30px;
}
.bundle-item {
  padding: 11px 0;
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 18px;
  line-height: 1;
  text-transform: none;
  letter-spacing: 0;
  color: #fff;
  text-decoration: none;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.bundle-item:hover {
  background-color: #333;
}
.bundle-image {
  width: 40px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;
}
.bundle-text {
  width: 170px;
  padding-left: 10px;
  display: inline-block;
  vertical-align: middle;
}
.bundle-information {
  display: inline-block;
  vertical-align: middle;
  height: 31px;
}
.bundle-message,
.bundle-date {
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #999;
}
.bundle-actors {
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #f8f8f8;
  max-width: 160px;
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.bundle-read-status {
  border-radius: 50%;
  background-color: #6e1fff;
  width: 10px;
  height: 10px;
  float: right;
  margin-top: 10px;
}
#unsupported-browser {
  text-align: center;
  width: 300px;
}
#unsupported-browser p {
  margin-bottom: 1em;
}
.unsupported-browser-artsy-logo {
  margin-top: 100px;
}
.unsupported-browser-message {
  font-size: 24px;
  margin: 50px 0 20px;
}
.unsupported-browser-recommendations {
  text-align: left;
  margin-bottom: 40px;
}
.unsupported-browser-recommendations a {
  display: inline-block;
  margin-bottom: 20px;
  text-align: center;
  width: 140px;
}
.unsupported-browser-recommendations a.unsupported-browser-update-first {
  margin-right: 20px;
}
#unsubscribe-page {
  width: 400px;
  margin: 120px auto;
}
#unsubscribe-page h1 {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 15px;
}
.consignments-header,
.consignments-footer {
  position: relative;
  padding: 30px;
  text-align: center;
  background-color: #000;
  color: #fff;
  height: 440px;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  background-repeat: none;
  background-position: right;
}
.consignments-header__consign-button,
.consignments-footer__consign-button {
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: #fff;
  color: #000;
  min-width: 195px;
}
.consignments-header__consign-button:hover,
.consignments-footer__consign-button:hover {
  color: #6e1fff;
  background-color: #fff;
}
.consignments-header__headline,
.consignments-footer__headline {
  max-width: 750px;
  margin-bottom: 15px;
  font-size: 50px;
  line-height: 1;
}
.consignments-header__subheadline,
.consignments-footer__subheadline {
  font-size: 25px;
  line-height: 1.4;
}
.consignments-header__cta,
.consignments-footer__cta {
  margin: 30px 0;
}
.consignments-header__cta > h3,
.consignments-footer__cta > h3 {
  margin: 15px 0;
  font-size: 15px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.consignments-header__cta input,
.consignments-footer__cta input {
  background-color: #fff;
}
.consignments-sections {
  text-align: center;
  margin: 0 auto;
}
.consignments-sections h4 {
  font-size: 30px;
  line-height: 1.25;
}
.consignments-section {
  padding: 60px 55px;
}
.consignments-section__content {
  margin: 0 auto;
  max-width: 1100px;
}
.consignments-section__consign-button.avant-garde-button-black {
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: #000;
  color: #fff;
  min-width: 195px;
  margin-top: 0px;
}
.consignments-section__consign-button.avant-garde-button-black:hover {
  color: #6e1fff;
}
.consignments-section__about__headline {
  margin-bottom: 38px;
  font-size: 50px;
  line-height: 1;
}
@media screen and (max-width: 768px) {
  .consignments-section__about__headline {
    font-size: 40px;
  }
}
.consignments-section__about__description {
  margin: 30px 0;
  font-size: 20px;
  line-height: 1.33;
}
.consignments-section__about__description:first-child {
  margin-top: 0;
}
.consignments-section__about__description:last-child {
  margin-bottom: 0;
}
.consignments-section__images > img {
  display: inline-block;
  max-width: 100%;
  vertical-align: bottom;
}
.consignments-section__images.consignments-section__images--logos {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: distribute;
  -moz-box-pack: distribute;
  -o-box-pack: distribute;
  -ms-flex-pack: distribute;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.consignments-section__images.consignments-section__images--logos img {
  display: block;
  height: auto;
  width: 100%;
}
.consignments-section__images__logo-wrap {
  width: 23%;
  max-width: 180px;
}
.consignments-steps {
  padding: 30px;
  border-bottom: 1px solid #e5e5e5;
}
.consignments-steps__headline {
  font-size: 37px;
  line-height: 1.2;
}
.consignments-steps__steps {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  max-width: 1100px;
  margin: 0 auto;
}
.consignments-steps__steps__step {
  text-align: center;
  max-width: 350px;
}
.consignments-steps__steps__step__image {
  max-width: 100%;
  display: inline-block;
  width: 80px;
  margin-bottom: 15px;
}
.consignments-steps__steps__step__title {
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.consignments-steps__steps__step__description {
  margin: 10px 0 20px;
}
.consignments-steps__steps__step__description > span {
  float: left;
  margin-right: 30px;
  font-size: 72px;
  line-height: 1;
}
.consignments-steps__steps__step__description > p {
  padding: 0 20px;
  font-size: 20px;
  line-height: 1.33;
}
.consignments-how-consignments-work {
  padding-top: 60px;
  padding-bottom: 60px;
}
.consignments-how-consignments-work .consignments-section__consign-button {
  margin-top: 20px;
}
.consignments-logos {
  background-color: #f8f8f8;
  padding-top: 60px;
  padding-bottom: 60px;
}
.consignments-logos .consignments-section__about__headline {
  margin-bottom: 60px;
}
.consignments-top-sales {
  margin-left: auto;
  margin-right: auto;
  max-width: 1100px;
}
.consignments-top-sales .consignments-section__about__headline {
  margin-bottom: 0px;
}
.consignments-top-sales
  .consignments-section__consign-button.avant-garde-button-black {
  margin-top: 35px;
}
.consignments-recently-sold {
  padding-top: 20px;
  max-width: 1700px;
  margin: 0 auto;
}
.consignments-recently-sold__artworks {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  overflow: hidden;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  height: 270px;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  padding-top: 10px;
}
.consignments-recently-sold__artworks__artwork {
  text-align: left;
  font-size: 13px;
  line-height: 1.5;
  color: #666;
  padding: 0 10px;
  padding-top: 20px;
  position: relative;
  height: 270px;
}
.consignments-recently-sold__artworks__artwork__data {
  padding-top: 10px;
  position: absolute;
  max-width: 100%;
  padding-right: 15px;
}
.consignments-recently-sold__artworks__artwork__data > * {
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.consignments-recently-sold__artworks__artwork__artists {
  font-weight: bold;
}
.consignments-recently-sold__artworks__artwork__title {
  font-style: italic;
}
.consignments-in-demand {
  padding-top: 20px;
  padding-bottom: 70px;
}
.consignments-in-demand h4 {
  padding-bottom: 15px;
}
.consignments-in-demand__artists {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  height: 415px;
  overflow: hidden;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.consignments-in-demand__artists__artist {
  padding: 15px;
}
.consignments-in-demand__artists__artist h4 {
  padding-top: 10px;
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  max-width: 150px;
}
.consignments-in-demand__artists img {
  width: 150px;
  height: 150px;
  -webkit-clip-path: circle(70px at center);
}
.consignments-upcoming-sales {
  height: 480px;
  color: #fff;
  padding-top: 60px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  background-position: right;
}
@media screen and (min-width: 641px) {
  .consignments-upcoming-sales--mobile {
    display: none;
  }
}
.consignments-upcoming-sales__content {
  min-width: 400px;
  text-align: left;
}
@media screen and (max-width: 960px) {
  .consignments-upcoming-sales__content {
    width: 100%;
    margin-left: 0px;
  }
}
.consignments-upcoming-sales__sales {
  max-width: 900px;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: start;
  -moz-box-align: start;
  -o-box-align: start;
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
}
.consignments-upcoming-sales__sales__sale,
.consignments-upcoming-sales__sales__button {
  width: 45%;
  min-width: 250px;
  padding-right: 10px;
  max-width: 420px;
}
.consignments-upcoming-sales__sales__sale {
  padding-bottom: 40px;
}
.consignments-upcoming-sales__sales__sale h5 {
  font-size: 13px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.consignments-upcoming-sales__sales__sale p {
  font-size: 20px;
  line-height: 1.33;
}
.consignments-section__questions {
  padding-top: 80px;
  padding-bottom: 70px;
  text-align: left;
}
.consignments-section__questions__button-wrapper {
  text-align: center;
}
@media screen and (min-width: 641px) {
  .consignments-section__questions__button-wrapper {
    display: none;
  }
}
.consignments-section__questions__header-section {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.consignments-section__questions__header-section .consignments-section__about,
.consignments-section__questions__header-section
  .consignments-section__questions__crt-photos {
  width: 45%;
  padding-right: 10px;
  max-width: 420px;
}
.consignments-section__questions__crt-photos {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
}
.consignments-section__questions__crt-photos__photo1,
.consignments-section__questions__crt-photos__photo2 {
  padding-right: 20px;
}
@media screen and (max-width: 768px) {
  .consignments-section__questions__crt-photos__photo1 {
    display: none;
  }
}
.consignments-section__questions__sections {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.consignments-section__questions__sections__section {
  width: 45%;
  padding-bottom: 40px;
  padding-right: 10px;
  max-width: 420px;
}
.consignments-section__questions__sections__section h4 {
  padding-bottom: 15px;
}
.consignments-faq {
  display: none;
}
.consignments-faq__modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.consignments-faq__contents {
  background-color: #fff;
  padding: 60px;
  min-width: 640px;
  max-width: 850px;
  width: 60%;
  height: 90%;
  position: relative;
  overflow-y: scroll;
}
.consignments-faq__close {
  position: absolute;
  right: 40px;
  top: 40px;
  fill: #ccc;
}
.consignments-faq__close:hover {
  cursor: pointer;
}
.consignments-faq__header {
  font-size: 37px;
  line-height: 1.2;
  margin-bottom: 44px;
}
.consignments-faq__item__question {
  font-size: 20px;
  line-height: 1.33;
}
.consignments-faq__item__answer {
  font-size: 17px;
  line-height: 1.5;
  margin-bottom: 20px;
}
.consignments-faq__contact-us {
  font-size: 17px;
  line-height: 1.5;
}
.consignments-layout-header {
  position: absolute;
  z-index: 100;
  margin: 30px;
}
.consignments-layout-header svg {
  fill: #fff;
}
@media (max-width: 768px) {
  .consignments-layout-header {
    margin: 20px;
  }
  .consignments-header__headline,
  .consignments-footer__headline {
    font-size: 40px;
  }
  .consignments-footer {
    display: none;
  }
  .consignments-section {
    padding: 60px 20px;
  }
  .consignments-section__about__headline {
    font-size: 30px;
  }
  .consignments-section__images.consignments-section__images--logos {
    -webkit-box-lines: multiple;
    -moz-box-lines: multiple;
    -o-box-lines: multiple;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .consignments-section__images.consignments-section__images--logos img {
    padding-bottom: 40px;
  }
  .consignments-section__images__logo-wrap {
    width: 50%;
    padding: 10px;
  }
  .consignments-steps__steps {
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -o-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .consignments-steps__steps__step__image {
    width: 48px;
  }
  .consignments-logos {
    padding-bottom: 0px;
  }
  .consignments-recently-sold {
    padding-top: 20px;
    max-width: 1700px;
    padding-bottom: 0px;
  }
  .consignments-recently-sold__artworks {
    height: 540px;
  }
  .consignments-recently-sold__artworks__artwork {
    max-width: 50%;
    width: 50%;
    padding-left: 2px;
    padding-right: 2px;
  }
  .consignments-recently-sold__artworks__artwork img {
    width: 100%;
  }
  .consignments-in-demand {
    padding-left: 10px;
    padding-right: 10px;
  }
  .consignments-in-demand__artists {
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -o-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .consignments-in-demand__artists__artist {
    padding: 15px 0px;
  }
  .consignments-upcoming-sales--desktop {
    display: none;
  }
  .consignments-upcoming-sales--mobile {
    height: 640px;
    padding-top: 0px;
    background-position: bottom;
  }
  .consignments-upcoming-sales--mobile .consignments-section__about__headline {
    text-align: center;
  }
  .consignments-upcoming-sales--mobile
    .consignments-upcoming-sales__sales__button {
    margin: 0 auto;
    margin-bottom: 30px;
    padding-right: 0px;
    text-align: center;
  }
  .consignments-upcoming-sales--mobile
    .consignments-upcoming-sales__sales__sale {
    padding-bottom: 25px;
  }
  .consignments-upcoming-sales--mobile .consignments-upcoming-sales__content {
    max-width: none;
    min-width: 0;
    padding-top: 28px;
  }
  .consignments-section__questions__header-section
    .consignments-section__about {
    width: 100%;
    text-align: center;
    padding-right: 0px;
  }
  .consignments-section__questions__crt-photos {
    display: none;
  }
  .consignments-section__questions__sections__section {
    width: 100%;
    padding-right: 0px;
  }
  .consignments-section__questions__sections__section h4 {
    font-size: 20px;
    line-height: 1.33;
    font-weight: bold;
  }
  .consignments-faq {
    display: none;
  }
  .consignments-faq__contents {
    width: 100%;
    height: 100%;
    min-width: 0;
    max-width: none;
    padding: 20px;
  }
  .consignments-faq__close {
    top: 15px;
    right: 15px;
  }
}
.consignments-submission-checkbox-input__label {
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-left: 10px;
}
.consignments-submission-checkbox-input__wrapper_error
  .artsy-checkbox--checkbox {
  background: #f7625a;
}
.consignments-submission-checkbox-input__wrapper_error
  .consignments-submission-checkbox-input__label
  span,
.consignments-submission-checkbox-input__wrapper_error
  .consignments-submission-checkbox-input__label
  a {
  color: #f7625a;
}
.consignments-submission-checkbox-input__error {
  font-size: 15px;
  line-height: 1.25;
  color: #f7625a;
  padding-top: 5px;
}
.consignments-submission-choose-artist__title {
  margin-top: 50px;
  text-align: center;
  font-size: 30px;
  line-height: 1.25;
  line-height: 1.1;
  margin-bottom: 30px;
}
.consignments-submission-choose-artist__form {
  max-width: 550px;
  margin: 0 auto;
}
.consignments-submission-choose-artist__next-button {
  width: 100%;
  margin-top: 20px !important;
}
.consignments-submission-choose-artist__next-button[disabled] {
  pointer-events: none;
  background-color: #fff;
  color: #ccc;
  border: 1px solid #ccc;
}
.consignments-submission-choose-artist__not-consigning {
  background-color: #fdefd1;
  margin-top: 23px;
  padding: 20px;
}
.consignments-submission-choose-artist__label {
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}
.consignments-submission-choose-artist__input {
  height: 40px;
  width: 100%;
}
.consignments-submission-choose-artist .react-autosuggest__suggestion {
  height: 60px;
  border: 1px solid #e5e5e5;
}
.consignments-submission-choose-artist .react-autosuggest__suggestion:hover {
  cursor: pointer;
  background-color: #f8f8f8;
}
.consignments-submission-choose-artist .autosuggest-suggestion {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 10px;
}
.consignments-submission-choose-artist .autosuggest-suggestion img {
  height: 40px;
  margin-right: 12px;
}
.consignments-submission-describe-work__title {
  margin-top: 50px;
  text-align: center;
  font-size: 30px;
  line-height: 1.25;
  line-height: 1.1;
  margin-bottom: 5px;
}
.consignments-submission-describe-work__subtitle {
  text-align: center;
  color: #999;
  margin-bottom: 37px;
}
.consignments-submission-describe-work__form {
  max-width: 550px;
  margin: 0 auto;
}
.consignments-submission-describe-work__next-button.avant-garde-button-black {
  height: 45px;
  margin-top: 0px;
  width: 100%;
  margin-bottom: 10px;
}
.consignments-submission-describe-work__next-button[disabled] {
  pointer-events: none;
  background-color: #fff;
  color: #ccc;
  border: 1px solid #ccc;
}
.consignments-submission-describe-work__input {
  height: 40px;
  width: 100%;
}
.consignments-submission-describe-work__label {
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}
.consignments-submission-describe-work__instructions {
  margin-bottom: 4px;
}
.consignments-submission-describe-work__error {
  color: #f7625a;
  text-align: center;
}
.consignments-submission-describe-work__row {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  padding-bottom: 27px;
}
.consignments-submission-describe-work__row_border-bottom {
  margin-bottom: 27px;
  border-bottom: 1px solid #e5e5e5;
}
.consignments-submission-describe-work__small-row {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  padding-bottom: 21px;
}
.consignments-submission-describe-work__small-row_border-bottom {
  margin-bottom: 21px;
  border-bottom: 1px solid #e5e5e5;
}
.consignments-submission-describe-work__row-item {
  margin-right: 30px;
  width: 100%;
}
.consignments-submission-describe-work__row-item:last-child {
  margin-right: 0px;
}
.consignments-submission-describe-work__row-item-1 {
  margin-right: 30px;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
}
.consignments-submission-describe-work__row-item-1:last-child {
  margin-right: 0px;
}
.consignments-submission-describe-work__row-item-3 {
  margin-right: 30px;
  -webkit-box-flex: 3;
  -moz-box-flex: 3;
  -o-box-flex: 3;
  -ms-box-flex: 3;
  box-flex: 3;
  -webkit-flex-grow: 3;
  flex-grow: 3;
}
.consignments-submission-describe-work__row-item-3:last-child {
  margin-right: 0px;
}
.consignments-submission-describe-work-mobile__title {
  margin-top: 50px;
  text-align: center;
  font-size: 30px;
  line-height: 1.25;
  line-height: 1.1;
  margin-bottom: 5px;
}
.consignments-submission-describe-work-mobile__form {
  max-width: 550px;
  margin: 0 auto;
  margin-top: 50px;
}
.consignments-submission-describe-work-mobile__next-button.avant-garde-button-black {
  height: 45px;
  margin-top: 0px;
  width: 100%;
  margin-bottom: 10px;
}
.consignments-submission-describe-work-mobile__next-button[disabled] {
  pointer-events: none;
  background-color: #fff;
  color: #ccc;
  border: 1px solid #ccc;
}
.consignments-submission-describe-work-mobile__input {
  height: 40px;
  width: 100%;
}
.consignments-submission-describe-work-mobile__label {
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}
.consignments-submission-describe-work-mobile__instructions {
  margin-bottom: 4px;
}
.consignments-submission-describe-work-mobile__error {
  color: #f7625a;
  text-align: center;
}
.consignments-submission-describe-work-mobile__row {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  padding-bottom: 27px;
}
.consignments-submission-describe-work-mobile__row_border-bottom {
  margin-bottom: 27px;
  border-bottom: 1px solid #e5e5e5;
}
.consignments-submission-describe-work-mobile__small-row {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  padding-bottom: 21px;
}
.consignments-submission-describe-work-mobile__small-row_border-bottom {
  margin-bottom: 21px;
  border-bottom: 1px solid #e5e5e5;
}
.consignments-submission-describe-work-mobile__row-item {
  margin-right: 30px;
  width: 100%;
}
.consignments-submission-describe-work-mobile__row-item:last-child {
  margin-right: 0px;
}
.consignments-location-input {
  position: relative;
}
.consignments-location-input input {
  height: 40px;
  width: 100%;
}
.consignments-location-input
  .react-autosuggest__container--open
  .consignments-location-input__error {
  display: none;
}
.consignments-location-input .react-autosuggest__suggestion {
  min-height: 40px;
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-top: none;
}
.consignments-location-input .react-autosuggest__suggestion:hover {
  cursor: pointer;
  background-color: #f8f8f8;
}
.consignments-location-input_disabled input {
  pointer-events: none;
  background-color: #f8f8f8;
}
.consignments-location-input_disabled input:focus,
.consignments-location-input_disabled input:active {
  border-color: #e5e5e5;
}
.consignments-location-input_error .bordered-input {
  border: 2px solid #f7625a;
}
.consignments-location-input .bordered-input:disabled {
  border: 2px solid #e5e5e5;
}
.consignments-location-input__unfreeze {
  position: absolute;
  right: 7px;
  top: 4px;
}
.consignments-location-input__unfreeze:hover {
  cursor: pointer;
}
.consignments-location-input__unfreeze svg {
  width: 17px;
  fill: #999;
}
.consignments-location-input__error {
  font-size: 15px;
  line-height: 1.25;
  color: #f7625a;
  padding-top: 5px;
}
.consignments-submission-radio-input {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.consignments-submission-radio-input__label {
  width: 60%;
}
.consignments-submission-radio-input__radio-buttons {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
}
.consignments-submission-radio-input__radio-button {
  margin-right: 20px;
  position: relative;
}
.consignments-submission-radio-input__radio-button:last-child {
  margin-right: 0px;
}
.consignments-submission-radio-input__button {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  z-index: -1;
}
.consignments-submission-radio-input__button-label {
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
}
.consignments-submission-radio-input__button-control {
  position: absolute;
  top: 2px;
  left: -12px;
  width: 18px;
  height: 18px;
  border: 2px solid #e5e5e5;
  border-radius: 50%;
}
.consignments-submission-radio-input__button-control:hover {
  cursor: pointer;
}
.consignments-submission-radio-input__button-control_checked:after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  top: 3px;
  left: 3px;
  background-color: #000;
  border-radius: 50%;
}
.consignments-submission-select-input__label {
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}
.consignments-submission-select-input__select {
  height: 40px;
  width: 100%;
}
.consignments-submission-select-input select {
  width: 100%;
}
.consignments-submission-select-input .bordered-pulldown-toggle-caret {
  border-left: none;
}
.consignments-step-marker {
  margin-top: 80px;
  margin-bottom: 100px;
  margin-left: 50px;
  margin-right: 50px;
}
.consignments-step-marker_mobile {
  margin-top: 60px;
  margin-left: 30px;
  margin-right: 30px;
}
.consignments-step-marker__steps ul {
  max-width: 750px;
  margin: 0 auto;
  -ms-flex-line-pack: center;
  -webkit-align-content: center;
  align-content: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: distribute;
  -moz-box-pack: distribute;
  -o-box-pack: distribute;
  -ms-flex-pack: distribute;
  -webkit-justify-content: space-around;
  justify-content: space-around;
}
.consignments-step-marker__label {
  color: #6e1fff;
  position: absolute;
  text-align: center;
  width: 200px;
  top: 18px;
  left: -93px;
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
@media (max-width: 960px) {
  .consignments-step-marker__label {
    width: 90px;
    left: -42px;
  }
}
.consignments-step-marker__step {
  content: " ";
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  margin: 0;
  position: relative;
  text-align: right;
  z-index: -1;
  border: 1px dashed #6e1fff;
}
.consignments-step-marker__step::before {
  background: #6e1fff;
  border-radius: 50%;
  height: 12px;
  position: absolute;
  text-align: center;
  top: -6px;
  width: 12px;
  left: -2px;
  content: " ";
}
.consignments-step-marker__step:last-child {
  -webkit-flex-basis: 0;
  flex-basis: 0;
  -webkit-box-flex: 0;
  -moz-box-flex: 0;
  -o-box-flex: 0;
  -ms-box-flex: 0;
  box-flex: 0;
  -webkit-flex-grow: 0;
  flex-grow: 0;
  -webkit-flex-shrink: 1;
  flex-shrink: 1;
}
.consignments-step-marker__step_active {
  border: 1px dashed #e5e5e5;
}
.consignments-step-marker__step_active::before {
  background: #6e1fff;
}
.consignments-step-marker__step_active .consignments-step-marker__label {
  color: #6e1fff;
}
.consignments-step-marker__step_active ~ li {
  border: 1px dashed #e5e5e5;
}
.consignments-step-marker__step_active ~ li .consignments-step-marker__label {
  color: #e5e5e5;
}
.consignments-step-marker__step_active ~ li::before {
  border: 1px dashed #e5e5e5;
  background: #e5e5e5;
}
.consignments-submission-flow {
  margin-top: -20px;
  padding-bottom: 30px;
}
.consignments-submission-text-input_error .bordered-input {
  border: 2px solid #f7625a;
}
.consignments-submission-text-input__label {
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}
.consignments-submission-text-input__instructions {
  margin-bottom: 4px;
}
.consignments-submission-text-input__input {
  height: 40px;
  width: 100%;
}
.consignments-submission-text-input__warning {
  font-size: 15px;
  line-height: 1.25;
  color: #f7625a;
  padding-top: 5px;
}
.consignments-submission-text-input__error {
  font-size: 15px;
  line-height: 1.25;
  color: #f7625a;
  padding-top: 5px;
}
.consignments-submission-thank-you {
  max-width: 1125px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 100px;
}
.consignments-submission-thank-you__submitted-work {
  width: 100%;
  background-color: #f8f8f8;
  height: 120px;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.consignments-submission-thank-you__submitted-message {
  font-size: 20px;
  line-height: 1.33;
  margin-right: 20px;
}
.consignments-submission-thank-you__submitted-image img {
  max-height: 68px;
  margin-left: 40px;
  margin-right: 40px;
}
.consignments-submission-thank-you__icon-check {
  padding-right: 10px;
}
.consignments-submission-thank-you__title {
  font-size: 50px;
  line-height: 1;
  margin-top: 75px;
  margin-bottom: 60px;
}
.consignments-submission-thank-you__next-steps {
  margin: 0 auto;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.consignments-submission-thank-you__next-steps > * {
  max-width: 290px;
}
.consignments-submission-thank-you__step-icon {
  height: 120px;
}
.consignments-submission-thank-you__instructions {
  font-size: 20px;
  line-height: 1.33;
  margin-top: 22px;
}
.consignments-submission-thank-you__personalize-button {
  margin-top: 145px;
  width: 60%;
}
.consignments-submission-thank-you_mobile
  .consignments-submission-thank-you__title {
  font-size: 30px;
  line-height: 1.25;
  margin-top: 30px;
  margin-bottom: 30px;
}
.consignments-submission-thank-you_mobile
  .consignments-submission-thank-you__submitted-image
  img {
  margin-left: 20px;
  margin-right: 10px;
}
.consignments-submission-thank-you_mobile
  .consignments-submission-thank-you__personalize-button {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
}
.consignments-submission-thank-you_mobile
  .consignments-submission-thank-you__next-steps {
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.consignments-submission-thank-you_mobile
  .consignments-submission-thank-you__next-steps
  > * {
  margin: 0 auto;
  margin-top: 30px;
  width: 100%;
}
.consignments-submission-upload-photo__title {
  margin-top: 50px;
  text-align: center;
  font-size: 30px;
  line-height: 1.25;
  line-height: 1.1;
  margin-bottom: 5px;
}
.consignments-submission-upload-photo__subtitle {
  text-align: center;
  color: #999;
  margin: 0 auto;
  margin-bottom: 37px;
  max-width: 550px;
}
.consignments-submission-upload-photo__form {
  max-width: 550px;
  margin: 0 auto;
}
.consignments-submission-upload-photo__submit-button {
  height: 45px;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 10px;
}
.consignments-submission-upload-photo__submit-button[disabled] {
  pointer-events: none;
  background-color: #fff;
  color: #ccc;
  border: 1px solid #ccc;
}
.consignments-submission-upload-photo__drop-area {
  border: 1px dashed #000;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 124px;
  width: 100%;
  margin-bottom: 30px;
}
.consignments-submission-upload-photo__drop-area:hover {
  border-color: #6e1fff;
  cursor: pointer;
  color: #6e1fff;
}
.consignments-submission-upload-photo__drop-area:hover g {
  fill: #6e1fff;
}
.consignments-submission-upload-photo__drop-area-contents {
  text-align: center;
}
.consignments-submission-upload-photo__camera-icon svg {
  width: 23px;
}
.consignments-submission-upload-photo__cta {
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.consignments-submission-upload-photo__file-upload {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.consignments-submission-upload-photo__error {
  color: #f7625a;
  text-align: center;
}
.consignments-submission-upload-photo-landing__title {
  text-align: center;
  font-size: 50px;
  margin-bottom: 50px;
  line-height: 1.1;
}
.consignments-submission-upload-photo-landing__step-form {
  max-width: 550px;
  margin: 0 auto;
}
.consignments-submission-upload-photo-landing_mobile
  .consignments-submission-upload-photo-landing__title {
  display: none;
}
.consignments-submission-upload-photo-landing .avant-garde-button-black {
  margin-top: 40px;
  font-size: 11px;
  line-height: 1.33;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-top: 12px;
  padding-bottom: 12px;
}
.consignments-submission-uploaded-image__image-wrapper {
  padding-right: 30px;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  border: 2px solid #e5e5e5;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 84px;
  width: 100%;
  margin-top: 20px;
}
.consignments-submission-uploaded-image__image-wrapper_processing {
  opacity: 0.15;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=15)";
  filter: alpha(opacity=15);
}
.consignments-submission-uploaded-image__image {
  height: 60px;
  max-width: 300px;
  margin-left: 25px;
  margin-right: 30px;
}
.consignments-submission-uploaded-image__filename {
  color: #999;
}
.consignments-submission-uploaded-image__progress-wrapper {
  background-color: #e5e5e5;
  height: 2px;
  width: 100%;
}
.consignments-submission-uploaded-image__progress {
  height: 2px;
  background-color: #6e1fff;
}
.consignments-submission-uploaded-image__error {
  margin-top: 20px;
  color: #f7625a;
  text-align: center;
  width: 100%;
  border: 1px solid #f7625a;
  background-color: #fff1f0;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  text-align: left;
  padding-left: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.consignments-submission-uploaded-image__error-alert {
  padding-right: 20px;
}
.consignments-submission-uploaded-image__error-close {
  margin-right: 20px;
}
.consignments-submission-uploaded-image__error-close:hover {
  cursor: pointer;
}
.consignments-submission-uploaded-image__error-close svg {
  fill: #f7625a;
  width: 20px;
  height: 20px;
}
.consignments-submission-uploaded-image__error-content a {
  color: #f7625a;
  text-decoration: underline;
}
.consignments-submission-body #main-layout-header {
  overflow: hidden;
}
@media (max-width: 768px) {
  .consignments-submission-body #main-layout-header {
    height: 53px;
    overflow: hidden;
  }
  .consignments-submission-body #main-layout-header #main-header-search-form,
  .consignments-submission-body #main-layout-header #main-header-search-button {
    display: none;
  }
}
.consignments-submission-body .mlh-notification {
  display: none;
}
.consignments-submission-body .consignments-submission {
  min-height: -webkit-calc(100vh - 230px);
  min-height: -moz-calc(100vh - 230px);
  min-height: -ms-calc(100vh - 230px);
  min-height: -o-calc(100vh - 230px);
  min-height: calc(100vh - 230px);
}
.consignments-submission-body
  .consignments-submission
  #consignments-submission__flow {
  margin-bottom: 50px;
}
.consignments-submission-body .consignments-submission__footer {
  position: absolute;
  left: 0;
  right: 0;
  background-color: #fff;
}
@media (max-width: 768px) {
  .consignments-submission-body .consignments-submission__footer {
    display: none;
  }
}
.consignments-submission-body .consignments-submission__footer-contents {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid #e5e5e5;
}
.artwork-columns {
  width: 100%;
}
.artwork-columns-double .artwork-columns-column {
  width: 50%;
}
.artwork-columns-double .artwork-columns-column .artwork-columns-artwork {
  margin: 0;
}
.artwork-columns-double
  .artwork-columns-column:nth-child(1)
  .artwork-columns-artwork {
  margin-right: 10px;
}
.artwork-columns-double
  .artwork-columns-column:nth-child(2)
  .artwork-columns-artwork {
  margin-left: 10px;
}
.artwork-columns-triple .artwork-columns-column {
  width: 33.33%;
}
.artwork-columns-triple
  .artwork-columns-column:nth-child(1)
  .artwork-columns-artwork {
  margin: 0 10px 0 0;
}
.artwork-columns-triple
  .artwork-columns-column:nth-child(2)
  .artwork-columns-artwork {
  margin: 0 10px;
}
.artwork-columns-triple
  .artwork-columns-column:nth-child(3)
  .artwork-columns-artwork {
  margin: 0 0 0 10px;
}
.artwork-columns-column {
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
}
.artwork-columns-artwork img {
  display: block;
  width: 100%;
}
.artwork-columns-artwork-details {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: normal;
  margin: 10px 0 20px 0;
  color: #666;
}
@media (min-width: 768px) {
  .artwork-columns-artwork-details {
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
  }
}
.artwork-columns-artwork-details p {
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.artwork-columns-artwork-details p:first-of-type {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: bold;
  color: #000;
}
@media (min-width: 768px) {
  .artwork-columns-artwork-details p:first-of-type {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
  }
}
.artwork-columns-artwork-details__auction-lot-number {
  color: #000;
}
.artwork-columns-artwork-details__buy-now,
.artwork-columns-artwork-details__bid {
  color: #000;
}
.artwork-columns-artwork-details > a {
  color: #666;
  text-decoration: underline;
}
.artwork_column__contact-gallery {
  color: #666;
}
.artwork-columns-artwork-details__bid-now {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
}
.artwork-columns-artwork-details__bid-now p.bid-now-link {
  line-height: 1.5;
  margin-left: -3px;
  text-decoration: underline;
}
.artwork-columns-artwork-details__bid-now:before {
  content: "";
  background-image: url("/images/paddle.png");
  background-repeat: no-repeat;
  background-position: 0 2px;
  -webkit-background-size: 63%;
  -moz-background-size: 63%;
  background-size: 63%;
  padding-right: 14px;
  margin-top: 1px;
  height: 16px;
}
#notifications-page.mobile {
  padding-top: 40px;
}
#notifications-page.mobile .notifications-header {
  margin-bottom: 30px;
  text-align: center;
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 28px;
  line-height: 1.25;
  letter-spacing: -0.02em;
  font-weight: normal;
}
@media (min-width: 768px) {
  #notifications-page.mobile .notifications-header {
    font-size: 32px;
    line-height: 1.25;
    letter-spacing: -0.02em;
    font-weight: normal;
  }
}
#notifications-page.mobile #notifications-published-artworks {
  margin-top: 20px;
}
#notifications-page.mobile .notifications-list-item {
  border-top: 1px solid #e5e5e5;
  padding-top: 20px;
  margin-bottom: 20px;
}
#notifications-page.mobile .notifications-list-item .notifications-artist-link {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: bold;
  margin-bottom: 20px;
  text-decoration: none;
}
@media (min-width: 768px) {
  #notifications-page.mobile
    .notifications-list-item
    .notifications-artist-link {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
  }
}
#notifications-page.mobile .notifications-list-item .notifications-works-added {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  font-weight: normal;
  margin-bottom: 15px;
  color: #666;
}
@media (min-width: 768px) {
  #notifications-page.mobile
    .notifications-list-item
    .notifications-works-added {
    font-size: 13px;
    line-height: 1.5;
    font-weight: normal;
  }
}
#notifications-page.mobile
  .notifications-list-item
  .notifications-publish-date {
  float: right;
  text-transform: none;
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: normal;
  color: #666;
}
@media (min-width: 768px) {
  #notifications-page.mobile
    .notifications-list-item
    .notifications-publish-date {
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
  }
}
#notifications-page.mobile .notifications-see-more {
  text-align: right;
  margin: 20px 0 20px 0;
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  font-weight: normal;
}
@media (min-width: 768px) {
  #notifications-page.mobile .notifications-see-more {
    font-size: 13px;
    line-height: 1.5;
    font-weight: normal;
  }
}
#notifications-page.mobile .notifications-see-more a {
  text-decoration: none;
}
#notifications-page.mobile .artwork-columns {
  width: 100%;
}
#notifications-page.mobile .artwork-columns-double .artwork-columns-column {
  width: 50%;
}
#notifications-page.mobile
  .artwork-columns-double
  .artwork-columns-column
  .artwork-columns-artwork {
  margin: 0;
}
#notifications-page.mobile
  .artwork-columns-double
  .artwork-columns-column:nth-child(1)
  .artwork-columns-artwork {
  margin-right: 10px;
}
#notifications-page.mobile
  .artwork-columns-double
  .artwork-columns-column:nth-child(2)
  .artwork-columns-artwork {
  margin-left: 10px;
}
#notifications-page.mobile .artwork-columns-triple .artwork-columns-column {
  width: 33.33%;
}
#notifications-page.mobile
  .artwork-columns-triple
  .artwork-columns-column:nth-child(1)
  .artwork-columns-artwork {
  margin: 0 10px 0 0;
}
#notifications-page.mobile
  .artwork-columns-triple
  .artwork-columns-column:nth-child(2)
  .artwork-columns-artwork {
  margin: 0 10px;
}
#notifications-page.mobile
  .artwork-columns-triple
  .artwork-columns-column:nth-child(3)
  .artwork-columns-artwork {
  margin: 0 0 0 10px;
}
#notifications-page.mobile .artwork-columns-column {
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
}
#notifications-page.mobile .artwork-columns-artwork img {
  display: block;
  width: 100%;
}
#notifications-page.mobile .artwork-columns-artwork-details {
  margin: 10px 0 20px 0;
}
#notifications-page {
  padding-top: 50px;
  margin-bottom: 100px;
}
#notifications-page[data-forsale="true"]
  .filter-artist-published-artworks-count {
  display: none;
}
#notifications-page[data-forsale="false"]
  .filter-artist-forsale-artworks-count {
  display: none;
}
#notifications-header {
  margin-bottom: 40px;
}
#notifications-header h1 {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 28px;
  line-height: 1.25;
  letter-spacing: -0.02em;
  font-weight: normal;
}
@media (min-width: 768px) {
  #notifications-header h1 {
    font-size: 32px;
    line-height: 1.25;
    letter-spacing: -0.02em;
    font-weight: normal;
  }
}
#notifications-react-headline {
  margin-left: 250px;
  font-size: 25px;
  display: none;
}
#notifications-filter {
  position: absolute;
  width: 250px;
  padding-right: 40px;
}
#notifications-filter .artsy-checkbox {
  display: block;
  padding-bottom: 36px;
}
#notifications-filter .artsy-checkbox .artsy-checkbox--label {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: normal;
}
@media (min-width: 768px) {
  #notifications-filter .artsy-checkbox .artsy-checkbox--label {
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
  }
}
#notifications-filter .filter-artist {
  display: block;
  margin-bottom: 10px;
}
#notifications-filter .filter-artist-published-artworks-count,
#notifications-filter .filter-artist-forsale-artworks-count {
  display: inline;
  color: #666;
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: normal;
}
@media (min-width: 768px) {
  #notifications-filter .filter-artist-published-artworks-count,
  #notifications-filter .filter-artist-forsale-artworks-count {
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
  }
}
#notifications-filter .filter-artist-name {
  text-decoration: none;
  display: inline;
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: normal;
}
@media (min-width: 768px) {
  #notifications-filter .filter-artist-name {
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
  }
}
#notifications-filter .filter-artist-clear {
  display: none;
}
#notifications-filter
  .filter-artist[data-state="selected"]
  .filter-artist-clear {
  display: inline;
  text-decoration: underline;
  cursor: pointer;
}
#notifications-filter .filter-artist[data-state="selected"] .filter-artist-name,
#notifications-filter
  .filter-artist[data-state="selected"]
  .filter-artist-count,
#notifications-filter
  .filter-artist[data-state="selected"]
  .filter-artist-clear {
  color: #6e1fff;
}
.artist-clear {
  float: right;
  text-decoration: underline;
  cursor: pointer;
}
#notifications-react-works {
  width: 900px;
  margin-left: 250px;
}
#notifications-react-works {
  padding-top: 2px;
}
.notifications-search-header {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  font-weight: normal;
  margin: 40px 0 20px 0;
}
@media (min-width: 768px) {
  .notifications-search-header {
    font-size: 12px;
    line-height: 1.5;
    font-weight: normal;
  }
}
#notifications-search-container {
  margin-bottom: 50px;
}
.google-maps-places-input {
  border: none;
  -webkit-box-shadow: inset 0 0 0 2px #e5e5e5;
  box-shadow: inset 0 0 0 2px #e5e5e5;
  padding: 12px;
  -webkit-transition: box-shadow 0.25s;
  -moz-transition: box-shadow 0.25s;
  -o-transition: box-shadow 0.25s;
  -ms-transition: box-shadow 0.25s;
  transition: box-shadow 0.25s;
}
.google-maps-places-input:focus {
  -webkit-transition: box-shadow 0.25s;
  -moz-transition: box-shadow 0.25s;
  -o-transition: box-shadow 0.25s;
  -ms-transition: box-shadow 0.25s;
  transition: box-shadow 0.25s;
  -webkit-box-shadow: inset 0 0 0 2px #6e1fff;
  box-shadow: inset 0 0 0 2px #6e1fff;
}
form.is-validated .google-maps-places-input:invalid {
  -webkit-box-shadow: inset 0 0 0 2px #f7625a;
  box-shadow: inset 0 0 0 2px #f7625a;
}
.pac-container {
  position: relative;
  -webkit-box-shadow: none;
  box-shadow: none;
  border: 2px solid #6e1fff;
  border-top: 0;
  border-radius: 0;
  z-index: 1070;
}
.pac-container:after {
  padding: 20px 0;
  background-position: 100% 50%;
  margin-right: 10px;
}
.pac-item {
  position: relative;
  padding: 10px;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  border-color: #e5e5e5;
}
.pac-item:first-child {
  border-top: none;
}
.pac-item:last-child {
  border-bottom: 1px solid #e5e5e5;
}
.pac-item:hover {
  background-color: #f8f8f8;
}
.pac-item.pac-item-selected {
  border-color: transparent;
  background-color: #000;
}
.pac-item.pac-item-selected > .pac-item-query {
  color: #fff;
}
.pac-item,
.pac-item-query {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  -ms-font-smoothing: antialiased;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  font-size: 17px;
}
.user-interests-results {
  margin: 10px 0;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.user-interests-results.is-fade-in {
  -webkit-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  -ms-transition: opacity 0.5s;
  transition: opacity 0.5s;
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.user-interests-results:empty {
  display: none;
}
.user-interests-results .results-list-item:first-child {
  border-top: none;
}
.user-interest-remove {
  padding: 10px 10px 10px 20px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  line-height: 14px;
}
.user-interest-remove:before {

}
.user-interest-remove:hover:before {
  color: #f7625a;
  -webkit-text-stroke-width: 1px;
  -moz-text-stroke-width: 1px;
  -o-text-stroke-width: 1px;
  -ms-text-stroke-width: 1px;
  text-stroke-width: 1px;

}
.settings-tabs {
  zoom: 1;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  margin: 30px 0 0 0;
}
.settings-tabs:before,
.settings-tabs:after {
  content: "";
  display: table;
}
.settings-tabs:after {
  clear: both;
}
.settings-tabs__tab {
  display: block;
  float: left;
  font-size: 13px;
  line-height: 1.33;
  padding: 15px;
  color: #666;
  border-bottom: 2px solid #e5e5e5;
  -webkit-transition: color 0.25s, border-color 0.25s;
  -moz-transition: color 0.25s, border-color 0.25s;
  -o-transition: color 0.25s, border-color 0.25s;
  -ms-transition: color 0.25s, border-color 0.25s;
  transition: color 0.25s, border-color 0.25s;
  text-decoration: none;
}
.settings-tabs__tab:hover,
.settings-tabs__tab[data-state="active"] {
  color: #000;
  border-bottom-color: #666;
}
.settings-tabs__tab:first-child {
  padding-left: 0;
}
@media screen and (max-width: 768px) {
  .settings-tabs {
    overflow-x: scroll;
    position: relative;
    margin-right: -40px;
  }
  .settings-tabs::after {
    content: "";
    display: block;
    min-width: 40px;
  }
}
.settings-delete-my-account label:first-child {
  margin-left: 0;
}
.settings-split {
  display: table;
  width: 100%;
  margin: 30px 0;
}
.settings-split:first-child {
  margin-top: 0;
}
.settings-split:last-child {
  margin-bottom: 0;
}
.settings-split__left {
  padding-right: 15px;
}
.settings-split__right {
  text-align: right;
}
.settings-split__left,
.settings-split__right {
  display: table-cell;
  vertical-align: top;
}
.settings-about-you__advanced-settings .settings-split {
  margin-top: 15px;
}
.settings-about-you__advanced-settings label:first-child {
  margin-left: 0;
}
.artists-you-collect__description {
  margin: 15px 0;
  font-size: 17px;
  line-height: 1.5;
}
.artists-you-collect__description:first-child {
  margin-top: 0;
}
.artists-you-collect__description:last-child {
  margin-bottom: 0;
}
.settings-gallery-intro__preview {
  position: relative;
  margin: 15px 0;
  font-size: 20px;
  line-height: 1.33;
  color: #666;
}
.settings-gallery-intro__preview:first-child {
  margin-top: 0;
}
.settings-gallery-intro__preview:last-child {
  margin-bottom: 0;
}
.settings-quasi-infinite__total {
  position: absolute;
  top: 30px;
  right: 0;
  font-size: 17px;
  line-height: 1.5;
  color: #999;
  text-transform: capitalize;
}
.settings-quasi-infinite__more {
  margin: 30px 0;
  text-align: center;
}
.settings-quasi-infinite__more:first-child {
  margin-top: 0;
}
.settings-quasi-infinite__more:last-child {
  margin-bottom: 0;
}
.settings-section:first-child .settings-quasi-infinite__total {
  top: 0;
}
.artist-fillwidth-list-item {
  position: relative;
  min-height: 200px;
  margin: 20px 0;
}
.artist-fillwidth-list-item:first-child {
  margin-top: 0;
}
.artist-fillwidth-list-item:last-child {
  margin-bottom: 0;
}
.artist-fillwidth-list-item h4 {
  display: inline-block;
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  -ms-font-smoothing: antialiased;
  font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
  margin-bottom: 20px;
}
.artist-fillwidth-list-item .plus-follow-button {
  margin-left: 10px;
}
.artist-fillwidth-list-artworks img {
  max-height: 180px !important;
}
.artist-fillwidth-list-see-more {
  text-align: center;
  margin-top: 40px;
}
.settings-artists .artist-fillwidth-list-see-more {
  display: none;
}
.loading-spinner,
.loading-spinner-white {
  background: #000;
  width: 25px;
  height: 6px;
  position: absolute;
  top: calc(50% - 6px / 2);
  left: calc(50% - 25px / 2);
  -webkit-animation: spin 1s infinite linear;
  -moz-animation: spin 1s infinite linear;
  -o-animation: spin 1s infinite linear;
  -ms-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
.loading-spinner-small,
.loading-spinner-small-white {
  background: #000;
  width: 20px;
  height: 4px;
  position: absolute;
  top: calc(50% - 4px / 2);
  left: calc(50% - 20px / 2);
  -webkit-animation: spin 1s infinite linear;
  -moz-animation: spin 1s infinite linear;
  -o-animation: spin 1s infinite linear;
  -ms-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
.loading-spinner-white {
  background: #fff;
}
.loading-spinner-small-white {
  background: #fff;
}
.loading-ellipsis > span {
  letter-spacing: 2px;
}
.loading-ellipsis > span:nth-child(1) {
  -webkit-animation: fade 1s infinite;
  -moz-animation: fade 1s infinite;
  -o-animation: fade 1s infinite;
  -ms-animation: fade 1s infinite;
  animation: fade 1s infinite;
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  -ms-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.loading-ellipsis > span:nth-child(2) {
  -webkit-animation: fade 1s infinite;
  -moz-animation: fade 1s infinite;
  -o-animation: fade 1s infinite;
  -ms-animation: fade 1s infinite;
  animation: fade 1s infinite;
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  -o-animation-delay: 0.4s;
  -ms-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.loading-ellipsis > span:nth-child(3) {
  -webkit-animation: fade 1s infinite;
  -moz-animation: fade 1s infinite;
  -o-animation: fade 1s infinite;
  -ms-animation: fade 1s infinite;
  animation: fade 1s infinite;
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  -o-animation-delay: 0.6s;
  -ms-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
@-moz-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes fade {
  0% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
}
@-webkit-keyframes fade {
  0% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
}
@-o-keyframes fade {
  0% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
}
@keyframes fade {
  0% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
}
.settings-categories__following__category__follow {
  margin-bottom: 15px;
}
.settings-categories__following__category__follow > .entity-link {
  font-size: 13px;
  line-height: 1.33;
}
.settings-categories__following__category__artworks[data-state="loading"] {
  position: relative;
  height: 200px;
}
.settings-categories__following__category__artworks[data-state="loading"]:after {
  display: block;
  content: "";
  background: #000;
  width: 25px;
  height: 6px;
  position: absolute;
  top: calc(50% - 6px / 2);
  left: calc(50% - 25px / 2);
  -webkit-animation: spin 1s infinite linear;
  -moz-animation: spin 1s infinite linear;
  -o-animation: spin 1s infinite linear;
  -ms-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
.settings-galleries-institutions__profile {
  width: 50%;
  display: table;
  table-layout: fixed;
  float: left;
  margin-bottom: 30px;
}
.settings-galleries-institutions__profile__icon,
.settings-galleries-institutions__profile__metadata {
  display: table-cell;
}
.settings-galleries-institutions__profile__icon {
  width: 90px;
  height: 90px;
  background-color: #fff;
  background-position: center center;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  background-size: contain;
  background-repeat: no-repeat;
  border: 1px solid #e5e5e5;
}
.settings-galleries-institutions__profile__metadata {
  padding-left: 15px;
}
.settings-galleries-institutions__profile__metadata__name {
  display: block;
  font-size: 13px;
  line-height: 1.33;
  text-decoration: none;
}
.settings-galleries-institutions__profile__metadata__follow {
  margin-left: -8px;
}
.settings-page__saves > .settings-section {
  width: 100%;
}
.settings-password__form {
  display: none;
}
.settings-linked-accounts__service {
  margin: 30px 0;
}
.settings-linked-accounts__service:first-child {
  margin-top: 0;
}
.settings-linked-accounts__service:last-child {
  margin-bottom: 0;
}
.settings-linked-accounts__service #apple-svg-icon,
.settings-linked-accounts__service #facebook-svg-icon {
  vertical-align: -3px;
  margin: 0 15px 0px -5px;
}
.settings-linked-accounts__service svg {
  height: 16px;
  width: 16px;
}
.settings-linked-accounts__service__name {
  font-size: 13px;
  line-height: 1.33;
  margin-bottom: 5px;
}
.settings-linked-accounts__service__description {
  font-size: 17px;
  line-height: 1.5;
}
.settings-linked-accounts__service__toggle:after {
  content: "Connect";
}
.settings-linked-accounts__service__toggle[data-connected="disconnected"]:hover
  svg {
  fill: #6e1fff;
}
.settings-linked-accounts__service__toggle[data-connected="connected"]:after {
  content: "Connected";
}
.settings-linked-accounts__service__toggle[data-connected="connected"]:hover {
  color: #f7625a;
}
.settings-linked-accounts__service__toggle[data-connected="connected"]:hover
  svg {
  fill: #f7625a;
}
.settings-linked-accounts__service__toggle[data-connected="connected"]:hover:after {
  content: "Disconnect";
}
.settings-email-preferences label:first-child {
  margin-left: 0;
}
.settings-email-preferences__subscriptions {
  padding-left: 30px;
  border-left: 1px solid #e5e5e5;
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
}
.settings-email-preferences[data-enabled="false"]
  .settings-email-preferences__subscriptions {
  opacity: 0.5;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
  filter: alpha(opacity=50);
}
.bid-status p {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  font-weight: normal;
  color: #e82f1d;
}
@media (min-width: 768px) {
  .bid-status p {
    font-size: 12px;
    line-height: 1.5;
    font-weight: normal;
  }
}
.bid-status__is-winning p {
  color: #217c44;
}
.bid-status__is-winning-reserve-not-met p {
  color: #a85f00;
}
.bid-status__is-losing p {
  color: #e82f1d;
}
.bid-status__increase-bid {
  color: #999;
  display: none;
}
.bid-status__arrow-up,
.bid-status__arrow-down {
  position: relative;
  fill: currentColor;
  padding-left: 3px;
}
.bid-status__arrow-up svg,
.bid-status__arrow-down svg {
  margin-left: 4px;
  height: 0.8em;
}
.bid-status__arrow-up svg {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.bid-status__arrow-down svg {
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  transform: rotate(0deg);
}
.my-active-bids-bid-button,
.my-active-bids-bid-live-button,
.my-active-bids-warning,
.my-active-bids-item h4 {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  font-weight: normal;
}
@media (min-width: 768px) {
  .my-active-bids-bid-button,
  .my-active-bids-bid-live-button,
  .my-active-bids-warning,
  .my-active-bids-item h4 {
    font-size: 12px;
    line-height: 1.5;
    font-weight: normal;
  }
}
.my-active-bids-item {
  position: relative;
  height: 77px;
  min-width: 260px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e5e5;
}
.my-active-bids-item:last-child {
  border-bottom: 0;
}
.my-active-bids-item.my-active-bids-winning .my-active-bids-bid-button {
  background: transparent;
  color: #000;
  border-color: #e5e5e5;
}
.my-active-bids-item.my-active-bids-winning .my-active-bids-bid-button:hover {
  color: #6e1eff;
}
.my-active-bids-item img {
  margin-right: 12px;
  width: 60px;
  height: 60px;
}
.my-active-bids-item .my-active-bids-item-artist {
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.my-active-bids-item img,
.my-active-bids-item-details,
.my-active-bids-item-details--hide-bid {
  display: inline-block;
  vertical-align: top;
}
.my-active-bids-item-details,
.my-active-bids-item-details--hide-bid {
  line-height: 20px;
}
.my-active-bids-item-details--hide-bid {
  padding-top: 10px;
}
.bid-status {
  position: absolute;
  top: 0;
  right: 0;
}
.my-active-bids-bid-button,
.my-active-bids-bid-live-button {
  font-size: 11.5px;
  letter-spacing: 1px;
  line-height: 16px;
  margin-top: 26px;
  padding: 7px 14px;
  position: absolute;
  right: 0;
}
.my-active-bids-bid-live-button {
  margin-top: 14px;
}
.settings-bid-history .my-active-bids-bid-button {
  display: none;
}
.settings-auction-registration {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  padding: 30px 0;
  border-bottom: 1px solid #e5e5e5;
}
.settings-auction-registration:last-child {
  border: none;
}
.settings-auction-registration___icon > img {
  background-color: #ccc;
  width: 100px;
  height: 100px;
}
.settings-auction-registration___metadata {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin: 0 30px;
}
.settings-auction-registration___metadata:first-child {
  margin-left: 0;
}
.settings-auction-registration___metadata:last-child {
  margin-right: 0;
}
.settings-auction-registration___metadata > a {
  text-decoration: none;
}
.settings-auction-registration___metadata__name {
  font-size: 20px;
  line-height: 1.33;
}
.settings-auction-registration___metadata__date {
  font-size: 17px;
  line-height: 1.5;
}
.my-active-bids-item-details {
  max-width: 350px;
}
.settings-page {
  padding: 15px 0;
}
.settings-page__header__name {
  font-size: 25px;
  line-height: 1.4;
}
.settings-page__content {
  zoom: 1;
}
.settings-page__content:before,
.settings-page__content:after {
  content: "";
  display: table;
}
.settings-page__content:after {
  clear: both;
}
.settings-page__content__sections,
.settings-page__content__main {
  float: left;
  padding-top: 30px;
}
.settings-page__content__main {
  width: 75%;
}
@media screen and (max-width: 550px) {
  .settings-page__content__main {
    width: 100%;
  }
}
.settings-page.responsive-layout-container {
  margin: 20px 0px;
}
@media screen and (min-width: 941px) {
  .settings-page.responsive-layout-container {
    margin: -10px 0px;
  }
}
@media screen and (min-width: 1192px) {
  .settings-page.responsive-layout-container {
    max-width: 1112px;
    margin: 0px auto;
  }
}
@media screen and (max-width: 600px) {
  #stitch-settings-tabs {
    margin: 0px -10px;
  }
}
.settings-section {
  position: relative;
  width: 100%;
  margin: 30px 0;
  padding: 30px 0 60px 0;
  border-top: 1px solid #e5e5e5;
}
.settings-section:first-child {
  margin-top: 0;
}
.settings-section:last-child {
  margin-bottom: 0;
}
.settings-section:first-child {
  border-top: 0;
  padding-top: 0;
}
.settings-section__name {
  margin: 30px 0;
  font-size: 25px;
  line-height: 1.4;
}
.settings-section__name:first-child {
  margin-top: 0;
}
.settings-section__name:last-child {
  margin-bottom: 0;
}
.settings-disable-link {
  color: #999;
}
.faux-underline-hover-large:hover {
  text-decoration: underline;
}
.faux-underline-hover-large:hover:before {
  display: none;
}
.bordered-pagination {
  margin: 20px 0;
}
.bordered-pagination > ul {
  display: inline-block;
  margin: 0 10px;
  list-style: none;
  border: 2px solid #ccc;
}
.bordered-pagination > ul:first-child {
  margin-left: 0;
}
.bordered-pagination > ul:last-child {
  margin-right: 0;
}
.bordered-pagination > ul > li {
  display: inline-block;
  border-left: 1px solid #e5e5e5;
}
.bordered-pagination > ul > li:first-child {
  border: none;
}
.bordered-pagination > ul > li > a {
  display: block;
  padding: 8px 15px 6px;
  text-decoration: none;
}
.bordered-pagination > ul > li > a.is-active {
  background-color: #f8f8f8;
  cursor: default;
}
.bordered-pagination > ul > li > a > span {
  color: #999;
}
#search-page {
  padding: 20px 100px;
}
#search-page b {
  background-color: #fdefd1;
  color: #000;
  font-weight: normal;
}
.search-results {
  margin: 20px 0;
}
.search-result {
  display: table;
  position: relative;
  width: 100%;
  border-top: 1px solid #e5e5e5;
  text-decoration: none;
  -webkit-transition: all 0.125s;
  -moz-transition: all 0.125s;
  -o-transition: all 0.125s;
  -ms-transition: all 0.125s;
  transition: all 0.125s;
}
.search-result.artist,
.search-result.category {
  font-size: 24px;
}
.search-result:last-child {
  border-bottom: 1px solid #e5e5e5;
}
.search-result:after {
  display: block;
  position: absolute;
  top: 50%;
  right: 10px;
  height: 32px;
  margin-top: -16px;
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #999;
}
.search-result:hover {
  background-color: #f7f7f7;
}
.search-result-thumbnail,
.search-result-info {
  display: table-cell;
  vertical-align: top;
}
.search-result-thumbnail {
  padding: 20px;
}
.search-result-thumbnail-fallback {
  position: relative;
  width: 70px;
  height: 70px;
  background-color: #f8f8f8;
}
.search-result-thumbnail-fallback > img {
  display: block;
  position: absolute;
}
.search-result-info {
  width: 100%;
  padding: 20px 40px 20px 0;
}
.search-result-about {
  margin-top: 2px;
  color: #666;
  max-width: 540px;
}
.search-result-kind {
  font-family: "ITC Avant Garde Gothic W04", "AvantGardeGothicITCW01D 731075",
    "AvantGardeGothicITCW01Dm", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  -ms-font-smoothing: antialiased;
  font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 150%;
  font-size: 11px;
  margin-bottom: 2px;
}
.search-result-no-thumbnail {
  margin-right: 20px;
}

.buyers-premium h2 {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0;
  text-transform: none;
  font-size: 22px;
  text-align: left;
  margin: 30px 0 10px 0;
}
.buyers-premium p {
  font-size: 17px;
  line-height: 1.3em;
}
.buyers-premium-schedule li {
  font-size: 17px;
  padding: 15px 0;
  border-bottom: 1px solid #f8f8f8;
  margin-bottom: 0 !important;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -ms-flex-line-pack: left;
  -webkit-align-content: left;
  align-content: left;
}
.buyers-premium-schedule li:last-child {
  border-bottom: 0;
}
.buyers-premium-schedule li .buyers-premium-pre {
  padding-right: 4px;
}
.buyers-premium-schedule li .buyers-premium-perc {
  padding-left: 6px;
}
@media (max-width: 600px) {
  .buyers-premium-schedule li {
    position: relative;
    display: block;
  }
  .buyers-premium-dots {
    display: none;
  }
  .buyers-premium-pre {
    background: #fff;
    display: inline;
  }
  .buyers-premium-perc {
    position: absolute;
    bottom: 15px;
    right: 11px;
    z-index: -1;
  }
  .buyers-premium-perc:before {
    content: "......................................................";
    margin-right: 5px;
  }
}
.view-in-room {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1070;
}
.view-in-room[data-state="in"] .view-in-room__room {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.view-in-room[data-state="in"] .view-in-room__artwork {
  -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
}
.view-in-room[data-state="in"] .view-in-room__measurement {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.view-in-room__close {
  position: absolute;
  top: 20px;
  left: 20px;
  color: black;
  padding: 5px 11px;
  border: 1px solid #666;
  text-align: center;
  z-index: 2;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
  text-decoration: none;
}
.view-in-room__close > i {
  color: #dfdbd8;
  font-size: 50px;
  line-height: 75px;
}
.view-in-room__close:hover {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.view-in-room__room {
  position: absolute;
  width: 6578px;
  height: 1368px;
  top: 50%;
  left: 50%;
  margin-top: -684px;
  margin-left: -3289px;
  background: #dfdbd8 url("https://d1ycxz9plii3tb.cloudfront.net/misc/room.jpg")
    bottom center no-repeat;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  -ms-transition: opacity 0.5s;
  transition: opacity 0.5s;
}
.view-in-room__placeholder,
.view-in-room__artwork {
  position: fixed;
  z-index: 2;
}
.view-in-room__placeholder {
  left: 50%;
  visibility: hidden;
}
.view-in-room__artwork.is-transition {
  -webkit-transition: all 0.75s;
  -moz-transition: all 0.75s;
  -o-transition: all 0.75s;
  -ms-transition: all 0.75s;
  transition: all 0.75s;
}
.view-in-room__artwork.is-notransition {
  -webkit-transition: none;
  -moz-transition: none;
  -o-transition: none;
  -ms-transition: none;
  transition: none;
}
.view-in-room__measurement-flex-container {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 100%;
}
.view-in-room__measurement {
  -webkit-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  -ms-transition: opacity 0.5s;
  transition: opacity 0.5s;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  z-index: 1;
}
.view-in-room__measurement-bar {
  height: 9px;
  border-left: 1px solid #666;
  border-right: 1px solid #666;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.view-in-room__measurement-feet {
  text-align: center;
  font-style: italic;
  color: #666;
  height: 18px;
  font-size: 14px;
}
.view-in-room__measurement-line {
  width: 100%;
  height: 0px;
  border-top: 1px solid #666;
}
.loading-spinner,
.loading-spinner-white {
  background: #000;
  width: 25px;
  height: 6px;
  position: absolute;
  top: calc(50% - 6px / 2);
  left: calc(50% - 25px / 2);
  -webkit-animation: spin 1s infinite linear;
  -moz-animation: spin 1s infinite linear;
  -o-animation: spin 1s infinite linear;
  -ms-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
.loading-spinner-small,
.loading-spinner-small-white {
  background: #000;
  width: 20px;
  height: 4px;
  position: absolute;
  top: calc(50% - 4px / 2);
  left: calc(50% - 20px / 2);
  -webkit-animation: spin 1s infinite linear;
  -moz-animation: spin 1s infinite linear;
  -o-animation: spin 1s infinite linear;
  -ms-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
.loading-spinner-white {
  background: #fff;
}
.loading-spinner-small-white {
  background: #fff;
}
.loading-ellipsis > span {
  letter-spacing: 2px;
}
.loading-ellipsis > span:nth-child(1) {
  -webkit-animation: fade 1s infinite;
  -moz-animation: fade 1s infinite;
  -o-animation: fade 1s infinite;
  -ms-animation: fade 1s infinite;
  animation: fade 1s infinite;
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  -ms-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.loading-ellipsis > span:nth-child(2) {
  -webkit-animation: fade 1s infinite;
  -moz-animation: fade 1s infinite;
  -o-animation: fade 1s infinite;
  -ms-animation: fade 1s infinite;
  animation: fade 1s infinite;
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  -o-animation-delay: 0.4s;
  -ms-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.loading-ellipsis > span:nth-child(3) {
  -webkit-animation: fade 1s infinite;
  -moz-animation: fade 1s infinite;
  -o-animation: fade 1s infinite;
  -ms-animation: fade 1s infinite;
  animation: fade 1s infinite;
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  -o-animation-delay: 0.6s;
  -ms-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
@-moz-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes fade {
  0% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
}
@-webkit-keyframes fade {
  0% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
}
@-o-keyframes fade {
  0% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
}
@keyframes fade {
  0% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
}
.user-interests-results {
  margin: 10px 0;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.user-interests-results.is-fade-in {
  -webkit-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  -ms-transition: opacity 0.5s;
  transition: opacity 0.5s;
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.user-interests-results:empty {
  display: none;
}
.user-interests-results .results-list-item:first-child {
  border-top: none;
}
.user-interest-remove {
  padding: 10px 10px 10px 20px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  line-height: 14px;
}
.user-interest-remove:before {

}
.user-interest-remove:hover:before {
  color: #f7625a;
  -webkit-text-stroke-width: 1px;
  -moz-text-stroke-width: 1px;
  -o-text-stroke-width: 1px;
  -ms-text-stroke-width: 1px;
  text-stroke-width: 1px;

}
.google-maps-places-input {
  border: none;
  -webkit-box-shadow: inset 0 0 0 2px #e5e5e5;
  box-shadow: inset 0 0 0 2px #e5e5e5;
  padding: 12px;
  -webkit-transition: box-shadow 0.25s;
  -moz-transition: box-shadow 0.25s;
  -o-transition: box-shadow 0.25s;
  -ms-transition: box-shadow 0.25s;
  transition: box-shadow 0.25s;
}
.google-maps-places-input:focus {
  -webkit-transition: box-shadow 0.25s;
  -moz-transition: box-shadow 0.25s;
  -o-transition: box-shadow 0.25s;
  -ms-transition: box-shadow 0.25s;
  transition: box-shadow 0.25s;
  -webkit-box-shadow: inset 0 0 0 2px #6e1fff;
  box-shadow: inset 0 0 0 2px #6e1fff;
}
form.is-validated .google-maps-places-input:invalid {
  -webkit-box-shadow: inset 0 0 0 2px #f7625a;
  box-shadow: inset 0 0 0 2px #f7625a;
}
.pac-container {
  position: relative;
  -webkit-box-shadow: none;
  box-shadow: none;
  border: 2px solid #6e1fff;
  border-top: 0;
  border-radius: 0;
  z-index: 1070;
}
.pac-container:after {
  padding: 20px 0;
  background-position: 100% 50%;
  margin-right: 10px;
}
.pac-item {
  position: relative;
  padding: 10px;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  border-color: #e5e5e5;
}
.pac-item:first-child {
  border-top: none;
}
.pac-item:last-child {
  border-bottom: 1px solid #e5e5e5;
}
.pac-item:hover {
  background-color: #f8f8f8;
}
.pac-item.pac-item-selected {
  border-color: transparent;
  background-color: #000;
}
.pac-item.pac-item-selected > .pac-item-query {
  color: #fff;
}
.pac-item,
.pac-item-query {
  font-family: "Adobe Garamond W08", "adobe-garamond-pro",
    "AGaramondPro-Regular", "Times New Roman", "Times", "serif";
  -webkit-font-smoothing: antialiased;
  font-size: 17px;
}
.small-chevron-list a {
  position: relative;
  display: block;
  text-decoration: none;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-top: -1px;
  padding: 15px 5px;
}
.small-chevron-list a::after {
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #c2c2c2;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 20px;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: color 0.125s;
  -moz-transition: color 0.125s;
  -o-transition: color 0.125s;
  -ms-transition: color 0.125s;
  transition: color 0.125s;
}
.small-chevron-list a:first-child {
  margin-top: 0;
}
.chevron-nav-list a {
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  font-weight: normal;
  position: relative;
  display: block;
  text-decoration: none;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-top: -1px;
  padding: 15px 0;
}
@media (min-width: 768px) {
  .chevron-nav-list a {
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
  }
}
.chevron-nav-list a::after {
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #c2c2c2;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 20px;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: color 0.125s;
  -moz-transition: color 0.125s;
  -o-transition: color 0.125s;
  -ms-transition: color 0.125s;
  transition: color 0.125s;
}
.chevron-nav-list a:first-child {
  margin-top: 0;
}
.chevron-nav-list a.is-active {
  color: #6e1eff;
}
.large-chevron-list a {
  position: relative;
  display: block;
  text-decoration: none;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-top: -1px;
  padding: 40px 80px 40px 40px;
}
.large-chevron-list a::after {
  font-family: "artsy-icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  line-height: 32px;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #c2c2c2;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 20px;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: color 0.125s;
  -moz-transition: color 0.125s;
  -o-transition: color 0.125s;
  -ms-transition: color 0.125s;
  transition: color 0.125s;
}
.large-chevron-list a:first-child {
  margin-top: 0;
}
.large-chevron-list a::after {

  font-size: 40px;
  right: 10px;
}
.large-chevron-list a:hover {
  background-color: #f8f8f8;
  border-color: #f8f8f8;
  z-index: 1;
}
.alertable-input[data-alert] {
  background-color: #fdefd1;
  margin: -10px;
  padding: 10px;
  -webkit-animation: alertable-input 1s forwards;
  -moz-animation: alertable-input 1s forwards;
  -o-animation: alertable-input 1s forwards;
  -ms-animation: alertable-input 1s forwards;
  animation: alertable-input 1s forwards;
  -webkit-animation-delay: 0.5s;
  -moz-animation-delay: 0.5s;
  -o-animation-delay: 0.5s;
  -ms-animation-delay: 0.5s;
  animation-delay: 0.5s;
}
.alertable-input[data-alert]:after {
  display: block;
  content: attr(data-alert);
  margin: 10px 10px 0 10px;
}
.alertable-input[data-alert] > input,
.alertable-input[data-alert] > textarea {
  background-color: #fff;
}
@-moz-keyframes alertable-input {
  100% {
    background-color: transparent;
  }
}
@-webkit-keyframes alertable-input {
  100% {
    background-color: transparent;
  }
}
@-o-keyframes alertable-input {
  100% {
    background-color: transparent;
  }
}
@keyframes alertable-input {
  100% {
    background-color: transparent;
  }
}
.inquiry-questionnaire-modal .modalize-body {
  padding: 30px;
}
.iq-header {
  text-align: center;
  font-size: 25px;
  line-height: 1.4;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 0 20px;
  margin: 0 -30px;
}
.iq-headline {
  display: table;
  width: 100%;
  position: relative;
}
.iq-headline--centered {
  text-align: center;
}
.iq-headline #auth-header-logo {
  font-size: 39px;
  margin: 10px auto 15px;
}
.iq-headline > span {
  display: table-cell;
  vertical-align: bottom;
}
.iq-headline > span:first-child {
  padding-right: 20px;
}
.iq-headline > span:last-child {
  padding-left: 20px;
  text-align: right;
  font-size: 17px;
  line-height: 1.5;
  color: #666;
}
.iq-headline {
  margin: 15px 0 10px;
  font-size: 20px;
  line-height: 1.33;
}
.iq-subheadline {
  margin: 10px 0;
  font-size: 17px;
  line-height: 1.5;
  color: #666;
}
.iq-form {
  margin: 20px 0;
}
.iq-checkbox {
  display: block;
  margin: 20px 0;
}
.iq-search > span {
  left: 20px;
}
.iq-search > span > .icon-search {
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: #ccc;
}
.iq-search > .bordered-input {
  padding-left: 35px;
}
.iq-multiple-choice {
  margin: 50px 0;
}
.iq-multiple-choice > a {
  font-size: 17px;
  line-height: 1.5;
}
.iq-next {
  margin: 30px 0 !important;
}
.iq-top-margin {
  margin-top: 20px;
}
.iq-top-margin button {
  width: 100%;
}
.iq-push-down {
  display: block;
  margin: 20px 0 30px 0;
  text-decoration: none;
  font-size: 17px;
  line-height: 1.5;
}
.iq-loadable > * {
  -webkit-transition: opacity 0.25s;
  -moz-transition: opacity 0.25s;
  -o-transition: opacity 0.25s;
  -ms-transition: opacity 0.25s;
  transition: opacity 0.25s;
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.iq-loadable.is-loading:before {
  display: block;
  content: "";
  background: #000;
  width: 20px;
  height: 5px;
  position: absolute;
  top: calc(50% - 5px / 2);
  left: calc(50% - 20px / 2);
  -webkit-animation: spin 1s infinite linear;
  -moz-animation: spin 1s infinite linear;
  -o-animation: spin 1s infinite linear;
  -ms-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
.iq-loadable.is-loading > * {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.iq-account-logotype {
  display: block;
  margin: 0 auto;
  text-align: center;
  font-size: 55px;
  line-height: 1;
}
.iq-account-sub {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 17px;
  line-height: 1.5;
}
.iq-account-sub:first-child {
  margin-top: 0;
}
.iq-account-sub:last-child {
  margin-bottom: 0;
}
.iq-account-sub--small {
  margin: 10px 0;
  display: block;
  text-align: center;
  font-size: 15px;
  line-height: 1.25;
}
.iq-account-sub--small:first-child {
  margin-top: 0;
}
.iq-account-sub--small:last-child {
  margin-bottom: 0;
}
.iq-account-sub,
.iq-account-sub a {
  color: #666;
}
.iq-form-errors {
  color: #f7625a;
}
.iq-form-errors:first-letter {
  text-transform: uppercase;
}
.iq-sticky-bottom {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 40px 35px;
  background-color: #fff;
}
.iq-sticky-bottom:after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  margin-top: -60px;
  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
  background: -moz-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
  background: -o-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
  background: -ms-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);
  pointer-events: none;
}
.iq-sticky-bottom > .iq-next {
  margin: 0 !important;
}
.iq-sticky-spacer {
  height: 150px;
}
.iq-otp-field.is-hidden {
  display: none;
}
.gdpr-signup .tos-error {
  color: #f7625a;
  text-align: left;
  height: 1.23em;
  margin-bottom: 8px;
  font-size: 15px;
  line-height: 1.25;
}
.gdpr-signup .tos-error .bordered-input {
  width: 100%;
  margin-bottom: 10px;
}
.gdpr-signup .tos-error .avant-garde-button-black {
  width: 100%;
}
.gdpr-signup .tos-error .gdpr-signup__form__checkbox__accept-terms .is-error {
  visibility: hidden;
}
@media (max-width: 768px) {
  .iq-sticky-bottom {
    position: relative;
    margin-top: 20px;
    padding: 0;
  }
  .iq-sticky-bottom:after {
    display: none;
  }
  .iq-sticky-spacer {
    display: none;
  }
}
.modalize-body {
  padding: 30px;
}
.view-in-room {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
.view-in-room[data-state="in"] .view-in-room__room {
  opacity: 1;
}
.view-in-room[data-state="in"] .view-in-room__artwork {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
}
.view-in-room[data-state="in"] .view-in-room__measurement {
  opacity: 1;
}
.view-in-room__close > i {
  color: #dfdbd8;
  font-size: 50px;
  line-height: 75px;
}
.view-in-room__close:hover {
  opacity: 1;
}
.view-in-room__room {
  position: absolute;
  width: 6578px;
  height: 1368px;
  top: 50%;
  left: 50%;
  margin-top: -684px;
  margin-left: -3289px;
  background: #dfdbd8 url("https://d1ycxz9plii3tb.cloudfront.net/misc/room.jpg") bottom center no-repeat;
  opacity: 0;
  transition: opacity 0.5s;
}
.view-in-room__placeholder,
.view-in-room__artwork {
  position: fixed;
  z-index: 2;
}
.view-in-room__placeholder {
  left: 50%;
  visibility: hidden;
}
.view-in-room__artwork.is-transition {
  transition: all 0.75s;
}
.view-in-room__artwork.is-notransition {
  transition: none;
}
.view-in-room__measurement-flex-container {
  display: flex;
  justify-content: center;
  height: 100%;
}
.view-in-room__measurement {
  transition: opacity 0.5s;
  opacity: 0;
  z-index: 1;
}
.view-in-room__measurement-bar {
  height: 9px;
  border-left: 1px solid #666;
  border-right: 1px solid #666;
  display: flex;
  align-items: center;
}
.view-in-room__measurement-feet {
  text-align: center;
  font-style: italic;
  color: #666;
  height: 18px;
  font-size: 14px;
}
.view-in-room__measurement-line {
  width: 100%;
  height: 0px;
  border-top: 1px solid #666;
}
`
