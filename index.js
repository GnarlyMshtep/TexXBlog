/*
    For now, I will just test this as the main script. 
*/

const mtJax = require('mathjax')

require('mathjax-full').init({
    //
    //  The MathJax configuration
    //
    options: {
        enableAssistiveMml: argv.assistiveMml // whether assistive mathML will be added or not
    },
    loader: {
        source: (argv.dist ? {} : require('mathjax-full/components/src/source.js').source), // may not be necessery?
        load: ['adaptors/liteDOM', 'tex-chtml']
    },
    tex: {
        packages: argv.packages.replace('\*', PACKAGES).split(/\s*,\s*/) //I can guess what this does...
    },
    chtml: {
        fontURL: argv.fontURL
    },
    startup: {
        typeset: false //the startup component is configured to turn off the initial typesetting run, since there is no document to process (this is not strictly required, but prevents unneeded work).
    }
}).then((MathJax) => {
    //
    //  Typeset and display the math
    //
    MathJax.tex2chtmlPromise(argv._[0] || '', {
        display: !argv.inline,
        em: argv.em,
        ex: argv.ex,
        containerWidth: argv.width
    }).then((node) => {
        const adaptor = MathJax.startup.adaptor;
        //
        //  If the --css option was specified, output the CSS,
        //  Otherwise, output the typeset math as HTML
        //
        if (argv.css) {
            console.log(adaptor.textContent(MathJax.chtmlStylesheet()));
        } else {
            console.log(adaptor.outerHTML(node));
        };
    });
}).catch(err => console.log(err));