EnablePlaceholder jQuery plugin
===============================

A very simple and lightweight (1.7Kb) jQuery plugin which enables HTML5 placeholder behavior for old browsers,
focused on KISS principle, it does not support password placeholders.

Compared to many other placeholder plugins out there, 
this one I think is better to enable placeholders in search inputs, text fields, 
text areas, etc. (anything but a password field), 
because is small while keeping the needed reliability and robustness.

## Basic usage: ##

JavaScript:

    $("input[placeholder], textarea[placeholder]").enablePlaceholder();
    
HTML:

    <input type="text" placeholder="login"/>
    <textarea placeholder="are you bored? type something here..."></textarea>

CSS:

    .placeholder { color: #CCC; }


You can give it a try in the [live demo](http://jsfiddle.net/tothemario/ePVZq/embedded/result/).


## Features ##

 * Automatically checks if the browser supports the HTML5 placeholder attribute and if it is supported, the script is not activated (although it can be activated for all browsers to ensure the same visual result)
 * IE6 and other old browsers supported
 * Password placeholders NOT supported, in favor of performance, robustness and compatibility
 * It makes sure that the placeholder text is not submitted by the form (other placeholder plugins don't clear the input placeholder text before submitting the form)
 * It works even if the plugin is loaded late (other placeholder plugins clear the placeholder text only on 'focus', so if the user focus the field before the plugin is loaded, the placeholder text is not removed)
 * Allows the user to write exactly the same text as the placeholder, and recognizes it as non-placeholder text
 * Has the option "withPlaceholderClass" that allow to change the CSS class added to the field element when the placeholder is present
 * Adds the jQuery.support.placeholder attribute to easily check if the browser supports the HTML5 placeholder
 * Creates the jQuery method `enablePlaceholder()` to activate the placeholder behavior, that is enough for most of cases, but also has the functions `showPlaceholder()`, `clearPlaceholder()` and `updatePlaceholder(text)` to give extra flexibility for corner cases

## Requirements: ##

  * [jQuery](http://jquery.com/) 1.4 or higher. Recommended 1.6


## Intallation and Usage ##

### Download ###

Download the [jquery.enablePlaceholder.min](https://github.com/marioizquierdo/enablePlaceholder/raw/master/src/jquery.enablePlaceholder.min.js) script (or the [uncompressed version](https://github.com/marioizquierdo/enablePlaceholder/raw/master/src/jquery.enablePlaceholder.js)).

Load the jQuery library, and then, the enablePlaceholder plugin in your HTML head section, for example:

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
    <script type="text/javascript" src="/javascripts/jquery/plugins/jquery.enablePlaceholder.min.js"></script>

### JavaScript ###

Activate the enablePlaceholder behavior on the elements you are interested in, for example:

    jQuery("input[placeholder], textarea[placeholder]").enablePlaceholder();
    
The CSS class that is applied when the placeholder text is shown is "placeholder", but you can change it with the "withPlaceholderClass" option:
    
    // Use the withPlaceholderClass option to specify another css class rather than the default "placeholder"
    jQuery("input[placeholder], textarea[placeholder]").enablePlaceholder({"withPlaceholderClass": "light-text"});

### HTML ###

In your markup, now the following placeholder texts will be shown in both HTML5 and non HTML5 browsers:

    <input type="text" placeholder="Write a comment..." name="comment" id="comment">
    <textarea type="text" placeholder="What are you up to? Post a message or link..." name="wall_post[body]" id="status-update-box"></textarea>
    
### CSS ###
    
In your stylesheets, add a different style to the placeholder texts:

    ::-webkit-input-placeholder { color: #ccc; } /* native support for safari and chrome */
    :-moz-placeholder { color: #ccc; }           /* native support for firefox */
    .placeholder { color: #ccc; } /* fallback solution by EnablePlaceholder ("withPlaceholderClass" option) */

*Note*: the styles have to be repeated three times, if you use the comma separated selector it will not work.

*Note*: be aware that some browsers do not support any styling on placeholder text, even they implement the HTML5 placeholder functionality ([more info on styling the HTML5 placeholder](http://blog.ajcw.com/2011/02/styling-the-html5-placeholder/)).

My recommendation on this is to give the placeholder a simple light gray color, the CSS color property is supported on most browsers, and for browsers that implement the placeholder tag but do not allow to style it, the default color is a light gray.

If you want total control over the placeholder, you can override the browser default behavior:

    // Use enablePlaceholder in all browsers
    $.EnablePlaceholder.alsoForModernBrowsers = true;
    
This way you can be sure that the placeholder is going to be displayed exactly the same for all browsers, and can be safely styled with the 'placeholder' class.



## Methods ##

Applied to a jQuery object, for example `$('input[placeholder]').enablePlaceholder();`

All them do nothing if the browser already supports the HTML5 placeholder attribute.

  * `enablePlaceholder(options)`: The basic method that makes the element to simulate the HTML5 placeholder behavior.
  * `updatePlaceholder(new_placeholder_text, options)`: Change or add the placeholder attribute text, and update the value of the field if it is showing the placeholder text.
  * `clearPlaceholder(options)` and `showPlaceholder(options)`: Rarely needed, they show or hide the placeholder if there is no text in the input field.
  
Options:

  * `"withPlaceholderClass"`: this is the only option for now, to change the default CSS class "placeholder" that is added to the field when the placeholder text is being shown.
  
Defaults: Instead of specify options on different places, you can specify the option default values in `jQuery.EnablePlaceholder.defaults`, so instead of this:

    $('textarea').enablePlaceholder({"withPlaceholderClass": 'myclass'});
    $('input').enablePlaceholder({"withPlaceholderClass": 'myclass'});
    $('input').updatePlaceholder('search something', {"withPlaceholderClass": 'myclass'});
    
You could write this:

    $.EnablePlaceholder.defaults.withPlaceholderClass = 'myClass';
    
    $('textarea').enablePlaceholder();
    $('input').enablePlaceholder();
    $('input').updatePlaceholder('search something');
    
## Using with AJAX forms ##

The enablePlaceholder plugin sets the input value to the attr placeholder text and adds the `.placeholder` class to simulate the placeholder behavior.

Because the input has a value, if you submit a form the placeholder value could be accidentally submitted. 

This is prevent by clearing the placeholder on window.unload and input.patrents('form').submit, that will work for most cases.

What happen with ajax forms is that the placeholder is cleared on submit but the page does not refresh. If you want to recover the placeholder you can use the provided method `showPlaceholder()`:

For example, using the [jquery form plugin](http://jquery.malsup.com/form/), you can do this:

    var form = $('#ajaxForm');
    var placeholderElements = form.find('*[placeholder]');
    
    placeholderElements.enablePlaceholder();
    form.ajaxForm({
      success: function (responseText, statusText, xhr, $form) {
        placeholderElements.showPlaceholder();  // show the placeholder again on success.
      }
    });

If for any reason the form.submit event is not fired and you want to manually clear the placeholder before submit, you can use the provided method `clearPlaceholder()`:

For example, to send the form using ajax when click on a button, if no window.unload or form.submit events are fired, you can clear the placeholder yourself:
    
    var form = $('#ajaxForm');
    var placeholderElements = form.find('*[placeholder]');
    
    placeholderElements.enablePlaceholder();
    $('#button-to-submit').click(function () {
      placeholderElements.clearPlaceholder();                      // clear the input value if the placeholder is present.
      $.post('ajax/test.json', form.serialize(), function (data) { // perform custom ajax request
        placeholderElements.showPlaceholder();                     // and show placeholder again on success.
      });
    });


## Full Example ##

HTML page with placeholder support for old browsers. This is a good simple example, but you can also see a [Live Demo](http://jsfiddle.net/tothemario/ePVZq/embedded/result/) or even play with the [jsFiddle Sandbox](http://jsfiddle.net/tothemario/ePVZq/).

    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>jQuery-Placeholder</title>
        
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
        <script src="jquery.enablePlaceholder.min.js"></script>
        
        <style>
            input, textarea { color: #444; }
        
            /* Match html5 placeholder elements, and the .placeholder class added by the plugin */
            ::-webkit-input-placeholder { color: #aaa; }
            :-moz-placeholder { color: #aaa; }
            .placeholder { color: #aaa; }
        </style>
    </head>
    <body>
        <h1>jQuery EnablePlaceholder Demo</h1>
        <form action="/comment">
            <input type="text" placeholder="Write you username" name="username"/>
            <textarea placeholder="Write a comment..." name="comment"></textarea>
            <input type="submit"/>
        </form>
        
        <script>
            jQuery(function($) { 
                $('input[type=text][placeholder], textarea[placeholder]').enablePlaceholder();
            });
        </script>
    </body>
    </html>
    

## Resources ##

  * [Live demo](http://jsfiddle.net/tothemario/ePVZq/embedded/result/)
  * [jsFiddle Sandbox](http://jsfiddle.net/tothemario/ePVZq/)
  * [EnablePlaceholder project in plugins.jquery.com](http://plugins.jquery.com/project/EnablePlaceholder)
  * [Info on styling the HTML5 placeholder](http://blog.ajcw.com/2011/02/styling-the-html5-placeholder/)
  

## Contributing to enablePlaceholder ##

You can easily test the plugin just cloning the github repository and opening the file `SpecRunner.html`.

This will open and run the EnablePlaceholderSpec, that is a [Jasmine](http://pivotal.github.com/jasmine/) test suite. This way, you can play with the source code and run tests to be sure you didn't broke anything big.

Also the live demo runs over [jsfiddle](http://jsfiddle.net/tothemario/ePVZq/), just open the fiddle and touch whatever you want.

If you feel like you have a good fix, fork the project and send a pull request.

To develop I use [coffee-script](http://jashkenas.github.com/coffee-script/). To compile a .coffee file:

    $ coffee -w -c src/jquery.enablePlaceholder.coffee
    
And then, you'll need to update the minified file (jquery.enablePlaceholder.min.js),
what I do is copy-paste in an online minimizer like this [online YUI compressor](http://www.refresh-sf.com/yui/)




## Changelog ##

2011-10-02  Mario Izquierdo Martinez <tothemario@gmail.com>

  * tag version 1.2.2
  * due to a IE error, has to recover the clearPlaceholder on form submit (because sometimes IE does not fire window.unload after for submit).
  * update README

2011-08-30  Mario Izquierdo Martinez <tothemario@gmail.com>

  * tag version 1.2.1
  * rewrite plugin code and spec in coffee script
  * do not clearPlaceholder on form submit, it's enough with window.unload event
  * add info in the README file about using enablePlaceholder with ajax forms

2011-08-29  Mario Izquierdo Martinez <tothemario@gmail.com>

  * tag version 1.2
  * password support removed because could not fix IE errors in time

2011-08-16  Mario Izquierdo Martinez <tothemario@gmail.com>

  * tag version 1.1.1
  * bugfix: syntax error only in IE
  * bugfix: clone() password input not working on IE
  * jslint code quality check

2011-08-08  Mario Izquierdo Martinez <tothemario@gmail.com>

  * tag version 1.1
  * add support for Password placeholders
  * add $.EnablePlaceholder.alsoForModernBrowsers = true; to activate the plugin for all browsers
  * add more jasmine specs

2011-08-05  Mario Izquierdo Martinez <tothemario@gmail.com>

  * tag version 1.0.3
  * bugfix: IE no cursor on tabbing to some field types
  * add jasmine specs

2011-05-31  Mario Izquierdo Martinez <tothemario@gmail.com>

  * tag version 1.0.1
  * bugfix: add semicolon to avoid problems when concatenated with other scripts

2011-05-16  needfeed <https://github.com/needfeed>

  * bugfix: Allow for external updating of placeholder text

2011-05-13  Mario Izquierdo Martinez <tothemario@gmail.com>

  * Initial version (1.0.0)
  * Basic documentation and usage example in the README.md file
  
