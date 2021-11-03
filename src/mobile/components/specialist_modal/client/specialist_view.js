/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _SpecialistView;
const _ = require('underscore');
const Backbone = require('backbone');
import Form from '../../mixins/form';
const CurrentUser = require('../../../models/current_user');
const { mediator } = require('../../../../lib/mediator');
const sd = require('sharify').data;

const template = function() { return require('../templates/form.jade')(...arguments); };
const successTemplate = function() { return require('../templates/success.jade')(...arguments); };

export const SpecialistView = (_SpecialistView = (function() {
  _SpecialistView = class SpecialistView extends Backbone.View {
    static initClass() {
      _.extend(this.prototype, Form);
      this.prototype.className = 'main-side-margin contact-modal-height';
  
      this.prototype.events =
        {"click #modal-contact-submit": "submitForm"};
    }

    initialize() {
      return this.listenTo(this.collection, 'sync', this.render);
    }

    render() {
      return this.$el.html(template({
        user: CurrentUser.orNull(),
        representative: this.collection.first(),
        placeholder: 'Leave your comments'
      })
      );
    }

    submitForm(e) {
      e.preventDefault();
      if (!this.validateForm(this.$('form'))) { return; }
      if (this.formIsSubmitting()) { return; }

      return $.ajax({
        url: `${sd.API_URL}/api/v1/feedback`,
        data: this.serializeForm(this.$('form')),
        type: "POST",
        success: () => {
          this.$el.html(successTemplate);
          return setTimeout(() => mediator.trigger('modal:close')
          , 2000);
        }
      });
    }
  };
  _SpecialistView.initClass();
  return _SpecialistView;
})());

