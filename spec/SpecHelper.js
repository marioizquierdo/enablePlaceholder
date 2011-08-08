beforeEach(function() {
  this.addMatchers({
    toShowPlaceholder: function(options) {
      var $input = this.actual;
      var options = options || {};
      options.withPlaceholderClass = options.withPlaceholderClass || $.EnablePlaceholder.defaults.withPlaceholderClass;
      return(
        $input.val() === $input.attr('placeholder') && 
        $input.hasClass(options.withPlaceholderClass)
      );
    }
  });
});

JasmineHelper = {
  
  alert_support_placeholder_trick: function() {
    alert('You browser already supports the HTML5 placeholder property.\n\
To make the rest of specs pass, $.support.placeholder is manually set to false, to trick the browser.\n\
To have a more reliable result, please run specs on an older browser.');
  },
  
  // Keypress and adds 'x' to the end of the field value
  type_something_in: function(field) {
    field.focus().keydown().val(field.val() + 'x').keyup();
    return field;
  },
  
  type_same_text_as_placeholder_in: function(field) {
    field.focus().keydown().val(field.attr('placeholder')).keyup();
    return field;
  },
  
  clear_text_in: function(field) {
    field.focus().keydown().val('').keyup();
    return field;
  },
  
  expectToShowPasswordPlaceholder: function(passfield) {
    var replacement = passfield.data('ph_text');
    return(
      expect(replacement).toShowPlaceholder() &&
      expect(replacement).toBeVisible() &&
      expect(passfield).toBeHidden()
    );
  }  ,

  expectToNotShowPasswordPlaceholder: function(passfield) {
    var replacement = passfield.data('ph_text');
    return(
      expect(passfield).not.toShowPlaceholder() &&
      expect(replacement).toBeHidden() &&
      expect(passfield).toBeVisible()
    );
  }
};

