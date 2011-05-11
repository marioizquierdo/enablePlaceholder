EnablePlaceholder jQuery plugin
===============================

A very simple and lightweight jQuery plugin which enables HTML5 placeholder behavior for old browsers.

There are many placeholder plugins out there, but could't find one that works with the robustness I needed.


## Features ##

 * Automatically checks if the browser supports the HTML5 placeholder attribute and if it is supported, the script is not activated.
 * IE6 and other old browsers supported
 * It makes sure that the placeholder text is not submitted by the form (other placeholder plugins don't clear the input placeholder text before submitting the form)
 * It works even if the plugin is loaded late (other placeholder plugins clear the placeholder text on 'focus' but not on 'keydown', so if the user focus the field before the plugin is loaded, the placeholder text is not removed).
 * Allows the user to write exactly the same text as the placeholder, and recognizes it as non-placeholder text (other placeholder plugins only check if the placeholder is there by input.val() == placeholderText, but the user can write exactly the same text as the placeholder, right?).
 * Has the option "withPlaceholderClass" that allow to change the CSS class added to the field element when the placeholder is present.
 * Adds the jQuery.support.placeholder attribute, that is true if the browser supports the HTML5 placeholder. After loading the plugin, this attribute is available for all JavaScript code in your application.
 * It doesn't support password placeholders (other placeholder plugins support that. This could be a future update if needed).


## Requirements: ##

  * [jQuery](http://jquery.com/) 1.3 or higher


## Usage ##

Download the [jquery.enablePlaceholder.min](https://github.com/marioizquierdo/enablePlaceholder/raw/master/jquery.enablePlaceholder.min.js) script (or the [uncompressed version](https://github.com/marioizquierdo/enablePlaceholder/raw/master/jquery.enablePlaceholder.js)).

Load the jQuery library, and then, the enablePlaceholder plugin in your HTML head section:

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
    <script type="text/javascript" src="/javascripts/jquery/plugins/jquery.enablePlaceholder.min.js"></script>

Activate the enablePlaceholder behavior on the elements you are interested in, for example:

    jQuery("input[placeholder], textarea[placeholder]").enablePlaceholder();
    
You can also specify the css class that is applied when the placeholder text is used (so you can style it with a gray color or something):
    
    // Use the withPlaceholderClass option to specify another css class rather than the default "placeholder" value.
    jQuery("input[placeholder], textarea[placeholder]").enablePlaceholder({"withPlaceholderClass": "light-text"});
    
In your markup, the following elements will work in HTML5 browsers and now in old browsers too:

    <input type="text" placeholder="Write a comment..." name="comment" id="comment">
    <textarea type="text" placeholder="What are you up to? Post a message or link..." name="wall_post[body]" id="status-update-box"></textarea>
    
In your stylesheets, add a different style to the placeholder texts:

    /* native support for safari and chrome */
    ::-webkit-input-placeholder {color: red;} 
    
    /* native support for firefox */
    :-moz-placeholder {color: red;} 
    
    /* EnablePlaceholder. Use the class specified in the "withPlaceholderClass" option, that is "placeholder" by default */
    .placeholder {color: red;} /* fallback solution by enablePlaceholder */
                               

## Full Example ##

HTML page with placeholder support for old browsers:

    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>jQuery-Placeholder</title>
        
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
        <script src="jquery.enablePlaceholder.min.js"></script>
        
        <style>
            /* Match html5 placeholder elements, and the .placeholder class added by the plugin */
            input::-webkit-input-placeholder, textarea::-webkit-input-placeholder,
            input:placeholder, textarea:placeholder,
            input.placeholder, textarea.placeholder {
                color: #aaa;
            }
        </style>
    </head>
    <body>
        <h1>jQuery EnablePlaceholder Demo</h1>
        <form action="">
            <p>
                <input type="text" placeholder="username" name="username">
            </p>
            <p>
                <input type="password" placeholder="password" name="password">
            </p>
            <p>
                <textarea placeholder="A textarea placeholder" name="text"></textarea>
            </p>
            <p>
                <input type="submit">Go</button>
            </p>
        </form>
        
        <script>
            jQuery(function($) { 
                $('input[placeholder], textarea[placeholder]').enablePlaceholder();
            });
        </script>
    </body>
    </html>