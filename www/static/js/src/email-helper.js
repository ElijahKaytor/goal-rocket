/*! File:   email-helper.js
 *  Author: Elijah Kaytor
 *  Description:
 *      Help users complete and verify their emails by offering them common
 *      email domains.
 */

// Create function scope to allow compresssion of variables
var helper = (function() {
    
    // Tab tip show/hide functions
    var tab = $('#tab-tip');
    tab.show = function() { tab.addClass('show');    };
    tab.hide = function() { tab.removeClass('show'); };
    
    // Shorthand domain suggestion function
    var domain = $('#domain');
    
    // Email validation function
    var validate = function(email) {
        return (/^[\w\.%+-]+@[\w\.-]+\.[A-z]{2,6}$/).test(email);
    };
    
    // Shorthand user input function
    var email = $('#email');
    // Get the list of common domains
    var domains = $('#domains li').map(function(li) {
        return $('#domains li').eq(li).text();
    });
    
    // Default domain suggestion
    domains.default = domains[0];
    
    // Email onChange handler
    email.onChange = function(input) {
        
        // Suggest a new email
        var suggestion = complete(input);
        domain.text(suggestion);
        
        // Hide/show the tab tip
        input.length > 0 && suggestion.length > 0?
            tab.show()
        :   tab.hide();
        
    };
    
    // Email keyDown handler
    email.onKeyDown = function(event, input, keyCode) {
        
        // Only allow one @ in the input field
        if (keyCode == 64 && input.indexOf('@') !== input.length - 1 ) 
            return false;
        
        // Handle [ENTER]
        if (keyCode == 13) {
            if (validate(input)) {
                
                // If the email is valid, submit the form
                $('#submit').trigger('#click');
                return false;
                
            } else {
                
                // Otherwise, interpret it as a [TAB]
                keyCode = 9;
                
            }
        }
        
        // Handle [TAB]
        if (keyCode == 9 && input.length > 0) {
            
            // Prevent traditional [TAB] events
            event.preventDefault();
            // Complete the email, and focus to the end of the input field
            email.empty().text(input + domain.text()).focusEnd();
            // Clear the helper and hide the tab tip
            domain.empty();
            tab.hide();
            
            return false;
            
        }  else if (keyCode == 9) {
            
            // If there is no email to complete, prevent the event and move on
            event.preventDefault();
            return false;
            
        }
        
    };
    
    // Email complete function
    var complete = function(input) {
        
        // If there is no host, return the default
        if (input.indexOf('@') === -1) return domains.default;
        
        // Get the partial host
        var host = input.slice(input.indexOf('@'));
        
        // Generate a list of suggestions
        var suggestions = domains.filter(function(index, domain) {
            return domain.startsWith(host);
        });
        
        // Return the first suggestion
        return (suggestions[0] || '').slice(host.length);
        
    };
    
    // Mutation Observer for speed + reliability of onChange events
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'characterData') {
                email.onChange(mutation.target.data);
            }
        });
    });
    
    // Start the Mutation Observer
    observer.observe($('#email')[0], {
        subtree: true,
        childList: true,
        characterData: true,
    });
    
    // Mutation Events for cancellation
    $('#email').on('keydown', function(event) {
        
        // Get relevant values
        var input = email.text();
        var keyCode = event.keyCode || event.which;
        var char = event.charCode? String.fromCharCode(event.charCode) : '';
        input += char;
        
        // Mutaion Observer fallback
        if (!observer) email.onChange(input);
        
        // Trigger the onKeyDown event
        return email.onKeyDown(event, input, keyCode);
        
    });
    
    // Export functions
    return {
        complete: complete,
        observer: observer,
        validate: validate,
        domain: domain,
        email: email,
        tab: tab,
    };
    
})();


// jQuery focusEnd function
// (http://stackoverflow.com/a/14022827)
$.fn.focusEnd = function() {
    $(this).trigger('focus');
    var tmp = $('<span />').appendTo($(this)),
        node = tmp.get(0),
        range = null,
        sel = null;
    
    if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(node);
        sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
    tmp.remove();
    return this;
};
