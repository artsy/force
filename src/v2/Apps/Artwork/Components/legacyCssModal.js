export const legacyCSS = `
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {
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
.modalize[data-state='open'],
.modalize.is-open {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.modalize[data-state='open'] > .modalize-backdrop > .modalize-dialog,
.modalize.is-open > .modalize-backdrop > .modalize-dialog {
  -webkit-transition: opacity 0.25s, width 0;
  -moz-transition: opacity 0.25s, width 0;
  -o-transition: opacity 0.25s, width 0;
  -ms-transition: opacity 0.25s, width 0;
  transition: opacity 0.25s, width 0;
}
.modalize.is-loading .modalize-backdrop::before {
  display: block;
  content: '';
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
  background-color: rgba(0,0,0,0.75);
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
.modalize-dialog[data-state='fade-out'],
.modalize-dialog.is-fade-out {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.modalize-dialog[data-state='fade-in'],
.modalize-dialog.is-fade-in {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.modalize-dialog[data-state='slide-out'],
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
.modalize-dialog[data-state='slide-in'],
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
.modalize-dialog[data-state='bounce-out'],
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
.modalize-dialog[data-state='bounce-in'],
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

.icon-close:before {

}

.icon-view-in-room:before {

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
  width: 75px;
  height: 75px;
  text-align: center;
  background-color: #666;
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
  color: #dfdbd8;
  font-size: 50px;
  line-height: 70px;
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
  height: 0;
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
  -webkit-animation-delay: 0.6000000000000001s;
  -moz-animation-delay: 0.6000000000000001s;
  -o-animation-delay: 0.6000000000000001s;
  -ms-animation-delay: 0.6000000000000001s;
  animation-delay: 0.6000000000000001s;
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
  content: "\e627";
}
.user-interest-remove:hover:before {
  color: #f7625a;
  -webkit-text-stroke-width: 1px;
  -moz-text-stroke-width: 1px;
  -o-text-stroke-width: 1px;
  -ms-text-stroke-width: 1px;
  text-stroke-width: 1px;
  content: "\e614";
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
  content: "\e607";
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
  content: "\e607";
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
  content: "\e607";
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
  content: "\e61c";
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
`
