/* 
 * EnablePlaceholder jQuery plugin.
 * https://github.com/marioizquierdo/enablePlaceholder
 * version 1.0.2 (May 11 2011)
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
      if(hasPlaceholderAttribute(input)) {
        
        // Show placeholder on load
        input.showPlaceholder(settings);
      
        // Hide on focus
        input.bind('focus keydown paste', function(){
          input.clearPlaceholder(settings);
        });

        // Show again on focusout if input.val() is empty
        input.bind('blur', function(){
          input.showPlaceholder(settings);
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
      }
    });
  };

  // jQuery(selector).showPlaceholder()
  // Shows the value on the placeholder attribute if empty
  $.fn.showPlaceholder = function(options) {
    return execute_plugin_method(this, options, function(input, settings) {
      if(input.val() === "") {
        input
          .val(input.attr("placeholder"))
          .addClass(settings.withPlaceholderClass)
          .data('hasPlaceholder', true);
      }
    });
  };
  
  // jQuery(selector).clearPlaceholder()
  // Clear the placeholder value if was set before
  $.fn.clearPlaceholder = function(options) {
    return execute_plugin_method(this, options, function(input, settings) {
      if(input.data('hasPlaceholder')) {
        input
          .val("")
          .removeClass(settings.withPlaceholderClass)
          .data('hasPlaceholder', false);
      }
    });
  };
  
  // jQuery(selector).updatePlaceholder(new_placeholder_text)
  // Change the value of placeholder attribute and show if needed.
  $.fn.updatePlaceholder = function(new_placeholder_text, options) {
    return execute_plugin_method(this, options, function(input, settings) {
      input
        .clearPlaceholder(settings)
        .attr('placeholder', new_placeholder_text)
        .showPlaceholder(settings);
    });
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
  
  var hasPlaceholderAttribute = function(input) {
    return (input.attr("placeholder") && input.attr("placeholder") !== "");
  };
})(jQuery);
