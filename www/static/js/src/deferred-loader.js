/*! File:   deferred-loader.js
 *  Author: Elijah Kaytor
 *  Description:
 *      Defer scripts by specifying ``data-deferred-src'' instead of ``src''
 */

// Wait for window.onload
window.onload = function() {
    
    // Loop through each deferred script
    $('[data-deferred-src]').each(function() {
        
        // Load the script
        var script = document.createElement('script');
            script.src = $(this).attr('data-deferred-src');
            script.async = true;
        
        // Append the script to the head
        document.head.appendChild(script);
        
    });
    
};
