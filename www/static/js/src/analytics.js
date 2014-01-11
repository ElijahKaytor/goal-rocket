/*! File:   analytics.js
 *  Author: Elijah Kaytor
 *  Description:
 *      Handle all interaction with Google Analytics as part of the 
 *      deferred.min.js script. Bottom of the <body> isn't good enough!
 */

// Load Google Analytics Asyncronously
var ga = ga || function() { (ga.q = ga.q || []).push(arguments); };
window.GoogleAnalyticsObject = 'ga'; ga.l = new Date().getTime();
$.getScript('//www.google-analytics.com/analytics.js');

// Retrieve GA ID and Site
var gaID   = $('meta[name=ga-id]').attr('content');
var gaSite = $('meta[name=ga-site]').attr('content');

// Add actions to the GA Queue
if (gaID && gaSite) { 
    ga('create', gaID, gaSite); 
    ga('send', 'pageview');
}
