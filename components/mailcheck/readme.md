Mailcheck.js

1. Require this component. eg: `Mailcheck = require '../../../components/mailcheck/index.coffee'`
2. Add a unique ID such as `\#js-mailcheck-input` to your input element
3. Add a `div` with unique ID such as `\#js-mailcheck-hint` directly after the input element
4. Initialize the component with `Mailcheck.run('#js-mailcheck-input', '#js-mailcheck-hint', false)`
   The first two parameters are the unique ID strings of the input and hint. The third param is a boolean option to add a line break to the hint separating the 'Did you mean:' section from the suggestion.
