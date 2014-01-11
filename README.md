# Goal Rocket
#### Take your goals to new heights


----

## Installation

You will need to compile the CSS and JS resources.

#### JavaScript

    $ npm install grunt grunt-contrib-uglify
      [truncated output]
    
    $ grunt compress
      
      Running "uglify:onload.min.js" (uglify) task
      [truncated output]
      
      Running "uglify:deffered.min.js" (uglify) task
      [truncated output]
      
      Done, without errors.

#### SASS
    
    $ sass --sourcemap --compass www/static/sass/index.sass:www/static/sass/index.sass.css


## Development

#### JavaScript
    
Code to be executed as soon as the page is visible goes in ``onload.min.js``.

Code that may be executed after the important stuff is loaded goes into ``deffered.min.js``.
(eg. Analytics)

#### SASS
    $ compass watch -c config/compass.rb

Note: Compass may not update sourcemaps depending on your version.
In this case use;

    $ sass --sourcemap --compass --watch www/static/sass/index.sass:www/static/sass/index.sass.css
