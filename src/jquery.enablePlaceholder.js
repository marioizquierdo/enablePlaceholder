(function() {
  /*
    EnablePlaceholder jQuery plugin.
    https://github.com/marioizquierdo/enablePlaceholder
    version 1.2.2 (Oct 02, 2011)
    
    Copyright (c) 2011 Mario Izquierdo
    Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
    and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
  */
  "use strict";
  var $, execute_plugin_method, on_focusin_clear_placeholder, on_focusout_show_placeholder;
  $ = jQuery;
  $.support.placeholder = document.createElement('input').placeholder != null;
  $.EnablePlaceholder = {
    "defaults": {
      "withPlaceholderClass": "placeholder"
    },
    "alsoForModernBrowsers": false
  };
  execute_plugin_method = function($elements, options, lambda) {
    var settings;
    if (!$.support.placeholder || $.EnablePlaceholder.alsoForModernBrowsers) {
      settings = $.extend({}, $.EnablePlaceholder.defaults, options);
      return $elements.each(function() {
        return lambda($(this), settings);
      });
    }
  };
  on_focusin_clear_placeholder = function(input, settings) {
    return input.bind('focus focusin keydown paste', function() {
      return input.clearPlaceholder(settings);
    });
  };
  on_focusout_show_placeholder = function(input, settings) {
    return input.bind('blur focusout', function() {
      return input.showPlaceholder(settings);
    });
  };
  $.fn.enablePlaceholder = function(options) {
    return execute_plugin_method(this, options, function(input, settings) {
      on_focusin_clear_placeholder(input, settings);
      on_focusout_show_placeholder(input, settings);
      input.parents('form').submit(function() {
        input.clearPlaceholder(settings);
        return true;
      });
      $(window).unload(function() {
        input.clearPlaceholder(settings);
        return true;
      });
      return input.showPlaceholder(settings);
    });
  };
  $.fn.showPlaceholder = function(options) {
    return execute_plugin_method(this, options, function(input, settings) {
      if (input.val() === "") {
        return input.val(input.attr("placeholder")).addClass(settings.withPlaceholderClass).data('ph_active', true);
      }
    });
  };
  $.fn.clearPlaceholder = function(options) {
    return execute_plugin_method(this, options, function(input, settings) {
      if (input.data('ph_active')) {
        return input.val("").removeClass(settings.withPlaceholderClass).data('ph_active', false);
      }
    });
  };
  $.fn.updatePlaceholder = function(new_placeholder_text, options) {
    return this.clearPlaceholder(options).attr('placeholder', new_placeholder_text).showPlaceholder(options);
  };
}).call(this);
