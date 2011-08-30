describe "enablePlaceholder Plugin", ->
  
  input = undefined # input[type=text] or textarea
  textinput = 'name': 'input[type=text]', 'selector': '#form input[type=text][placeholder]'
  textarea =  'name': 'textarea',         'selector': '#form textarea[placeholder]'

  beforeEach ->
    loadFixtures 'form.html'
  
  describe "$.support.placeholder", ->
    it "should be defined", ->
      expect($.support.placeholder).toBeDefined()
      if $.support.placeholder
        JasmineHelper.alert_support_placeholder_trick()
        $.support.placeholder = false
    
    it "the plugin should do nothing if $.support.placeholder is true", ->
      $.support.placeholder = true
      this.after -> $.support.placeholder = false
      input = $(textinput.selector)
      input.enablePlaceholder()
      expect(input).not.toShowPlaceholder()
  
  describe "enablePlaceholder()", ->
    $.each [textinput, textarea], (i, element) ->
        
      describe "on a #{element.name}", ->
        beforeEach ->
          input = $(element.selector)
          expect(input).toExist()
          input.enablePlaceholder()

        it "should show the placeholder text", ->
          expect(input).toShowPlaceholder()
        
        $.each ['focus', 'focusin', 'keydown', 'paste'], (i, focus_event) ->
          
          describe "on #{focus_event}", ->
            beforeEach -> input.trigger(focus_event)
            
            it "should hide the placeholder", -> expect(input).not.toShowPlaceholder()
            
            describe "and then focusout", ->
              beforeEach -> input.focusout()
              it "should show the placeholder again", ->
                expect(input).toShowPlaceholder()
            
            describe "after write something", ->
              beforeEach -> JasmineHelper.type_something_in(input)
              it "should not be empty", -> expect(input.val()).not.toBeEmpty()
              it "should not show the placeholder", -> expect(input).not.toShowPlaceholder()
              describe "and then focusout", ->
                beforeEach -> input.focusout()
                it "should not be empty", -> expect(input.val()).not.toBeEmpty()
                it "should not show the placeholder", -> expect(input).not.toShowPlaceholder()
            
            describe "after write the same text as the placeholder", ->
              beforeEach -> JasmineHelper.type_same_text_as_placeholder_in(input)
              it "should have the placeholder text", -> expect(input.val()).toEqual(input.attr 'placeholder')
              it "should not show the placeholder", -> expect(input).not.toShowPlaceholder()
              
      
      it "should not submit the placeholder in the form", ->
        $('#form *[placeholder]').enablePlaceholder()
        expect($(textinput.selector)).toShowPlaceholder()
        $('form').submit (event) -> # stub submit event to not reload the page
          event.preventDefault()
          $(window).trigger('unload') # stub window.unload event that should clear the placeholder
        $('form').submit()
        expect($(textinput.selector)).not.toShowPlaceholder()

    
    describe "with option withPlaceholderClass", ->    
      phclass = 'myawesomeplacelolderclass'
      
      beforeEach -> input = $(textinput.selector).enablePlaceholder('withPlaceholderClass': phclass)
      
      it "should show the placeholder with the specified class", ->
        expect(input).toShowPlaceholder 'withPlaceholderClass': phclass
      
      it "should keep the specified class if focusout and focusin again", ->
        input.focusin()
        expect(input).not.toShowPlaceholder 'withPlaceholderClass': phclass
        input.focusout()
        expect(input).toShowPlaceholder 'withPlaceholderClass': phclass
    
  describe "clearPlaceholder()", ->
    beforeEach -> 
      input = $(textinput.selector)
      input.showPlaceholder()
      expect(input).toShowPlaceholder()
      input.clearPlaceholder()
  
    it "should empty the placeholder", ->
      expect($(textinput.selector)).not.toShowPlaceholder()

