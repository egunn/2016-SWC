# Class 04 – 2016-10-04: Javascript: Variables & Loops

## New problem set [ps-04](ps-04.html)


## Questions and review problem set:  5:45 – 6:30 
* Review [ps-03](../03/ps-03.html)


## Recap & last call CSS: 6:30 - 6:40
* Marquee
  * [animated ASCII ocean](http://mrmrs.io/marquee/)
* Breakpoints & Media queries
  * [sample](../03/sample.html)
* Viewport units
  * Setting a div full-height of window, eg: `.full-height { height: 100vh;}`
  * Responsive text: `.responsive-text { font-size: 4vw; }` (Text changes size as the viewport size changes)
* CSS Transition
    * With Hover


### Deep Thoughts with Ada and Linden 6:40 - 6:45

###  Review the Reading. 6:50 – 7:30
- Student summary
- These are the just building materials. Abstractions come later.
- JavaScript:
    - Variables & types
        - Numbers (NaN +/- Infinity)
        - Strings
        - Boolean
        - Function
        - Undefined & Null
        - (forward arrays)
        - (forward objects)
        - Type-coersion
    - Expressions  ( + / - *  <, >  == !==)
    - Boolean operators
        - !  &&  ||
    - Control
        - for
        - while
            - break
            - continue
    - Environment
        - alert, console, dom (window object)
        - Math.random
    - Look ahead: Functions (brief intro)
      - using
      - defining
      - arguments
      - scope
    - Canvas observations (playing with [starter](../03/ps-03-starter.html))
      - Changing width & height
      - Scaling in CSS (preserve aspect ratio)
    - Load Events
      - `window.addEventListene('load',function);`
    - Click handlers
      - `document.getElementById("test").addEventListener("click", function);`
  

### In Class: Grid  7:30 - 8:45
- Make a grid of squares
    - Simple
    - Make the hue, saturation, lightness change in accordance to X or Y.
    - Change square size based on X or Y
- Abstract away the thing we are making a grid of
    - Variation wiggle
    - Variation (each one different size)
    - Variation (rotation / brightness / color?)
- Abstract for the size of the grid, size of canvas.

 