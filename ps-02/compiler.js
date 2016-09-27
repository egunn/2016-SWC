//called by stylus tag in HTML. Takes inputText as string from input.js, renders it to CSS and prints to console.

stylus(inputText)
    .render(function(err, css){
        // render it
        console.log(css);
        //console.log(document.getElementById('B3_1'))

        /*Save the parsed styles back to the HTML page as a style sheet (getElementById wasn't working)*/
        /* from http://stackoverflow.com/questions/5195303/set-css-attribute-in-javascript*/
        var styleEl = document.createElement('style'), styleSheet;
        document.head.appendChild(styleEl);
        styleSheet = styleEl.sheet;
        //styleSheet.insertRule(css, max);
        styleEl.appendChild(document.createTextNode(css))

    });