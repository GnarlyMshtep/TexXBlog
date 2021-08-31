// Selecting the iframe element

const frame = document.querySelector("Iframe");

console.log(frame);

// Adjusting the iframe height onload event
frame.onload = function ()
// function execute while load the iframe
{

    console.log('hello!');
    // set the height of the iframe as 
    // the height of the iframe content
    frame.style.height =
        frame.contentWindow.document.body.scrollHeight + 'px';


    // set the width of the iframe as the 
    // width of the iframe content
    frame.style.width =
        frame.contentWindow.document.body.scrollWidth + 'px';

}