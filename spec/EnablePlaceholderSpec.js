describe("enablePlaceholder Plugin", function() {
  var string;

  beforeEach(function() {
    loadFixtures('form.html');
  });
  
  describe("$.support.placeholder", function() {
    it("should be defined", function(){
      expect($.support.placeholder).toBeDefined();
      if($.support.placeholder) {
        JasmineHelper.alert_support_placeholder_trick();
        $.support.placeholder = false;
      }
    });
    
    it("the plugin should do nothing if $.support.placeholder is true", function() {
      $.support.placeholder = true;
      this.after(function(){ $.support.placeholder = false; });
      var input = $('#form input[type=text]');
      input.enablePlaceholder();
      expect(input).not.toShowPlaceholder();
    });
  });
  
  describe("enablePlaceholder()", function() {
    var input; // input[type=text] or textarea
    
    $.each([
        {name: 'input[type=text]', selector: '#form input[type=text][placeholder]'},
        {name: 'textarea',         selector: '#form textarea[placeholder]'}
      ], function(i, element) {
        
      describe("on a " + element.name, function() {
        beforeEach(function() {
          input = $(element.selector);
          expect(input).toExist();
          input.enablePlaceholder();
        });

        it("should show the placeholder text", function() {
          expect(input).toShowPlaceholder();
        });
        
        $.each(['focus', 'focusin','keydown', 'paste'], function(i, focus_event) {
          
          describe("on "+ focus_event, function() {
            beforeEach(function() { input.trigger(focus_event); });
            
            it("should hide the placeholder", function() { expect(input).not.toShowPlaceholder(); });
            
            describe("and then focusout", function() {
              beforeEach(function() { input.focusout(); });
              it("should show the placeholder again", function() {
                expect(input).toShowPlaceholder();
              });
            });
            
            describe("after write something", function() {
              beforeEach(function() { JasmineHelper.type_something_in(input); });
              it("should not be empty", function() { expect(input.val()).not.toBeEmpty(); });
              it("should not show the placeholder", function() { expect(input).not.toShowPlaceholder(); });
              describe("and then focusout", function() {
                beforeEach(function() { input.focusout(); });
                it("should not be empty", function() { expect(input.val()).not.toBeEmpty(); });
                it("should not show the placeholder", function() { expect(input).not.toShowPlaceholder(); });
              });
            });
            
            describe("after write the same text as the placeholder", function() {
              beforeEach(function() { JasmineHelper.type_same_text_as_placeholder_in(input); });
              it("should have the placeholder text", function() { expect(input.val()).toEqual(input.attr('placeholder')); });
              it("should not show the placeholder", function() { expect(input).not.toShowPlaceholder(); });
            });
            
          });
          
        });
      });
      
      it("should not submit the placeholder in the form", function() {
        $('#form *[placeholder]').enablePlaceholder();
        expect($('#form input[type=text][placeholder]')).toShowPlaceholder();
        $('form').submit();
        expect($('#form input[type=text][placeholder]')).not.toShowPlaceholder();
      });
      
    });
    
    
    describe("on password fields", function() {
      beforeEach(function() {
        $('input[type=password][placeholder]').enablePlaceholder();
      });
    });

  });
});