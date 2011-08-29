(function() {
  beforeEach(function() {
    return this.addMatchers({
      toShowPlaceholder: function(options) {
        var $input;
        $input = this.actual;
        options = options || {};
        options.withPlaceholderClass = options.withPlaceholderClass || $.EnablePlaceholder.defaults.withPlaceholderClass;
        return $input.val() === $input.attr('placeholder') && $input.hasClass(options.withPlaceholderClass);
      }
    });
  });
  window.JasmineHelper = {
    alert_support_placeholder_trick: function() {
      return alert("You browser already supports the HTML5 placeholder property.\nTo make the rest of specs pass, $.support.placeholder is manually set to false, to trick the browser.\nTo have a more reliable result, please run specs on an older browser.");
    },
    type_something_in: function(field) {
      return field.focus().keydown().val("" + (field.val()) + "x").keyup();
    },
    type_same_text_as_placeholder_in: function(field) {
      return field.focus().keydown().val(field.attr('placeholder')).keyup();
    },
    clear_text_in: function(field) {
      return field.focus().keydown().val('').keyup();
    }
  };
}).call(this);
