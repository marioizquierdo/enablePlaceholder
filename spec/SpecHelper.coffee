beforeEach ->
  this.addMatchers
    toShowPlaceholder: (options) ->
      $input = this.actual
      options = options || {}
      options.withPlaceholderClass = options.withPlaceholderClass || $.EnablePlaceholder.defaults.withPlaceholderClass
      return $input.val() is $input.attr('placeholder') and $input.hasClass(options.withPlaceholderClass)

window.JasmineHelper = 
  
  alert_support_placeholder_trick: ->
    alert "You browser already supports the HTML5 placeholder property.\n
To make the rest of specs pass, $.support.placeholder is manually set to false, to trick the browser.\n
To have a more reliable result, please run specs on an older browser."
  
  # Keypress and adds 'x' to the end of the field value
  type_something_in: (field) ->
    field.focus().keydown().val("#{field.val()}x").keyup()
  
  type_same_text_as_placeholder_in: (field) ->
    field.focus().keydown().val(field.attr('placeholder')).keyup()
  
  clear_text_in: (field) ->
    field.focus().keydown().val('').keyup()

