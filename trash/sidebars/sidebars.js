/* global bootstrap: false */
(function () {
  'use strict'
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()


// Selecting the iframe element

const frame = document.querySelector("Iframe");
//const sidebar = document.querySelector("nav")
console.log(frame);



// Adjusting the iframe height onload event
frame.onload = function ()
// function execute while load the iframe
{
  // set the height of the iframe as 
  // the height of the iframe content
  frame.style.height =
    frame.contentWindow.document.body.scrollHeight + 'px';


  // set the width of the iframe as the 
  // width of the iframe content
  frame.style.width =
    frame.contentWindow.document.body.scrollWidth + 'px';

}