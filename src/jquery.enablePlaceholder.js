/* 
 * EnablePlaceholder jQuery plugin.
 * https://github.com/marioizquierdo/enablePlaceholder
 * version 1.1.1 (Aug 16, 2011)
 * 
 * Copyright (c) 2011 Mario Izquierdo
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 */
"use strict"; // http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
(function ($) {
  // Add jQuery.support.placeholder property to check HTML5 placeholder support
  $.support.placeholder = document.createElement('input').placeholder !== undefined;
  
  // DEFAULT OPTIONS
  $.EnablePlaceholder = { 
    "defaults": {
      "withPlaceholderClass": "placeholder"  // CSS class applied when the placeholder is shown
    },
    "alsoForModernBrowsers": false  // Modern HTML5 browsers already have placeholder support
  };
  
  // PRIVATE functions
  var execute_plugin_method, on_focusin_clear_placeholder, on_focusout_show_placeholder;
  
  // Check basic constraints, extend options with defaults and run for each element.
  execute_plugin_method = function ($elements, options, lambda) {
    if (!$.support.placeholder || $.EnablePlaceholder.alsoForModernBrowsers) {
      var settings = $.extend({}, $.EnablePlaceholder.defaults, options);
      return $elements.each(function () {
        var input = $(this);
        lambda(input, settings);
      });
    }
  };
  
  on_focusin_clear_placeholder = function (input, options) {
    input.bind('focus focusin keydown paste', function () {
      input.clearPlaceholder(options);
    });
  };
  
  on_focusout_show_placeholder = function (input, settings) {
    input.bind('blur focusout', function () {
      input.showPlaceholder(settings);
    });
  };
  
  
  // ------------------------------------------------------------
  // PLUGIN METHODS
  
  
  // jQuery(selector).enablePlaceholder()
  // Enable the placeholder functionality that emulates the HTML5 placeholder
  $.fn.enablePlaceholder = function (options) {
    return execute_plugin_method(this, options, function (input, settings) {
      
      // Hide placeholder on focusin and show again on focusout if input.val() is empty
      on_focusin_clear_placeholder(input, settings);
      on_focusout_show_placeholder(input, settings);
      
      // Clear placeholder on form submit
      input.parents('form').first().submit(function () {
        input.clearPlaceholder(settings);
        return true;
      });
      
      // Clear placeholder before leave or reload the page
      $(window).unload(function () {
        input.clearPlaceholder(settings);
        return true;
      });
        
      // Show placeholder on load
      input.showPlaceholder(settings);
    });
  };

  // jQuery(selector).showPlaceholder()
  // Shows the value on the placeholder attribute if empty
  $.fn.showPlaceholder = function (options) {
    return execute_plugin_method(this, options, function (input, settings) {
      if (input.val() === "") {
        input
          .val(input.attr("placeholder"))
          .addClass(settings.withPlaceholderClass)
          .data('ph_active', true);
      }
    });
  };
  
  // jQuery(selector).clearPlaceholder()
  // Clear the placeholder value if was set before
  $.fn.clearPlaceholder = function (options) {
    return execute_plugin_method(this, options, function (input, settings) {
      if (input.data('ph_active')) {        
        input
          .val("")
          .removeClass(settings.withPlaceholderClass)
          .data('ph_active', false);
      }
    });
  };
  
  // jQuery(selector).updatePlaceholder(new_placeholder_text)
  // Change the value of placeholder attribute and show if needed.
  $.fn.updatePlaceholder = function (new_placeholder_text, options) {
    this
      .clearPlaceholder(options)
      .attr('placeholder', new_placeholder_text)
      .showPlaceholder(options);
  };

}(jQuery));