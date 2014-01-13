/*! File:   loader.js
 *  Author: Elijah Kaytor
 *  Description:
 *      Embed as an inline-script to defer a script until page load
 */

// Defer the script until load event is fired
window.onload = function() {
    window.setTimeout(function() {
        
        // Avoid jQuery to ensure Sourcemaps are loaded properly
        var script = document.createElement('script');
            script.src = $('script').last().attr('data-src');
        document.head.appendChild(script);
        
    }, 0);
};
