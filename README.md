# Goal Rocket
#### Take your goals to new heights


----

## Installation

You will need to compile the CSS and JS resources.

#### Compile all resources

    $ npm install
      [truncated output]
    
    $ grunt compile-all
      
      Running "sass:index" (sass) task
      File "www/static/sass/index.sass.css" created.
      
      Running "uglify:onload.min.js" (uglify) task
      [truncated output]
      
      Running "uglify:inline-loader.min.js" (uglify) task
      [truncated output]
      
      Running "uglify:deffered.min.js" (uglify) task
      [truncated output]
      
      Done, without errors.

## Development

#### File Compilation

Run the install as noted above, then to compile files as they are modified, run

    $ grunt watch
      
      Running "watch" task
      Waiting...


#### JavaScript
    
Code to be executed as soon as DOM is loaded goes in ``onload.min.js``.

Code that is non-essential to loading the page goes in ``deferred.min.js``

``inline-loader.min.js`` controls the loading of ``defererred.min.js`` to ensure
both the DOM and load events have been fired.

