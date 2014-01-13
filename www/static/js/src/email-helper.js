/*! File:   email-helper.js
 *  Author: Elijah Kaytor
 *  Description:
 *      Help users complete and verify their emails by offering them common
 *      email domains.
 */

// Create function scope to allow compresssion of variables
var helper = (function() {
    
    // Namespace
    var helper = {};
    
    // Tab tip show/hide functions
    helper.tab = {};
    helper.tab.show = function() { $('#tab-tip').addClass('show');    };
    helper.tab.hide = function() { $('#tab-tip').removeClass('show'); };
    
    // Shorthand domain suggestion function
    helper.domain = function() {
        return $.fn.text.apply($('#domain'), arguments);
    };
    
    // Email validation function
    helper.validate = function(email) {
        return (/^[\w\.%+-]+@[\w\.-]+\.[A-z]{2,6}$/).test(email);
    };
    
    // Shorthand user input function
    helper.email = function() { return $('#email'); };
    // Get the list of common domains
    helper.domains = $('#domains li').map(function(li) {
        return $('#domains li').eq(li).text();
    });
    
    // Email onChange handler
    helper.email.onChange = function(email) {
        
        // Suggest a new email
        var suggestion = helper.complete(email);
        helper.domain(suggestion);
        
        // Hide/show the tab tip
        email.length > 0 && suggestion.length > 0?
            helper.tab.show()
        :   helper.tab.hide();
        
    };
    
    // Email keyDown handler
    helper.email.onKeyDown = function(event, email, keyCode) {
        
        // Only allow one @ in the input field
        if (keyCode == 64 && email.indexOf('@') !== email.length - 1 ) 
            return false;
        
        // Handle [ENTER]
        if (keyCode == 13) {
            if (helper.validate(email)) {
                
                // If the email is valid, submit the form
                $('#submit').trigger('#click');
                return false;
                
            } else {
                
                // Otherwise, interpret it as a [TAB]
                keyCode = 9;
                
            }
        }
        
        // Handle [TAB]
        if (keyCode == 9 && email.length > 0) {
            
            // Prevent traditional [TAB] events
            event.preventDefault();
            // Complete the email, and focus to the end of the input field
            helper.email().append(helper.domain()).focusEnd();
            // Hide the tab tip and clear the helper
            helper.tab.hide();
            helper.domain('');
            
            return false;
            
        } 
        
    };
    
    // Default domain suggestion
    helper.default = helper.domains[0];
    
    // Email complete function
    helper.complete = function(email) {
        
        // If there is no host, return the default
        if (email.indexOf('@') === -1) return helper.default;
        
        // Get the partial host
        var host = email.slice(email.indexOf('@'));
        
        // Generate a list of suggestions
        var suggestions = helper.domains.filter(function(index, domain) {
            return domain.startsWith(host);
        });
        
        // Return the first suggestion
        return (suggestions[0] || '').slice(host.length);
        
    };
    
    // Mutation Observer for speed + reliability of onChange events
    helper.observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'characterData') {
                helper.email.onChange(mutation.target.data);
            }
        });
    });
    
    // Start the Mutation Observer
    helper.observer.observe($('#email')[0], {
        subtree: true,
        childList: true,
        characterData: true,
    });
    
    // Mutation Events for cancellation
    $('#email').on('keydown', function(event) {
        
        // Get relevant values
        var email = helper.email();
        var keyCode = event.keyCode || event.which;
        var char = event.charCode? String.fromCharCode(event.charCode) : '';
        email += char;
        
        // Mutaion Observer fallback
        if (!helper.observer) helper.email.onChange(email);
        
        // Trigger the onKeyDown event
        return helper.email.onKeyDown(event, email, keyCode);
        
    });
    
    return helper;
    
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
