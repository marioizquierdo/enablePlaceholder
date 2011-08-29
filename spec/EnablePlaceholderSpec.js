(function() {
  describe("enablePlaceholder Plugin", function() {
    beforeEach(function() {
      return loadFixtures('form.html');
    });
    describe("$.support.placeholder", function() {
      it("should be defined", function() {
        expect($.support.placeholder).toBeDefined();
        if ($.support.placeholder) {
          JasmineHelper.alert_support_placeholder_trick();
          return $.support.placeholder = false;
        }
      });
      return it("the plugin should do nothing if $.support.placeholder is true", function() {
        var input;
        $.support.placeholder = true;
        this.after(function() {
          return $.support.placeholder = false;
        });
        input = $('#form input[type=text]');
        input.enablePlaceholder();
        return expect(input).not.toShowPlaceholder();
      });
    });
    return describe("enablePlaceholder()", function() {
      var input, textarea, textinput;
      input = void 0;
      textinput = {
        'name': 'input[type=text]',
        'selector': '#form input[type=text][placeholder]'
      };
      textarea = {
        'name': 'textarea',
        'selector': '#form textarea[placeholder]'
      };
      $.each([textinput, textarea], function(i, element) {
        describe("on a " + element.name, function() {
          beforeEach(function() {
            input = $(element.selector);
            expect(input).toExist();
            return input.enablePlaceholder();
          });
          it("should show the placeholder text", function() {
            return expect(input).toShowPlaceholder();
          });
          return $.each(['focus', 'focusin', 'keydown', 'paste'], function(i, focus_event) {
            return describe("on " + focus_event, function() {
              beforeEach(function() {
                return input.trigger(focus_event);
              });
              it("should hide the placeholder", function() {
                return expect(input).not.toShowPlaceholder();
              });
              describe("and then focusout", function() {
                beforeEach(function() {
                  return input.focusout();
                });
                return it("should show the placeholder again", function() {
                  return expect(input).toShowPlaceholder();
                });
              });
              describe("after write something", function() {
                beforeEach(function() {
                  return JasmineHelper.type_something_in(input);
                });
                it("should not be empty", function() {
                  return expect(input.val()).not.toBeEmpty();
                });
                it("should not show the placeholder", function() {
                  return expect(input).not.toShowPlaceholder();
                });
                return describe("and then focusout", function() {
                  beforeEach(function() {
                    return input.focusout();
                  });
                  it("should not be empty", function() {
                    return expect(input.val()).not.toBeEmpty();
                  });
                  return it("should not show the placeholder", function() {
                    return expect(input).not.toShowPlaceholder();
                  });
                });
              });
              return describe("after write the same text as the placeholder", function() {
                beforeEach(function() {
                  return JasmineHelper.type_same_text_as_placeholder_in(input);
                });
                it("should have the placeholder text", function() {
                  return expect(input.val()).toEqual(input.attr('placeholder'));
                });
                return it("should not show the placeholder", function() {
                  return expect(input).not.toShowPlaceholder();
                });
              });
            });
          });
        });
        return it("should not submit the placeholder in the form", function() {
          $('#form *[placeholder]').enablePlaceholder();
          expect($('#form input[type=text][placeholder]')).toShowPlaceholder();
          $('form').submit(function(event) {
            return event.preventDefault();
          });
          $('form').submit();
          return expect($('#form input[type=text][placeholder]')).not.toShowPlaceholder();
        });
      });
      return describe("with option withPlaceholderClass", function() {
        var phclass;
        phclass = void 0;
        beforeEach(function() {
          input = $('#form input[type=text][placeholder]');
          phclass = 'myawesomeplacelolderclass';
          return input.enablePlaceholder({
            'withPlaceholderClass': phclass
          });
        });
        it("should show the placeholder with the specified class", function() {
          return expect(input).toShowPlaceholder({
            'withPlaceholderClass': phclass
          });
        });
        return it("should keep the specified class if focusout and focusin again", function() {
          input.focusin();
          expect(input).not.toShowPlaceholder({
            'withPlaceholderClass': phclass
          });
          input.focusout();
          return expect(input).toShowPlaceholder({
            'withPlaceholderClass': phclass
          });
        });
      });
    });
  });
}).call(this);
