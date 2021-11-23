/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('underscore');
const _s = require('underscore.string');

// Extract out into a site-wide language file (?)
const en = {
  errors: {
    'Email not found': 'Sorry, we couldn&rsquo;t find an account with that email.'
  }
};

export const form = {
  // Returns false the first time it is called,
  // true everytime thereafter, until `@submitting`
  // becomes undefined (#reenableForm)
  //
  // Example: `return if @formIsSubmitting()`
  //
  // @returns {Boolean}
  formIsSubmitting($button) {
    if (this.submitting != null) { return this.submitting; }
    this.submitting = true;
    if ($button == null) { $button = this.$('button'); }
    $button.prop('disabled', true);
    return false;
  },

  resetFormState($form) {
    return ($form != null ? $form : ($form = this.$('form')))
      .find('button, input, textarea')
      .attr('data-state', null);
  },

  reenableForm($button, options) {
    if (options == null) { options = {}; }
    options = _.defaults(options, {reset: true});
    if (options.reset) { this.resetFormState(); }
    this.submitting = undefined;
    if ($button == null) { $button = this.$('button'); }
    return $button.prop('disabled', false);
  },

  serializeCheckboxes($checkboxes) {
    if ($checkboxes == null) { $checkboxes = this.$('input:checkbox'); }
    return _.reduce($checkboxes, function(memo, checkbox) {
      memo[checkbox.name] = checkbox.checked;
      return memo;
    }
    , {});
  },

  serializeInputs($form) {
    if ($form == null) { $form = this.$('form'); }
    return _.reduce($form.serializeArray(), function(memo, input) {
      const value = _s.trim(input.value);
      if (memo[input.name] != null) { // Convert to array
        const target = _.flatten([memo[input.name]]);
        target.push(value);
        memo[input.name] = target;
      } else {
        memo[input.name] = value;
      }
      return memo;
    }
    , {});
  },

  // Serializes the form object
  //
  // @param {$Object} $form
  // @returns {Object}
  serializeForm($form, $checkboxes) {
    const booleans = this.serializeCheckboxes($checkboxes);
    const form = this.serializeInputs($form);
    return _.extend(form, booleans);
  },

  // Checks for required fileds then sets the data-state to error
  // if they are empty
  //
  // @param {$Object} $form
  // @returns {Boolean}
  validateForm($form) {
    if ($form == null) { $form = this.$('form'); }
    $form.addClass('is-validated');
    if ($form[0].checkValidity) {
      // Check for any confirmable fields
      let $confirmables;
      if (($confirmables = $form.find('input[data-confirm]')).length) {
        this.validateConfirmables($form, $confirmables);
      }
      return $form[0].checkValidity();
    } else { // Let the server handle it
      return true;
    }
  },

  // Ensures fields with data-confirm='some_name' has a value matching the value
  // of the field called out in the data-confirm attribute
  validateConfirmables($form, $confirmables) {
    return _.each($confirmables, function(el) {
      const $el = $(el);
      const confirm = $el.data('confirm');
      const $confirm = $form.find(`input[name='${confirm}']`);
      if ($confirm.length && ($el.val() !== $confirm.val())) {
        return (typeof $el[0].setCustomValidity === 'function' ? $el[0].setCustomValidity(`${_s.humanize(confirm)} must match`) : undefined);
      } else {
        return (typeof $el[0].setCustomValidity === 'function' ? $el[0].setCustomValidity('') : undefined);
      }
    });
  },

  // Attempt to normalize the error response and pull out a message
  //
  // @param {Object} xhr
  // @returns {String}
  errorMessage(xhr) {
    let parsed;
    try {
      parsed = $.parseJSON(xhr.responseText);
    } catch (e) {
      parsed = {text: 'There was an error'};
    }

    // Pull out the appropriate string
    const message = (() => {
      if (_.has(parsed, 'text')) {
      return parsed.text;
    } else if (_.has(parsed, 'error')) {
      return parsed.error.message || parsed.error;
    } else if (_.has(parsed, 'details') && _.isArray(parsed.details)) {
      return parsed.details.join('; ');
    } else if (_.has(parsed, 'detail')) {
      return _.map(parsed.detail, (v, k) => {
        // For param_errors we can point out the problematic fields
        // provided they have name attributes
        this.$(`[name=${k}]`).attr('data-state', 'error');

        return `${_s.humanize(k)} ${v}`;
      })
        .join('; ')
        // Multiple errors on a single param are
        // returned joined by commas without spaces
        .replace(/(.),(.)/, '$1; $2');
    }
    })();

    // Check for alternate copy mapping
    if (_.has(en.errors, message)) {
      return en.errors[message];
    } else {
      // Always return a string
      return message || '';
    }
  }
};
