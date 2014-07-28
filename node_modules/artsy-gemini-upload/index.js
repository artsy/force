var attach = function($) {
  $.fn.extend({
    geminiUpload: function(options) {
      var encodedCredentials;
      encodedCredentials = this.encode(options.geminiKey, '');
      return $.ajax({
        type: 'GET',
        dataType: 'json',
        url: options.geminiApp + "/uploads/new.json",
        data: {
          acl: options.acl
        },
        headers: {
          'Authorization': "Basic " + encodedCredentials
        },
        success: (function(_this) {
          return function(resp) {
            options.credentials = encodedCredentials
            return _this.attachFileUploadUI(resp, options);
          };
        })(this)
      });
    },
    encode: function(key, secret) {
      return btoa(unescape(encodeURIComponent([key, secret].join(':'))));
    },
    seedForm: function(data, options) {
      var $form, acl, base64Policy, bucket, key, s3Key, signature, successAction, uploadBucket;
      bucket = data.policy_document.conditions[0].bucket;
      key = data.policy_document.conditions[1][2] + "/${filename}";
      acl = data.policy_document.conditions[2].acl;
      successAction = data.policy_document.conditions[3].success_action_status;
      base64Policy = data.policy_encoded;
      signature = data.signature;
      s3Key = options.s3Key;
      uploadBucket = bucket;
      $form = this.find('form');
      $form.find('input[name=key]').val(key);
      $form.find('input[name=AWSAccessKeyId]').val(s3Key);
      $form.find('input[name=acl]').val(acl);
      $form.find('input[name=success_action_status]').val(successAction);
      $form.find('input[name=policy]').val(base64Policy);
      $form.find('input[name=signature]').val(signature);
      return $form.get(0).setAttribute('action', "https://" + uploadBucket + ".s3.amazonaws.com");
    },
    attachFileUploadUI: function(data, options) {
      var $form, bucket, key, metadata;
      $form = this.find('form');
      bucket = data.policy_document.conditions[0].bucket;
      key = data.policy_document.conditions[1][2] + "/${filename}";
      this.seedForm(data, options);
      metadata = {
        _type: options._type,
        id: options.id
      };
      return $form.fileupload({
        type: 'POST',
        dataType: 'xml',
        done: (function(_this) {
          return function(e, data) {
            var fileName;
            fileName = data.files[0].name;
            key = key.replace('${filename}', fileName);
            return $.ajax({
              type: 'POST',
              dataType: 'json',
              url: options.geminiApp + "/entries.json",
              data: {
                entry: {
                  source_key: key,
                  source_bucket: bucket,
                  template_key: options.templateKey,
                  metadata: metadata
                }
              },
              headers: {
                'Authorization': "Basic " + options.credentials
              },
              success: function(resp) {
                options.onUploadComplete(resp);
              }
            });
          };
        })(this),
        add: (function(_this) {
          return function(e, data) {
            var fileName, fileType;
            fileName = data.files[0].name;
            fileType = data.files[0].type;
            $(_this).find("form input[name='Content-Type']").val(fileType);
            return data.submit();
          };
        })(this),
        fail: options.onFail,
        progress: options.onProgressUpdate,
        stop: options.onStop
      });
    }
  });
};

// Export for CommonJS & window global
if (typeof module != 'undefined') {
  module.exports = attach;
} else {
  attach(window.jQuery);
}