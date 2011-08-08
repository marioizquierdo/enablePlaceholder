/* 
 * EnablePlaceholder jQuery plugin.
 * https://github.com/marioizquierdo/enablePlaceholder
 * version 1.0.3 (May 11 2011)
 * 
 * Copyright (c) 2011 Mario Izquierdo
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 */
(function($){
  // Add jQuery.support.placeholder property to check HTML5 placeholder support
  $.support.placeholder = ('placeholder' in document.createElement('input'));
  
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
      
      // Hide on focus
      input.bind('focus focusin keydown paste', function(){
       $(this).clearPlaceholder(settings);
      });

      // Show again on focusout if input.val() is empty
      input.bind('blur focusout', function(){
        $(this).showPlaceholder(settings);
      });
      
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
        
        // Password placeholder needs to clone a input[type=text] field to show the placeholder text
        if(input.attr('type') === "password") {
          if(!input.data('ph_text')) {
            var replacement = input.clone().attr('type', 'text')
              .removeAttr('name')
              .data({'ph_pass': input, 'ph_id': input.attr('id'), 'ph_active': true})
              .bind('focus', function(){ $(this).clearPlaceholder(settings); });
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
        if(input.data('ph_pass')) {
          input.hide()
          .data('ph_pass')
            .attr('id', input.removeAttr('id').data('ph_id'))
            .show().data('ph_active', false).focus();
        }
        if(input.data('ph_text')) {
          input.data('ph_text').remove();
          input.data({'ph_text': null, 'ph_active': false}).show();
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
  
  // Check basic constraints, extend options with defaults and run for each element.
  var execute_plugin_method = function($elements, options, lambda) {
    if(!$.support.placeholder) {
      var settings = $.extend({}, $.EnablePlaceholder.defaults, options);
      return $elements.each(function(){
        var input = $(this);
        lambda(input, settings);
      });
    }
  };
  
})(jQuery);
