# Goal Rocket
#### Take your goals to new heights


----

## Installation

    $ npm install
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

``inline-loader.min.js`` controls the loading of ``deferred.min.js`` to ensure
both the DOM and load events have been fired.

