/* 
 * EnablePlaceholder jQuery plugin.
 * https://github.com/marioizquierdo/enablePlaceholder
 * version 1.1 (Aug 8, 2011)
 * 
 * Copyright (c) 2011 Mario Izquierdo
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 */
(function($){
  // Add jQuery.support.placeholder property to check HTML5 placeholder support
  $.support.placeholder = false;//('placeholder' in document.createElement('input'));
  
  // Options default values
  $.EnablePlaceholder = { 
    "defaults": {
      "withPlaceholderClass": "placeholder"
    }
  };
  
  // jQuery(selector).enablePlaceholder()
  // Enable the placeholder functionality that emulates the HTML5 placeholder
  $.fn.enablePlaceholder = function(options) {
    return execute_plugin_method(this, options, function(input, settings) {
      
      // Hide placeholder on focusin and show again on focusout if input.val() is empty
      on_focusin_clear_placeholder(input, settings);
      on_focusout_show_placeholder(input, settings);
      
      // Clear placeholder on form submit
      input.parents('form').first().submit(function(){
        input.clearPlaceholder(settings);
        return true;
      });
      
      // Clear placeholder before leave or reload the page
      $(window).unload(function() {
        input.clearPlaceholder(settings);
        return true;
      });
        
      // Show placeholder on load
      input.showPlaceholder(settings);
    });
  };

  // jQuery(selector).showPlaceholder()
  // Shows the value on the placeholder attribute if empty
  $.fn.showPlaceholder = function(options) {
    return execute_plugin_method(this, options, function(input, settings) {
      
      if(input.val() === "") {
        
        // Password placeholder needs to clone a input[type=text] field replacement to show the placeholder text
        if(input.attr('type') === "password") {
          if(!input.data('ph_text')) {
            var replacement = input.clone().attr('type', 'text').removeAttr('name')
              .data({'ph_pass': input, 'ph_id': input.attr('id'), 'ph_active': true});
            on_focusin_clear_placeholder(replacement, settings);
            input
              .data({'ph_text': replacement, 'ph_id': input.attr('id'), 'ph_active': true})
              .before(replacement);
          }
          input = input.removeAttr('id').hide();
          input.data('ph_text').attr('id', input.data('ph_id')).show();
          input = input.data('ph_text');
        }
        
        input
          .val(input.attr("placeholder"))
          .addClass(settings.withPlaceholderClass)
          .data('ph_active', true);
      }
    });
  };
  
  // jQuery(selector).clearPlaceholder()
  // Clear the placeholder value if was set before
  $.fn.clearPlaceholder = function(options) {
    return execute_plugin_method(this, options, function(input, settings) {
      if(input.data('ph_active')) {
        
        // Password placeholder needs to remove the input[type=text] field
        if(input.data('ph_pass')) { // if this is the replacement (ph_pass is a pointer to the password field)
          input.data('ph_pass').clearPlaceholder(settings).show().focus(); // delegate the event handler to the password field
        }
        if(input.data('ph_text')) { // if this is the original password field (ph_text is a pointer to the replacement)
          input.data('ph_text').attr('id', null).hide(); // remove replacement
          input.attr('id', input.data('ph_id')).data('ph_text', null);
        }
        
        input
          .val("")
          .removeClass(settings.withPlaceholderClass)
          .data('ph_active', false);
      }
    });
  };
  
  // jQuery(selector).updatePlaceholder(new_placeholder_text)
  // Change the value of placeholder attribute and show if needed.
  $.fn.updatePlaceholder = function(new_placeholder_text, options) {
    this
      .clearPlaceholder(options)
      .attr('placeholder', new_placeholder_text)
      .showPlaceholder(options);
  };
  
  
  // PRIVATE
  var execute_plugin_method, on_focusin_clear_placeholder, on_focusout_show_placeholder;
  
  // Check basic constraints, extend options with defaults and run for each element.
  execute_plugin_method = function($elements, options, lambda) {
    if(!$.support.placeholder) {
      var settings = $.extend({}, $.EnablePlaceholder.defaults, options);
      return $elements.each(function() {
        var input = $(this);
        lambda(input, settings);
      });
    }
  };
  
  on_focusin_clear_placeholder = function(input, options) {
    input.bind('focus focusin keydown paste', function(){
      input.clearPlaceholder(options);
    });
  };
  
  on_focusout_show_placeholder = function(input, settings) {
    input.bind('blur focusout', function(){
      input.showPlaceholder(settings);
    });
  };

})(jQuery);
